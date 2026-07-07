// Injected at build time by tsup define — avoids fetching from volatile "main" branch.
declare const __CLI_VERSION__: string

// Only this GitHub origin is ever contacted by the CLI.
const ALLOWED_FETCH_ORIGIN = 'https://raw.githubusercontent.com/TopherGacad/tokiui/'

// Ref must be alphanumeric + limited punctuation — block path traversal via env var.
const SAFE_REF_RE = /^[a-zA-Z0-9._/@-]+$/

function resolveRegistryRef(): string {
  const envRef = process.env.TOKIUI_REGISTRY_REF
  if (envRef !== undefined) {
    if (!SAFE_REF_RE.test(envRef) || envRef.includes('..')) {
      throw new Error(
        `TOKIUI_REGISTRY_REF contains invalid characters: "${envRef}". ` +
        'Only alphanumeric characters, hyphens, dots, slashes, and @ are allowed.'
      )
    }
    return envRef
  }
  return `cli-v${__CLI_VERSION__}`
}

// Pin all registry fetches to the git tag that matches the published CLI version.
// Tag convention: cli-v{version} (e.g. `git tag cli-v0.1.1 && git push --tags`).
// Set TOKIUI_REGISTRY_REF=main (or any ref) to override during development.
const REGISTRY_REF = resolveRegistryRef()

const REGISTRY_BASE =
  `${ALLOWED_FETCH_ORIGIN}${REGISTRY_REF}/packages/registry`

const SOURCE_BASE =
  `${ALLOWED_FETCH_ORIGIN}${REGISTRY_REF}/packages/ui/src`

// Blocks (multi-file compositions) live in the docs app's registry dir, which
// doubles as the live preview source — one source feeds both preview and install.
const BLOCK_BASE =
  `${ALLOWED_FETCH_ORIGIN}${REGISTRY_REF}/apps/docs/src/registry/blocks`

// All outbound fetch calls go through this wrapper, which enforces that the URL
// starts with the expected GitHub origin — prevents any misdirected request.
async function safeFetch(url: string): Promise<Response> {
  if (!url.startsWith(ALLOWED_FETCH_ORIGIN)) {
    throw new Error(
      `Security: refusing to fetch from unexpected origin.\n` +
      `  Expected: ${ALLOWED_FETCH_ORIGIN}...\n` +
      `  Got:      ${url}`
    )
  }
  return fetch(url)
}

export interface RegistryComponent {
  name: string
  files: string[]
  dependencies: string[]
  devDependencies: string[]
  registryDependencies: string[]
}

export interface RegistryBlock {
  name: string
  files: string[]
  dependencies: string[]
  registryDependencies: string[]
}

export interface RegistryIndex {
  components: Array<{ name: string; label: string; description: string }>
  blocks?: Array<{ name: string; label: string; description: string }>
}

// ── Security: allowed npm dependency scopes and packages ──────────────────────
// Only packages matching these are permitted to be installed via the registry.
// This prevents a compromised registry from injecting arbitrary npm packages.

const ALLOWED_SCOPES = new Set(['@radix-ui'])

const ALLOWED_PACKAGES = new Set([
  'class-variance-authority',
  'clsx',
  'tailwind-merge',
  'sonner',
  'lucide-react',
])

// Matches valid npm package names (scoped and unscoped), with optional version.
const PACKAGE_NAME_RE =
  /^(@[a-z0-9][a-z0-9-._]*\/[a-z0-9][a-z0-9-._]*)(@[^\s]+)?$|^([a-z0-9][a-z0-9-._]*)(@[^\s]+)?$/

export function assertSafeDependency(dep: string): void {
  if (!PACKAGE_NAME_RE.test(dep)) {
    throw new Error(
      `Registry returned a malformed dependency name: "${dep}". Aborting install.`
    )
  }
  if (dep.startsWith('@')) {
    const scope = dep.slice(0, dep.indexOf('/'))
    if (!ALLOWED_SCOPES.has(scope)) {
      throw new Error(
        `Dependency scope "${scope}" is not in the approved list. ` +
        `Refusing to install "${dep}". If this is legitimate, open an issue on GitHub.`
      )
    }
  } else {
    const name = dep.split('@')[0]
    if (!ALLOWED_PACKAGES.has(name)) {
      throw new Error(
        `Package "${name}" is not in the approved dependency list. ` +
        `Refusing to install. If this is legitimate, open an issue on GitHub.`
      )
    }
  }
}

// ── Security: file path validation ────────────────────────────────────────────

export function assertSafeFilePath(filePath: string): void {
  if (
    filePath.includes('..') ||
    filePath.startsWith('/') ||
    /^[A-Za-z]:/.test(filePath) ||
    filePath.includes('\0') ||
    filePath.includes('\r') ||
    filePath.includes('\n')
  ) {
    throw new Error(`Registry returned an unsafe file path: "${filePath}". Aborting.`)
  }
}

// ── Security: component name validation ───────────────────────────────────────
// Registry dependency names (component names) must be simple identifiers.
// Prevents path traversal in URL construction.

export function assertSafeComponentName(name: string): void {
  if (!/^[a-z][a-z0-9-]*$/.test(name)) {
    throw new Error(`Invalid component name in registry: "${name}". Aborting.`)
  }
}

// ── Schema guards ─────────────────────────────────────────────────────────────

function assertRegistryIndex(data: unknown): asserts data is RegistryIndex {
  if (
    typeof data !== 'object' ||
    data === null ||
    !Array.isArray((data as Record<string, unknown>).components)
  ) {
    throw new Error('Received an invalid registry index from the server.')
  }
}

function assertRegistryComponent(data: unknown): asserts data is RegistryComponent {
  const obj = data as Record<string, unknown>
  const valid =
    typeof data === 'object' && data !== null &&
    typeof obj.name === 'string' &&
    Array.isArray(obj.files) &&
    Array.isArray(obj.dependencies) &&
    Array.isArray(obj.devDependencies) &&
    Array.isArray(obj.registryDependencies) &&
    (obj.files as unknown[]).every(f => typeof f === 'string') &&
    (obj.dependencies as unknown[]).every(d => typeof d === 'string') &&
    (obj.registryDependencies as unknown[]).every(d => typeof d === 'string')

  if (!valid) {
    throw new Error(
      `Received an invalid component definition for "${String(obj.name ?? 'unknown')}" from the registry.`
    )
  }
}

// ── Fetchers ──────────────────────────────────────────────────────────────────

export async function fetchRegistryIndex(): Promise<RegistryIndex> {
  const res = await safeFetch(`${REGISTRY_BASE}/index.json`)
  if (!res.ok) throw new Error(`Failed to fetch registry index: ${res.statusText}`)
  const data: unknown = await res.json()
  assertRegistryIndex(data)
  return data
}

export async function fetchComponent(name: string): Promise<RegistryComponent> {
  assertSafeComponentName(name)
  const res = await safeFetch(`${REGISTRY_BASE}/components/${name}.json`)
  if (!res.ok) throw new Error(`Component "${name}" not found in registry`)
  const data: unknown = await res.json()
  assertRegistryComponent(data)
  return data
}

export async function fetchComponentSource(name: string, file: string): Promise<string> {
  assertSafeComponentName(name)
  assertSafeFilePath(file)
  const res = await safeFetch(`${SOURCE_BASE}/${file}`)
  if (!res.ok) throw new Error(`Failed to fetch source for ${name}/${file}`)
  return res.text()
}

// ── Block fetchers ──────────────────────────────────────────────────────────

function assertRegistryBlock(data: unknown): asserts data is RegistryBlock {
  const obj = data as Record<string, unknown>
  const valid =
    typeof data === 'object' && data !== null &&
    typeof obj.name === 'string' &&
    Array.isArray(obj.files) &&
    Array.isArray(obj.dependencies) &&
    Array.isArray(obj.registryDependencies) &&
    (obj.files as unknown[]).every((f) => typeof f === 'string') &&
    (obj.dependencies as unknown[]).every((d) => typeof d === 'string') &&
    (obj.registryDependencies as unknown[]).every((d) => typeof d === 'string')

  if (!valid) {
    throw new Error(
      `Received an invalid block definition for "${String(obj.name ?? 'unknown')}" from the registry.`,
    )
  }
}

// Returns null when no block by this name exists, so `add` can fall back to a component.
export async function fetchBlock(name: string): Promise<RegistryBlock | null> {
  assertSafeComponentName(name)
  const res = await safeFetch(`${BLOCK_BASE}/${name}/block.json`)
  if (res.status === 404) return null
  if (!res.ok) throw new Error(`Failed to fetch block "${name}": ${res.statusText}`)
  const data: unknown = await res.json()
  assertRegistryBlock(data)
  return data
}

export async function fetchBlockSource(name: string, file: string): Promise<string> {
  assertSafeComponentName(name)
  assertSafeFilePath(file)
  const res = await safeFetch(`${BLOCK_BASE}/${name}/${file}`)
  if (!res.ok) throw new Error(`Failed to fetch source for block ${name}/${file}`)
  return res.text()
}
