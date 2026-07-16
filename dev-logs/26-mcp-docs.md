# 26 — MCP docs page

Added `/docs/mcp` (`apps/docs/src/app/docs/mcp/page.mdx`) documenting the `@tokiui/mcp` server:

- **What it does** + the tool table (`list_components`, `list_frames`, `get_component`, `get_frame`, `search`).
- **"Does my assistant already know about tokiui?"** — the question users actually ask. Answer: no, not until you connect it; setup is a one-time config entry, after which tool discovery is automatic (nothing to teach or paste).
- **Per-client setup** — Claude Code (`claude mcp add` / `.mcp.json` + `/mcp` to verify), Cursor (`.cursor/mcp.json`), and the generic shape for other clients.
- **Using it** — ask in plain language; the assistant calls the tools.
- **Making `add` work** — the server is read-only, so installing what it suggests needs an initialized tokiui project (`npx @tokiui/cli init`).
- **`TOKIUI_REGISTRY_REF`** + a short "how it works."

Also added the nav entry (Getting Started → MCP) and an `@tokiui/mcp` row to the introduction "What's in the box" table. Docs only — no release.
