import { Command } from 'commander'
import path from 'path'
import fs from 'fs-extra'
import prompts from 'prompts'
import kleur from 'kleur'
import ora from 'ora'
import { execa } from 'execa'
import { writeConfig, detectPackageManager } from '../utils/config'

const GLOBALS_CANDIDATES = [
  'src/app/globals.css',
  'src/styles/globals.css',
  'src/index.css',
  'app/globals.css',
  'styles/globals.css',
  'index.css',
]

const POSTCSS_CANDIDATES = [
  'postcss.config.mjs',
  'postcss.config.js',
  'postcss.config.cjs',
]

function detectGlobalsCss(cwd: string): string | undefined {
  return GLOBALS_CANDIDATES.find((c) => fs.existsSync(path.join(cwd, c)))
}

function detectPostcss(cwd: string): string | undefined {
  return POSTCSS_CANDIDATES.find((f) => fs.existsSync(path.join(cwd, f)))
}

function hasTailwindV3(cwd: string): boolean {
  return (
    fs.existsSync(path.join(cwd, 'tailwind.config.ts')) ||
    fs.existsSync(path.join(cwd, 'tailwind.config.js'))
  )
}

export const initCommand = new Command('init')
  .description('Initialize tokiui in your project')
  .action(async () => {
    const cwd = process.cwd()

    console.log(kleur.bold('\n  tokiui — setup\n'))

    // ── Detect project layout ────────────────────────────────────────
    const hasSrc = fs.existsSync(path.join(cwd, 'src'))
    const isNext =
      fs.existsSync(path.join(cwd, 'next.config.ts')) ||
      fs.existsSync(path.join(cwd, 'next.config.js')) ||
      fs.existsSync(path.join(cwd, 'next.config.mjs'))
    const detectedGlobals = detectGlobalsCss(cwd)

    if (hasTailwindV3(cwd)) {
      console.log(
        kleur.yellow(
          '  ⚠  tailwind.config.ts detected — tokiui requires Tailwind CSS v4.\n' +
          '     Migrate first: https://tailwindcss.com/docs/upgrade-guide\n'
        )
      )
    }

    // ── Ask questions ────────────────────────────────────────────────
    const answers = await prompts(
      [
        {
          type: 'text',
          name: 'componentsDir',
          message: 'Where should components be installed?',
          initial: hasSrc ? 'src/components/ui' : 'components/ui',
        },
        {
          type: 'text',
          name: 'libDir',
          message: 'Where should utility files be placed?',
          initial: hasSrc ? 'src/lib' : 'lib',
        },
        {
          type: 'text',
          name: 'globalsPath',
          message: 'Where is your global CSS file?',
          initial: detectedGlobals ?? (hasSrc ? 'src/app/globals.css' : 'app/globals.css'),
        },
      ],
      {
        onCancel() {
          console.log(kleur.red('\n  Aborted.\n'))
          process.exit(0)
        },
      }
    )

    const pm = detectPackageManager(cwd)
    const installCmd = pm === 'npm' ? 'install' : 'add'

    // Compute the correct @/ alias for the lib directory.
    // If hasSrc, tsconfig maps @/* → ./src/* so strip the src/ prefix.
    const libAlias = hasSrc
      ? '@/' + (answers.libDir as string).replace(/^src\//, '')
      : '@/' + (answers.libDir as string)

    const spinner = ora()

    // ── Step 1: Create directories ───────────────────────────────────
    spinner.start('Creating directories')
    await fs.ensureDir(path.join(cwd, answers.componentsDir as string))
    await fs.ensureDir(path.join(cwd, answers.libDir as string))
    spinner.succeed('Directories ready')

    // ── Step 2: Install npm packages ─────────────────────────────────
    spinner.start(`Installing packages with ${pm}`)
    try {
      await execa(
        pm,
        [installCmd, '@tokiui/ui', 'tailwindcss', '@tailwindcss/postcss', 'clsx', 'tailwind-merge'],
        { cwd }
      )
      spinner.succeed('Packages installed')
    } catch {
      spinner.fail('Package install failed — run manually:')
      console.log(
        kleur.dim(
          `\n  ${pm} ${installCmd} @tokiui/ui tailwindcss @tailwindcss/postcss clsx tailwind-merge\n`
        )
      )
    }

    // ── Step 3: Write cn() utility ───────────────────────────────────
    spinner.start('Writing utility functions')
    const cnPath = path.join(cwd, answers.libDir as string, 'utils.ts')
    if (!fs.existsSync(cnPath)) {
      await fs.writeFile(
        cnPath,
        [
          `import { clsx, type ClassValue } from 'clsx'`,
          `import { twMerge } from 'tailwind-merge'`,
          ``,
          `export function cn(...inputs: ClassValue[]) {`,
          `  return twMerge(clsx(inputs))`,
          `}`,
        ].join('\n') + '\n'
      )
      spinner.succeed('utils.ts written')
    } else {
      spinner.succeed('utils.ts already exists — skipped')
    }

    // ── Step 4: Set up PostCSS ───────────────────────────────────────
    spinner.start('Configuring PostCSS')
    const existingPostcss = detectPostcss(cwd)
    if (!existingPostcss) {
      await fs.writeFile(
        path.join(cwd, 'postcss.config.mjs'),
        `export default {\n  plugins: {\n    '@tailwindcss/postcss': {},\n  },\n}\n`
      )
      spinner.succeed('postcss.config.mjs created')
    } else {
      const content = await fs.readFile(path.join(cwd, existingPostcss), 'utf-8')
      if (content.includes('@tailwindcss/postcss') || content.includes('tailwindcss')) {
        spinner.succeed(`PostCSS already configured (${existingPostcss})`)
      } else {
        spinner.warn(
          `${existingPostcss} exists but has no Tailwind plugin — add '@tailwindcss/postcss' manually`
        )
      }
    }

    // ── Step 5: Set up global CSS ────────────────────────────────────
    // tokiui owns the theme (tokens + dark mode via [data-theme="dark"]).
    // A fresh create-next-app ships its own theme in globals.css — its own
    // --background/--foreground plus `@media (prefers-color-scheme: dark)` —
    // which is unlayered and overrides tokiui's tokens (e.g. white cards on a
    // dark OS). So we REPLACE that starter theme rather than stacking on it,
    // while preserving a genuinely hand-written stylesheet.
    spinner.start('Setting up global CSS')
    const globalsAbsPath = path.join(cwd, answers.globalsPath as string)
    await fs.ensureDir(path.dirname(globalsAbsPath))

    const TOKIUI_CSS = '@import "tailwindcss";\n@import "@tokiui/ui/styles.css";\n'
    const existingCss = fs.existsSync(globalsAbsPath)
      ? await fs.readFile(globalsAbsPath, 'utf-8')
      : ''

    if (existingCss.includes('@tokiui/ui/styles.css')) {
      spinner.succeed('globals.css already configured')
    } else if (!existingCss.trim()) {
      await fs.writeFile(globalsAbsPath, TOKIUI_CSS)
      spinner.succeed(`globals.css created (${answers.globalsPath})`)
    } else {
      // Starter templates (create-next-app etc.) use these markers; a real
      // stylesheet almost never does.
      const isStarterTheme =
        /@media\s*\(\s*prefers-color-scheme\s*:\s*dark\s*\)/.test(existingCss) ||
        /@theme\s+inline/.test(existingCss)

      if (isStarterTheme) {
        await fs.writeFile(globalsAbsPath + '.bak', existingCss)
        await fs.writeFile(globalsAbsPath, TOKIUI_CSS)
        spinner.succeed('globals.css set up — tokiui now owns the theme')
        console.log(
          kleur.dim(`  Replaced the starter theme (saved a copy to ${path.basename(globalsAbsPath)}.bak).`)
        )
      } else {
        const lead: string[] = []
        if (!existingCss.includes('@import "tailwindcss"') && !existingCss.includes("@import 'tailwindcss'")) {
          lead.push('@import "tailwindcss";')
        }
        lead.push('@import "@tokiui/ui/styles.css";')
        await fs.writeFile(globalsAbsPath, lead.join('\n') + '\n\n' + existingCss)
        spinner.succeed(`globals.css updated (${answers.globalsPath})`)
        console.log(
          kleur.dim('  Note: remove any :root / @theme / prefers-color-scheme rules that conflict with tokiui tokens.')
        )
      }
    }

    // ── Step 6: Update tsconfig.json ────────────────────────────────
    spinner.start('Checking TypeScript path aliases')
    const tsconfigPath = path.join(cwd, 'tsconfig.json')
    if (fs.existsSync(tsconfigPath)) {
      const tsconfig = await fs.readJson(tsconfigPath) as {
        compilerOptions?: { baseUrl?: string; paths?: Record<string, string[]> }
      }
      const co = tsconfig.compilerOptions ?? {}
      const paths = co.paths ?? {}

      if (!paths['@/*']) {
        tsconfig.compilerOptions = {
          ...co,
          baseUrl: '.',
          paths: { ...paths, '@/*': [hasSrc ? './src/*' : './*'] },
        }
        await fs.writeJson(tsconfigPath, tsconfig, { spaces: 2 })
        spinner.succeed(`tsconfig.json — added "@/*": ["${hasSrc ? './src/*' : './*'}"]`)
      } else {
        spinner.succeed('tsconfig.json already has @/* paths')
      }
    } else {
      spinner.warn('No tsconfig.json found — skipping path alias setup')
    }

    // ── Step 7: Write tokiui.json ────────────────────────────────────
    writeConfig(cwd, {
      componentsDir: answers.componentsDir as string,
      libDir: answers.libDir as string,
      libAlias,
      style: 'default',
    })

    // ── Done ─────────────────────────────────────────────────────────
    console.log(kleur.green('\n  ✓ tokiui initialized\n'))
    console.log(`  ${kleur.bold('Add your first component:')}\n`)
    console.log(`  ${kleur.cyan('npx @tokiui/cli add button')}\n`)

    if (!isNext) {
      console.log(
        kleur.dim(
          '  Tip: make sure your framework imports globals.css so the\n' +
          '  Tailwind and tokiui styles are loaded.\n'
        )
      )
    }
  })
