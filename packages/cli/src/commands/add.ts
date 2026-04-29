import { Command } from 'commander'
import path from 'path'
import fs from 'fs-extra'
import prompts from 'prompts'
import kleur from 'kleur'
import ora from 'ora'
import { execa } from 'execa'
import { getConfig, detectPackageManager } from '../utils/config'
import {
  fetchRegistryIndex,
  fetchComponent,
  fetchComponentSource,
} from '../utils/registry'
import { transformImports } from '../utils/transforms'

export const addCommand = new Command('add')
  .description('Add a component to your project')
  .argument('[component]', 'Component name to add')
  .action(async (componentArg: string | undefined) => {
    const cwd = process.cwd()
    const config = getConfig(cwd)

    if (!config) {
      console.log(
        kleur.red('No tokiui.json found. Run `npx tokiui init` first.')
      )
      process.exit(1)
    }

    let componentName = componentArg

    if (!componentName) {
      const spinner = ora('Fetching component list...').start()
      const index = await fetchRegistryIndex().catch(() => {
        spinner.fail('Failed to fetch registry')
        process.exit(1)
      })
      spinner.stop()

      const answer = await prompts({
        type: 'multiselect',
        name: 'components',
        message: 'Which components would you like to add?',
        choices: index.components.map((c) => ({ title: c.label, value: c.name })),
        min: 1,
      })

      if (!answer.components?.length) {
        console.log(kleur.red('Aborted.'))
        process.exit(0)
      }

      for (const name of answer.components as string[]) {
        await installComponent(name, cwd, config.componentsDir, config.libDir)
      }
      return
    }

    await installComponent(componentName, cwd, config.componentsDir, config.libDir)
  })

async function installComponent(
  name: string,
  cwd: string,
  componentsDir: string,
  libDir: string
): Promise<void> {
  const spinner = ora(`Adding ${name}...`).start()

  const meta = await fetchComponent(name).catch(() => {
    spinner.fail(`Component "${name}" not found`)
    process.exit(1)
  })

  // Recursively install registry dependencies first
  for (const dep of meta.registryDependencies) {
    await installComponent(dep, cwd, componentsDir, libDir)
  }

  // Fetch and write component source files
  for (const file of meta.files) {
    const source = await fetchComponentSource(name, file)
    const transformed = transformImports(source, `@/${libDir}`)
    const destPath = path.join(cwd, componentsDir, path.basename(file))

    if (fs.existsSync(destPath)) {
      spinner.stop()
      const { overwrite } = await prompts({
        type: 'confirm',
        name: 'overwrite',
        message: `${path.basename(file)} already exists. Overwrite?`,
        initial: false,
      })
      if (!overwrite) {
        console.log(kleur.dim(`Skipped ${path.basename(file)}`))
        continue
      }
      spinner.start(`Adding ${name}...`)
    }

    await fs.ensureDir(path.dirname(destPath))
    await fs.writeFile(destPath, transformed)
  }

  // Install npm dependencies
  if (meta.dependencies.length > 0) {
    const pm = detectPackageManager(cwd)
    const installCmd = pm === 'npm' ? 'install' : 'add'
    await execa(pm, [installCmd, ...meta.dependencies], { cwd })
  }

  spinner.succeed(`Added ${kleur.bold(name)}`)
}
