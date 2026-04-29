// TODO: Replace USERNAME with your actual GitHub username after pushing the repo
const REGISTRY_BASE =
  'https://raw.githubusercontent.com/USERNAME/tokiui/main/packages/registry'

export interface RegistryComponent {
  name: string
  files: string[]
  dependencies: string[]
  devDependencies: string[]
  registryDependencies: string[]
}

export interface RegistryIndex {
  components: Array<{ name: string; label: string; description: string }>
}

export async function fetchRegistryIndex(): Promise<RegistryIndex> {
  const res = await fetch(`${REGISTRY_BASE}/index.json`)
  if (!res.ok) throw new Error(`Failed to fetch registry index: ${res.statusText}`)
  return res.json() as Promise<RegistryIndex>
}

export async function fetchComponent(name: string): Promise<RegistryComponent> {
  const res = await fetch(`${REGISTRY_BASE}/components/${name}.json`)
  if (!res.ok) throw new Error(`Component "${name}" not found in registry`)
  return res.json() as Promise<RegistryComponent>
}

export async function fetchComponentSource(name: string, file: string): Promise<string> {
  const res = await fetch(
    `https://raw.githubusercontent.com/USERNAME/tokiui/main/packages/ui/src/${file}`
  )
  if (!res.ok) throw new Error(`Failed to fetch source for ${name}/${file}`)
  return res.text()
}
