// Read-only access to the tokiui registry for the MCP server.
//
// Mirrors the CLI's fetch model (same allowlisted GitHub origin + schema guards)
// but defaults to the `main` branch: the MCP surfaces the *current* catalog and,
// unlike `add`, never writes code — so pinning to a release tag isn't required.
// Override with TOKIUI_REGISTRY_REF (e.g. a `cli-v*` tag) for reproducibility.

const ALLOWED_FETCH_ORIGIN = 'https://raw.githubusercontent.com/TopherGacad/tokiui/'
const SAFE_REF_RE = /^[a-zA-Z0-9._/@-]+$/

function resolveRegistryRef(): string {
  const envRef = process.env.TOKIUI_REGISTRY_REF
  if (envRef !== undefined) {
    if (!SAFE_REF_RE.test(envRef) || envRef.includes('..')) {
      throw new Error(
        `TOKIUI_REGISTRY_REF contains invalid characters: "${envRef}". ` +
          'Only alphanumeric characters, hyphens, dots, slashes, and @ are allowed.',
      )
    }
    return envRef
  }
  return 'main'
}

export const REGISTRY_REF = resolveRegistryRef()

const REGISTRY_BASE = `${ALLOWED_FETCH_ORIGIN}${REGISTRY_REF}/packages/registry`
const SOURCE_BASE = `${ALLOWED_FETCH_ORIGIN}${REGISTRY_REF}/packages/ui/src`
const FRAME_BASE = `${ALLOWED_FETCH_ORIGIN}${REGISTRY_REF}/apps/docs/src/registry/frames`

// Every outbound request goes through here — refuse anything not on the tokiui origin.
async function safeFetch(url: string): Promise<Response> {
  if (!url.startsWith(ALLOWED_FETCH_ORIGIN)) {
    throw new Error(`Security: refusing to fetch from an unexpected origin: ${url}`)
  }
  return fetch(url)
}

export interface RegistryEntry {
  name: string
  label: string
  description: string
}

export interface RegistryIndex {
  components: RegistryEntry[]
  frames?: RegistryEntry[]
}

export interface RegistryComponent {
  name: string
  files: string[]
  dependencies: string[]
  registryDependencies: string[]
}

export interface RegistryFrame {
  name: string
  files: string[]
  dependencies: string[]
  registryDependencies: string[]
  /** When set, `add` also writes app/<route>/page.tsx so the frame renders at /<route>. */
  route?: string
}

// ── Guards (path-traversal + shape) ─────────────────────────────────────────

function assertSafeName(name: string): void {
  if (!/^[a-z][a-z0-9-]*$/.test(name)) {
    throw new Error(`Invalid registry name: "${name}".`)
  }
}

function assertSafeFilePath(filePath: string): void {
  if (
    filePath.includes('..') ||
    filePath.startsWith('/') ||
    /^[A-Za-z]:/.test(filePath) ||
    filePath.includes('\0') ||
    filePath.includes('\r') ||
    filePath.includes('\n')
  ) {
    throw new Error(`Registry returned an unsafe file path: "${filePath}".`)
  }
}

function assertIndex(data: unknown): asserts data is RegistryIndex {
  if (
    typeof data !== 'object' ||
    data === null ||
    !Array.isArray((data as Record<string, unknown>).components)
  ) {
    throw new Error('Received an invalid registry index from the server.')
  }
}

function assertFileList(data: unknown, kind: string, name: string): asserts data is { files: string[] } {
  const obj = data as Record<string, unknown>
  const valid =
    typeof data === 'object' &&
    data !== null &&
    Array.isArray(obj.files) &&
    (obj.files as unknown[]).every((f) => typeof f === 'string')
  if (!valid) {
    throw new Error(`Received an invalid ${kind} definition for "${name}" from the registry.`)
  }
}

// ── Fetchers ────────────────────────────────────────────────────────────────

export async function fetchRegistryIndex(): Promise<RegistryIndex> {
  const res = await safeFetch(`${REGISTRY_BASE}/index.json`)
  if (!res.ok) throw new Error(`Failed to fetch registry index: ${res.statusText}`)
  const data: unknown = await res.json()
  assertIndex(data)
  return data
}

export async function fetchComponent(name: string): Promise<RegistryComponent> {
  assertSafeName(name)
  const res = await safeFetch(`${REGISTRY_BASE}/components/${name}.json`)
  if (!res.ok) throw new Error(`Component "${name}" not found in the registry.`)
  const data: unknown = await res.json()
  assertFileList(data, 'component', name)
  return data as RegistryComponent
}

export async function fetchComponentSource(name: string, file: string): Promise<string> {
  assertSafeName(name)
  assertSafeFilePath(file)
  const res = await safeFetch(`${SOURCE_BASE}/${file}`)
  if (!res.ok) throw new Error(`Failed to fetch source for ${name}/${file}.`)
  return res.text()
}

// Returns null when no frame by this name exists (so callers can fall back to a component).
export async function fetchFrame(name: string): Promise<RegistryFrame | null> {
  assertSafeName(name)
  const res = await safeFetch(`${FRAME_BASE}/${name}/frame.json`)
  if (res.status === 404) return null
  if (!res.ok) throw new Error(`Failed to fetch frame "${name}": ${res.statusText}`)
  const data: unknown = await res.json()
  assertFileList(data, 'frame', name)
  return data as RegistryFrame
}

export async function fetchFrameSource(name: string, file: string): Promise<string> {
  assertSafeName(name)
  assertSafeFilePath(file)
  const res = await safeFetch(`${FRAME_BASE}/${name}/${file}`)
  if (!res.ok) throw new Error(`Failed to fetch source for frame ${name}/${file}.`)
  return res.text()
}
