import { Command } from 'commander'
import path from 'path'
import fs from 'fs-extra'
import kleur from 'kleur'

// The applied theme is wrapped in these markers so re-running `apply` replaces
// the previous block instead of stacking new ones.
const MARKER_START = '/* tokiui theme:start */'
const MARKER_END = '/* tokiui theme:end */'

// camelCase token key (e.g. cardForeground) -> --kebab-case CSS variable (--card-foreground).
function toCssVar(key: string): string {
  return `--${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`
}

function toBlock(selector: string, tokens: Record<string, string>): string {
  const lines = Object.entries(tokens).map(([k, v]) => `  ${toCssVar(k)}: ${v};`)
  return `${selector} {\n${lines.join('\n')}\n}`
}

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

const GLOBALS_CANDIDATES = [
  'src/app/globals.css',
  'src/styles/globals.css',
  'styles/globals.css',
  'app/globals.css',
  'src/index.css',
  'app/tailwind.css',
  'index.css',
]

const themeApplyCommand = new Command('apply')
  .description('Apply a theme exported from the tokiui playground to your globals.css')
  .argument('<encoded>', 'Encoded theme string from the playground (the ?theme= value in "Copy theme URL")')
  .action(async (encoded: string) => {
    const cwd = process.cwd()

    let parsed: unknown
    try {
      parsed = JSON.parse(Buffer.from(encoded, 'base64').toString('utf-8'))
    } catch {
      console.log(
        kleur.red('Invalid theme string. Copy it from the tokiui playground — the ?theme= value in "Copy theme URL".')
      )
      process.exit(1)
    }

    // The playground encodes { light, dark }; also accept a single flat token map (applied to :root).
    const obj = (parsed ?? {}) as Record<string, unknown>
    const isPair = Boolean(
      obj.light && typeof obj.light === 'object' && obj.dark && typeof obj.dark === 'object'
    )

    let block: string
    if (isPair) {
      block = [
        toBlock(':root', obj.light as Record<string, string>),
        toBlock('[data-theme="dark"]', obj.dark as Record<string, string>),
      ].join('\n\n')
    } else if (typeof obj === 'object' && Object.keys(obj).length > 0) {
      block = toBlock(':root', obj as Record<string, string>)
    } else {
      console.log(kleur.red('That theme string did not contain any tokens.'))
      process.exit(1)
      return
    }

    const globalsPath = GLOBALS_CANDIDATES
      .map((c) => path.join(cwd, c))
      .find((p) => fs.existsSync(p))

    if (!globalsPath) {
      console.log(
        kleur.red('Could not find your global stylesheet. Run `npx @tokiui/cli init` first, or create globals.css.')
      )
      process.exit(1)
      return
    }

    const css = await fs.readFile(globalsPath, 'utf-8')
    const managed = `${MARKER_START}\n${block}\n${MARKER_END}`

    let next: string
    if (css.includes(MARKER_START) && css.includes(MARKER_END)) {
      // Replace the previously-applied block in place — idempotent re-runs.
      const re = new RegExp(`${escapeRegExp(MARKER_START)}[\\s\\S]*?${escapeRegExp(MARKER_END)}`)
      next = css.replace(re, managed)
    } else {
      // Append after existing content so the overrides win over the imported defaults.
      next = `${css.replace(/\s*$/, '')}\n\n${managed}\n`
    }

    await fs.writeFile(globalsPath, next)
    console.log(kleur.green(`✓ Theme applied to ${path.relative(cwd, globalsPath)}`))
    console.log(kleur.dim('Restart your dev server to see the change.'))
  })

export const themeCommand = new Command('theme')
  .description('Manage themes')
  .addCommand(themeApplyCommand)
