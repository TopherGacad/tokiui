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
  fetchBlock,
  fetchBlockSource,
  assertSafeFilePath,
  assertSafeDependency,
  assertSafeComponentName,
  type RegistryBlock,
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
      const spinner = ora('Fetching registry...').start()
      const index = await fetchRegistryIndex().catch(() => {
        spinner.fail('Failed to fetch registry')
        process.exit(1)
      })
      spinner.stop()

      const answer = await prompts({
        type: 'multiselect',
        name: 'components',
        message: 'Which components or blocks would you like to add?',
        choices: [
          ...index.components.map((c) => ({ title: c.label, value: c.name })),
          ...(index.blocks ?? []).map((b) => ({ title: `${b.label}  ·  block`, value: b.name })),
        ],
        min: 1,
      })

      if (!answer.components?.length) {
        console.log(kleur.red('Aborted.'))
        process.exit(0)
      }

      // Track installed components across the batch to avoid re-installs
      const visited = new Set<string>()
      for (const name of answer.components as string[]) {
        await install(name, cwd, config.componentsDir, libAlias, visited)
      }
      return
    }

    await install(componentName, cwd, config.componentsDir, libAlias, new Set())
  })

// Dispatch: a name resolves to a block if the registry has a block manifest for
// it, otherwise it's treated as a single component.
async function install(
  name: string,
  cwd: string,
  componentsDir: string,
  libAlias: string,
  visited: Set<string>,
): Promise<void> {
  const block = await fetchBlock(name).catch(() => null)
  if (block) {
    await installBlock(block, cwd, componentsDir, libAlias, visited)
    return
  }
  await installComponent(name, cwd, componentsDir, libAlias, visited)
}

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

async function installBlock(
  block: RegistryBlock,
  cwd: string,
  componentsDir: string,
  libAlias: string,
  visited: Set<string>,
): Promise<void> {
  const spinner = ora(`Adding block ${block.name}...`).start()

  // Component dependencies are copied into componentsDir (empty for library-backed blocks).
  if (block.registryDependencies.length > 0) {
    spinner.stop()
    for (const dep of block.registryDependencies) {
      await installComponent(dep, cwd, componentsDir, libAlias, visited)
    }
    spinner.start(`Adding block ${block.name}...`)
  }

  // Block files install as a self-contained folder next to componentsDir: blocks/<name>/.
  // Files reference each other with relative imports, so colocating them "just works".
  const blockDir = path.join(path.dirname(componentsDir), 'blocks', block.name)

  for (const file of block.files) {
    try {
      assertSafeFilePath(file)
    } catch (err) {
      spinner.fail(`Security: ${err instanceof Error ? err.message : String(err)}`)
      process.exit(1)
    }

    const source = await fetchBlockSource(block.name, file)
    const transformed = transformImports(source, libAlias)
    const destPath = path.join(cwd, blockDir, file)

    if (fs.existsSync(destPath)) {
      spinner.stop()
      const { overwrite } = await prompts({
        type: 'confirm',
        name: 'overwrite',
        message: `${path.join(blockDir, file)} already exists. Overwrite?`,
        initial: false,
      })
      if (!overwrite) {
        console.log(kleur.dim(`Skipped ${file}`))
        spinner.start(`Adding block ${block.name}...`)
        continue
      }
      spinner.start(`Adding block ${block.name}...`)
    }

    await fs.ensureDir(path.dirname(destPath))
    await fs.writeFile(destPath, transformed)
  }

  if (block.dependencies.length > 0) {
    for (const dep of block.dependencies) {
      try {
        assertSafeDependency(dep)
      } catch (err) {
        spinner.fail(`Security: ${err instanceof Error ? err.message : String(err)}`)
        process.exit(1)
      }
    }
    console.log(kleur.dim(`  Installing: ${block.dependencies.join(', ')}`))
    const pm = detectPackageManager(cwd)
    const installCmd = pm === 'npm' ? 'install' : 'add'
    await execa(pm, [installCmd, ...block.dependencies], { cwd })
  }

  spinner.succeed(`Added block ${kleur.bold(block.name)}`)

  // Wire up a ready-to-use route so the block renders at a URL with zero manual
  // importing (mirrors how a scaffolded page just appears). Skips with guidance
  // if the route already exists.
  const posixBlockDir = blockDir.split(path.sep).join('/')
  const pageAlias = `@/${posixBlockDir.replace(/^src\//, '')}/page`

  if (block.route) {
    const hasSrc = posixBlockDir.startsWith('src/')
    const routeFile = path.join(cwd, hasSrc ? 'src/app' : 'app', block.route, 'page.tsx')
    if (fs.existsSync(routeFile)) {
      console.log(kleur.dim(`  ${block.route}/page.tsx already exists — wire it with: export { default } from '${pageAlias}'`))
    } else {
      await fs.ensureDir(path.dirname(routeFile))
      await fs.writeFile(routeFile, `export { default } from '${pageAlias}'\n`)
      const rel = path.relative(cwd, routeFile).split(path.sep).join('/')
      console.log(kleur.green('  ✓') + kleur.dim(` ready at /${block.route}  (${rel})`))
    }
  } else {
    console.log(kleur.dim(`  Import ${pageAlias} into a route to use it.`))
  }
}
