---
"@tokiui/mcp": minor
---

New package: **`@tokiui/mcp`** — an MCP server that exposes the tokiui component + frame registry to AI assistants (Claude Code, Cursor, any MCP client). Tools: `list_components`, `list_frames`, `get_component`, `get_frame`, and `search` — the assistant can browse the catalog, read real component/frame source, and get the exact `npx @tokiui/cli@latest add …` command. Read-only; fetches the registry over HTTPS from the tokiui repository (ref defaults to `main`, override with `TOKIUI_REGISTRY_REF`). Runs over stdio via `npx @tokiui/mcp`.
