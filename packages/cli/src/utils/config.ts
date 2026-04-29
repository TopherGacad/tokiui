import path from 'path'
import fs from 'fs-extra'

export interface TokiuiConfig {
  componentsDir: string
  libDir: string
  style: 'default'
}

const CONFIG_FILE = 'tokiui.json'

export function getConfig(cwd: string): TokiuiConfig | null {
  const configPath = path.join(cwd, CONFIG_FILE)
  if (!fs.existsSync(configPath)) return null
  return fs.readJsonSync(configPath) as TokiuiConfig
}

export function writeConfig(cwd: string, config: TokiuiConfig): void {
  const configPath = path.join(cwd, CONFIG_FILE)
  fs.writeJsonSync(configPath, config, { spaces: 2 })
}

export function detectPackageManager(cwd: string): 'npm' | 'yarn' | 'pnpm' | 'bun' {
  if (fs.existsSync(path.join(cwd, 'bun.lockb'))) return 'bun'
  if (fs.existsSync(path.join(cwd, 'pnpm-lock.yaml'))) return 'pnpm'
  if (fs.existsSync(path.join(cwd, 'yarn.lock'))) return 'yarn'
  return 'npm'
}
