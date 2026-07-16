# 24 — `@tokiui/mcp`: an MCP server for the registry

## Why

Phase C. Make tokiui AI-native: an MCP server so assistants (Claude Code, Cursor, any MCP client) can browse the component/frame catalog, read the real source, and get the correct `add` command — building with tokiui without guessing at names or props.

## What

New package `packages/mcp` (`@tokiui/mcp`), ESM, tsup → `dist/index.js` (bin `tokiui-mcp`). Speaks MCP over **stdio** via `@modelcontextprotocol/sdk` (`McpServer` + `StdioServerTransport`), with Zod input schemas.

Tools:
- `list_components` — all components; optional `query` filter
- `list_frames` — all frames
- `get_component` — metadata + install command + npm deps + full source
- `get_frame` — metadata + install command + ready route + full source
- `search` — components + frames by name / label / description

## Registry access

`src/registry.ts` mirrors the CLI's fetch model — same allowlisted GitHub origin, same path/name/schema guards — but is **read-only** and defaults to the `main` branch: the server surfaces the *current* catalog, and unlike `add` it never writes code, so there's no release-tag pin to keep in sync. Override with `TOKIUI_REGISTRY_REF` (e.g. a `cli-v*` tag) for reproducibility. The server hands the assistant source + the `npx @tokiui/cli@latest add <name>` command; `@tokiui/cli` does the installing.

## Verified

`tsc --noEmit` clean, tsup build clean (SDK 1.29.0). Smoke-tested over stdio against the live `main` registry: `initialize` → `tools/list` (5 tools) → `list_frames` (5 frames) → `search "table"` → `get_component button` (deps + source) → `get_frame sidebar-shell` (correctly reports the ready route `/sidebar`). All correct.

## Notes

- Version is baked from `package.json` via tsup `define` (`__MCP_VERSION__`, mirroring the CLI's `__CLI_VERSION__`) so `serverInfo` stays in sync.
- Package starts at `0.0.0`; the changeset's minor bump makes the first published version `0.1.0`.
- Follow-ups (not in this PR, keeps it off `apps/docs`): a docs-site page (`/docs/mcp`) + an "MCP" row in the introduction "What's in the box" table; later, MCP resources and richer per-component metadata (props/examples) once the registry exposes them.
