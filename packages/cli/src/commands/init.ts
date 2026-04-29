import { Command } from 'commander'
import path from 'path'
import fs from 'fs-extra'
import prompts from 'prompts'
import kleur from 'kleur'
import ora from 'ora'
import { writeConfig } from '../utils/config'

export const initCommand = new Command('init')
  .description('Initialize tokiui in your project')
  .action(async () => {
    const cwd = process.cwd()

    console.log(kleur.bold('\nInitializing tokiui...\n'))

    const answers = await prompts([
      {
        type: 'text',
        name: 'componentsDir',
        message: 'Where should components be installed?',
        initial: 'src/components/ui',
      },
      {
        type: 'text',
        name: 'libDir',
        message: 'Where should utility files be placed?',
        initial: 'src/lib',
      },
    ])

    if (!answers.componentsDir) {
      console.log(kleur.red('Aborted.'))
      process.exit(0)
    }

    const spinner = ora('Setting up project...').start()

    // Create directories
    await fs.ensureDir(path.join(cwd, answers.componentsDir as string))
    await fs.ensureDir(path.join(cwd, answers.libDir as string))

    // Write cn utility
    const cnPath = path.join(cwd, answers.libDir as string, 'utils.ts')
    if (!fs.existsSync(cnPath)) {
      await fs.writeFile(
        cnPath,
        `import { clsx, type ClassValue } from 'clsx'\nimport { twMerge } from 'tailwind-merge'\n\nexport function cn(...inputs: ClassValue[]) {\n  return twMerge(clsx(inputs))\n}\n`
      )
    }

    // Write config
    writeConfig(cwd, {
      componentsDir: answers.componentsDir as string,
      libDir: answers.libDir as string,
      style: 'default',
    })

    spinner.succeed('Project initialized')

    console.log(kleur.green('\n✓ tokiui initialized successfully'))
    console.log(kleur.dim('\nNext: run `npx tokiui add <component>` to add components\n'))
  })
