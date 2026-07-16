import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import { z } from 'zod'
import {
  fetchComponent,
  fetchComponentSource,
  fetchFrame,
  fetchFrameSource,
  fetchRegistryIndex,
  REGISTRY_REF,
  type RegistryEntry,
} from './registry.js'

// Injected at build time by tsup define — keeps serverInfo in sync with package.json.
declare const __MCP_VERSION__: string
const VERSION = __MCP_VERSION__
const addCmd = (name: string) => `npx @tokiui/cli@latest add ${name}`

/** Wrap a string as an MCP text tool-result. */
function text(body: string) {
  return { content: [{ type: 'text' as const, text: body }] }
}

const matches = (e: RegistryEntry, q: string) =>
  `${e.name} ${e.label} ${e.description}`.toLowerCase().includes(q)

const server = new McpServer({ name: 'tokiui', version: VERSION })

server.registerTool(
  'list_components',
  {
    title: 'List tokiui components',
    description:
      'List all tokiui UI components with name, label, and a one-line description. Optionally filter with a search query. Use get_component for source + dependencies.',
    inputSchema: {
      query: z
        .string()
        .optional()
        .describe('Case-insensitive substring to filter by name, label, or description'),
    },
  },
  async ({ query }) => {
    const index = await fetchRegistryIndex()
    let items = index.components
    if (query) {
      const q = query.toLowerCase()
      items = items.filter((c) => matches(c, q))
    }
    const lines = items.map((c) => `- **${c.name}** — ${c.label}: ${c.description}`)
    return text(
      `# tokiui components (${items.length})\n\n${lines.join('\n')}\n\n` +
        'Install any with `npx @tokiui/cli@latest add <name>`. Call `get_component` for full source + npm deps.',
    )
  },
)

server.registerTool(
  'list_frames',
  {
    title: 'List tokiui frames',
    description:
      'List all tokiui frames — multi-file page compositions (dashboard, login, settings, sidebar, sales analytics) that install as a folder and wire up a ready route. Use get_frame for source.',
    inputSchema: {},
  },
  async () => {
    const index = await fetchRegistryIndex()
    const frames = index.frames ?? []
    if (frames.length === 0) return text('No frames are currently published.')
    const lines = frames.map((f) => `- **${f.name}** — ${f.label}: ${f.description}`)
    return text(
      `# tokiui frames (${frames.length})\n\n${lines.join('\n')}\n\n` +
        'Install any with `npx @tokiui/cli@latest add <name>`. Call `get_frame` for full source + the ready route.',
    )
  },
)

server.registerTool(
  'get_component',
  {
    title: 'Get a tokiui component',
    description:
      "Get a component's metadata, install command, npm dependencies, and full source. Find names with list_components or search.",
    inputSchema: {
      name: z.string().describe('Component name, e.g. "button", "card", "table"'),
    },
  },
  async ({ name }) => {
    const [index, comp] = await Promise.all([fetchRegistryIndex(), fetchComponent(name)])
    const meta = index.components.find((c) => c.name === name)
    const sources = await Promise.all(
      comp.files.map(
        async (f) => `### \`${f}\`\n\n\`\`\`tsx\n${await fetchComponentSource(name, f)}\n\`\`\``,
      ),
    )
    const deps = comp.dependencies.length ? comp.dependencies.join(', ') : 'none beyond @tokiui/ui'
    return text(
      `# ${meta?.label ?? name} (\`${name}\`)\n\n` +
        (meta ? `${meta.description}\n\n` : '') +
        `**Install:** \`${addCmd(name)}\`\n\n` +
        `**npm dependencies:** ${deps}\n\n` +
        `## Source\n\n${sources.join('\n\n')}`,
    )
  },
)

server.registerTool(
  'get_frame',
  {
    title: 'Get a tokiui frame',
    description:
      "Get a frame's metadata, install command, ready route, and the full source of every file it installs.",
    inputSchema: {
      name: z.string().describe('Frame name, e.g. "dashboard", "login", "settings", "sidebar-shell"'),
    },
  },
  async ({ name }) => {
    const frame = await fetchFrame(name)
    if (!frame) return text(`No frame named "${name}". Call list_frames to see the available frames.`)
    const index = await fetchRegistryIndex()
    const meta = index.frames?.find((f) => f.name === name)
    const sources = await Promise.all(
      frame.files.map(
        async (f) => `### \`${f}\`\n\n\`\`\`tsx\n${await fetchFrameSource(name, f)}\n\`\`\``,
      ),
    )
    const routeNote = frame.route
      ? `**Ready route:** installing writes \`app/${frame.route}/page.tsx\`, so the frame renders at \`/${frame.route}\` with no wiring.\n\n`
      : ''
    return text(
      `# ${meta?.label ?? name} (\`${name}\`) — frame\n\n` +
        (meta ? `${meta.description}\n\n` : '') +
        `**Install:** \`${addCmd(name)}\`\n\n` +
        routeNote +
        `Installs to \`components/frames/${name}/\` and is built entirely from @tokiui/ui primitives.\n\n` +
        `## Source\n\n${sources.join('\n\n')}`,
    )
  },
)

server.registerTool(
  'search',
  {
    title: 'Search tokiui',
    description:
      'Search components and frames by name, label, or description. Returns matches labeled by type (component or frame).',
    inputSchema: {
      query: z.string().describe('Search term, e.g. "table", "auth", "chart", "sidebar"'),
    },
  },
  async ({ query }) => {
    const index = await fetchRegistryIndex()
    const q = query.toLowerCase()
    const comps = index.components.filter((c) => matches(c, q))
    const frames = (index.frames ?? []).filter((f) => matches(f, q))
    if (comps.length === 0 && frames.length === 0) {
      return text(`No components or frames match "${query}".`)
    }
    const section = (title: string, arr: RegistryEntry[], kind: string) =>
      arr.length
        ? `## ${title}\n${arr
            .map((e) => `- **${e.name}** (${kind}) — ${e.label}: ${e.description}`)
            .join('\n')}`
        : ''
    return text(
      [section('Components', comps, 'component'), section('Frames', frames, 'frame')]
        .filter(Boolean)
        .join('\n\n'),
    )
  },
)

async function main() {
  await server.connect(new StdioServerTransport())
  // stdout is the MCP channel — log only to stderr.
  console.error(`tokiui MCP server v${VERSION} ready (registry ref: ${REGISTRY_REF})`)
}

main().catch((err) => {
  console.error('tokiui MCP server failed to start:', err)
  process.exit(1)
})
