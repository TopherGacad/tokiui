# @tokiui/mcp

An [MCP](https://modelcontextprotocol.io) server that exposes the tokiui component + frame registry to AI assistants (Claude Code, Cursor, and any MCP client). Your assistant can browse the catalog, read component source, and get the exact `add` command — so it can build with tokiui without guessing.

## Tools

| Tool | What it does |
|---|---|
| `list_components` | List every component (name, label, description). Optional `query` filter. |
| `list_frames` | List every frame — multi-file page compositions that install a ready route. |
| `get_component` | A component's metadata, install command, npm deps, and full source. |
| `get_frame` | A frame's metadata, install command, ready route, and full source. |
| `search` | Search components + frames by name, label, or description. |

## Use it

The server speaks MCP over **stdio** — point your client's config at it with `npx`.

**Claude Code** (`.mcp.json` or `claude mcp add`):

```json
{
  "mcpServers": {
    "tokiui": {
      "command": "npx",
      "args": ["-y", "@tokiui/mcp"]
    }
  }
}
```

**Cursor** (`.cursor/mcp.json`): the same `command` / `args` shape.

Then ask your assistant things like *"list the tokiui components"*, *"show me the tokiui table component"*, or *"add the tokiui dashboard frame"* — it will call these tools and get real source + the correct `npx @tokiui/cli@latest add …` command.

## Configuration

- **`TOKIUI_REGISTRY_REF`** — the git ref the registry is read from. Defaults to `main` (the current catalog). Set it to a `cli-v*` tag to pin to a specific release.

## How it works

Read-only. The server fetches the registry (component/frame manifests + source) over HTTPS from the tokiui GitHub repository — the same registry the CLI installs from — restricted to that single origin. It never writes to your project; it hands your assistant the source and the `add` command, and `@tokiui/cli` does the installing.
