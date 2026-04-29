import { Command } from 'commander'
import path from 'path'
import fs from 'fs-extra'
import kleur from 'kleur'
import { getConfig } from '../utils/config'

const themeApplyCommand = new Command('apply')
  .description('Apply a shared theme URL string to your globals.css')
  .argument('<encoded>', 'Encoded theme string from the tokiui playground')
  .action(async (encoded: string) => {
    const cwd = process.cwd()
    const config = getConfig(cwd)

    let tokens: Record<string, string>
    try {
      tokens = JSON.parse(Buffer.from(encoded, 'base64').toString('utf-8')) as Record<string, string>
    } catch {
      console.log(kleur.red('Invalid theme string. Copy it from the tokiui playground.'))
      process.exit(1)
    }

    // Find globals.css
    const candidates = [
      'src/app/globals.css',
      'src/styles/globals.css',
      'styles/globals.css',
      'app/globals.css',
    ]

    let globalsPath: string | null = null
    for (const candidate of candidates) {
      if (fs.existsSync(path.join(cwd, candidate))) {
        globalsPath = path.join(cwd, candidate)
        break
      }
    }

    if (!globalsPath) {
      console.log(
        kleur.red(
          'Could not find globals.css. Specify the path manually or create it first.'
        )
      )
      process.exit(1)
    }

    let css = await fs.readFile(globalsPath, 'utf-8')

    // Replace CSS variable values inside :root and .dark blocks
    for (const [key, value] of Object.entries(tokens)) {
      const cssVar = `--${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`
      if (cssVar === '--radius') {
        css = css.replace(/(--radius:\s*)([^;]+)(;)/g, `$1${value}$3`)
      } else {
        const regex = new RegExp(`(${cssVar}:\\s*)([^;]+)(;)`, 'g')
        css = css.replace(regex, `$1${value}$3`)
      }
    }

    await fs.writeFile(globalsPath, css)
    console.log(kleur.green(`✓ Theme applied to ${path.relative(cwd, globalsPath)}`))

    if (config) {
      console.log(kleur.dim('Restart your dev server to see changes.'))
    }
  })

export const themeCommand = new Command('theme')
  .description('Manage themes')
  .addCommand(themeApplyCommand)
