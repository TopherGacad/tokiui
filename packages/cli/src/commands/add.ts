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
  fetchFrame,
  fetchFrameSource,
  assertSafeFilePath,
  assertSafeDependency,
  assertSafeComponentName,
  type RegistryFrame,
} from '../utils/registry'
import { transformImports } from '../utils/transforms'

export const addCommand = new Command('add')
  .description('Add a component or frame to your project')
  .argument('[name]', 'Component or frame name to add')
  .action(async (nameArg: string | undefined) => {
    const cwd = process.cwd()
    const config = getConfig(cwd)

    if (!config) {
      console.log(
        kleur.red('No tokiui.json found. Run `npx @tokiui/cli init` first.')
      )
      process.exit(1)
    }

    const libAlias = config.libAlias ?? `@/${config.libDir}`

    if (!nameArg) {
      const spinner = ora('Fetching registry...').start()
      const index = await fetchRegistryIndex().catch(() => {
        spinner.fail('Failed to fetch registry')
        process.exit(1)
      })
      spinner.stop()

      const frames = index.frames ?? []

      // Step 1: pick a category, so components and frames aren't jumbled into one
      // list (a "Sidebar" component next to a "Sidebar" frame is confusing).
      let category: 'components' | 'frames' = 'components'
      if (frames.length > 0) {
        const pick = await prompts({
          type: 'select',
          name: 'category',
          message: 'What would you like to add?',
          choices: [
            { title: 'Components', description: `${index.components.length} primitives`, value: 'components' },
            {
              title: 'Frames',
              description: `${frames.length} prebuilt page composition${frames.length === 1 ? '' : 's'}`,
              value: 'frames',
            },
          ],
          initial: 0,
        })
        if (!pick.category) {
          console.log(kleur.red('Aborted.'))
          process.exit(0)
        }
        category = pick.category as 'components' | 'frames'
      }

      // Step 2: choose from the selected category only.
      const list = category === 'frames' ? frames : index.components
      const answer = await prompts({
        type: 'multiselect',
        name: 'selected',
        message: `Which ${category} would you like to add?`,
        choices: list.map((c) => ({ title: c.label, value: c.name })),
        min: 1,
      })

      if (!answer.selected?.length) {
        console.log(kleur.red('Aborted.'))
        process.exit(0)
      }

      // Track installed names across the batch to avoid re-installs
      const visited = new Set<string>()
      for (const name of answer.selected as string[]) {
        await install(name, cwd, config.componentsDir, libAlias, visited)
      }
      return
    }

    await install(nameArg, cwd, config.componentsDir, libAlias, new Set())
  })

// Dispatch: a name resolves to a frame if the registry has a frame manifest for
// it, otherwise it's treated as a single component.
async function install(
  name: string,
  cwd: string,
  componentsDir: string,
  libAlias: string,
  visited: Set<string>,
): Promise<void> {
  const frame = await fetchFrame(name).catch(() => null)
  if (frame) {
    await installFrame(frame, cwd, componentsDir, libAlias, visited)
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

async function installFrame(
  frame: RegistryFrame,
  cwd: string,
  componentsDir: string,
  libAlias: string,
  visited: Set<string>,
): Promise<void> {
  const spinner = ora(`Adding frame ${frame.name}...`).start()

  // Component dependencies are copied into componentsDir (empty for library-backed frames).
  if (frame.registryDependencies.length > 0) {
    spinner.stop()
    for (const dep of frame.registryDependencies) {
      await installComponent(dep, cwd, componentsDir, libAlias, visited)
    }
    spinner.start(`Adding frame ${frame.name}...`)
  }

  // Frame files install as a self-contained folder next to componentsDir: frames/<name>/.
  // Files reference each other with relative imports, so colocating them "just works".
  const frameDir = path.join(path.dirname(componentsDir), 'frames', frame.name)

  for (const file of frame.files) {
    try {
      assertSafeFilePath(file)
    } catch (err) {
      spinner.fail(`Security: ${err instanceof Error ? err.message : String(err)}`)
      process.exit(1)
    }

    const source = await fetchFrameSource(frame.name, file)
    const transformed = transformImports(source, libAlias)
    const destPath = path.join(cwd, frameDir, file)

    if (fs.existsSync(destPath)) {
      spinner.stop()
      const { overwrite } = await prompts({
        type: 'confirm',
        name: 'overwrite',
        message: `${path.join(frameDir, file)} already exists. Overwrite?`,
        initial: false,
      })
      if (!overwrite) {
        console.log(kleur.dim(`Skipped ${file}`))
        spinner.start(`Adding frame ${frame.name}...`)
        continue
      }
      spinner.start(`Adding frame ${frame.name}...`)
    }

    await fs.ensureDir(path.dirname(destPath))
    await fs.writeFile(destPath, transformed)
  }

  if (frame.dependencies.length > 0) {
    for (const dep of frame.dependencies) {
      try {
        assertSafeDependency(dep)
      } catch (err) {
        spinner.fail(`Security: ${err instanceof Error ? err.message : String(err)}`)
        process.exit(1)
      }
    }
    console.log(kleur.dim(`  Installing: ${frame.dependencies.join(', ')}`))
    const pm = detectPackageManager(cwd)
    const installCmd = pm === 'npm' ? 'install' : 'add'
    await execa(pm, [installCmd, ...frame.dependencies], { cwd })
  }

  spinner.succeed(`Added frame ${kleur.bold(frame.name)}`)

  // Wire up a ready-to-use route so the frame renders at a URL with zero manual
  // importing (mirrors how a scaffolded page just appears). Skips with guidance
  // if the route already exists.
  const posixFrameDir = frameDir.split(path.sep).join('/')
  const pageAlias = `@/${posixFrameDir.replace(/^src\//, '')}/page`

  if (frame.route) {
    const hasSrc = posixFrameDir.startsWith('src/')
    const routeFile = path.join(cwd, hasSrc ? 'src/app' : 'app', frame.route, 'page.tsx')
    if (fs.existsSync(routeFile)) {
      console.log(kleur.dim(`  ${frame.route}/page.tsx already exists — wire it with: export { default } from '${pageAlias}'`))
    } else {
      await fs.ensureDir(path.dirname(routeFile))
      await fs.writeFile(routeFile, `export { default } from '${pageAlias}'\n`)
      const rel = path.relative(cwd, routeFile).split(path.sep).join('/')
      console.log(kleur.green('  ✓') + kleur.dim(` ready at /${frame.route}  (${rel})`))
    }
  } else {
    console.log(kleur.dim(`  Import ${pageAlias} into a route to use it.`))
  }
}
