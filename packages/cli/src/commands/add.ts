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
  assertSafeFilePath,
  assertSafeDependency,
  assertSafeComponentName,
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
        kleur.red('No tokiui.json found. Run `npx @tokiui/cli init` first.')
      )
      process.exit(1)
    }

    const libAlias = config.libAlias ?? `@/${config.libDir}`
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

      // Track installed components across the batch to avoid re-installs
      const visited = new Set<string>()
      for (const name of answer.components as string[]) {
        await installComponent(name, cwd, config.componentsDir, libAlias, visited)
      }
      return
    }

    await installComponent(componentName, cwd, config.componentsDir, libAlias, new Set())
  })

async function installComponent(
  name: string,
  cwd: string,
  componentsDir: string,
  libAlias: string,
  visited: Set<string>
): Promise<void> {
  // Guard: prevent circular/duplicate installs
  if (visited.has(name)) return
  visited.add(name)

  // Validate the component name before using it in any URL or path
  assertSafeComponentName(name)

  const spinner = ora(`Adding ${name}...`).start()

  const meta = await fetchComponent(name).catch((err: unknown) => {
    spinner.fail(`${err instanceof Error ? err.message : String(err)}`)
    process.exit(1)
  })

  // Recursively install registry dependencies first
  for (const dep of meta.registryDependencies) {
    await installComponent(dep, cwd, componentsDir, libAlias, visited)
  }

  // Validate and write component source files
  for (const file of meta.files) {
    // Reject path traversal / absolute paths before any fetch or write
    try {
      assertSafeFilePath(file)
    } catch (err) {
      spinner.fail(`Security: ${err instanceof Error ? err.message : String(err)}`)
      process.exit(1)
    }

    const source = await fetchComponentSource(name, file)
    const transformed = transformImports(source, libAlias)
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

  // Validate dependency names before invoking the package manager.
  // assertSafeDependency throws for anything not in the approved allowlist.
  if (meta.dependencies.length > 0) {
    for (const dep of meta.dependencies) {
      try {
        assertSafeDependency(dep)
      } catch (err) {
        spinner.fail(`Security: ${err instanceof Error ? err.message : String(err)}`)
        process.exit(1)
      }
    }

    console.log(kleur.dim(`  Installing: ${meta.dependencies.join(', ')}`))
    const pm = detectPackageManager(cwd)
    const installCmd = pm === 'npm' ? 'install' : 'add'
    await execa(pm, [installCmd, ...meta.dependencies], { cwd })
  }

  spinner.succeed(`Added ${kleur.bold(name)}`)
}
