# 25 — Playground → `theme apply` round-trip

## Why

`theme apply` shipped in `@tokiui/cli@0.3.3` (decodes the playground's base64 `{light,dark}`, writes idempotent `:root` + `[data-theme="dark"]` blocks between markers). But the playground had no one-click way to produce the command, and the docs still carried a "round-trip is being reworked" caveat. This closes the loop.

## What

- **Playground** (`playground-content.tsx`): added a **Copy CLI command** button — copies `npx @tokiui/cli@latest theme apply <encoded>`, where `<encoded>` is `encodeTheme(light, dark)` (base64 of `{light,dark}`) — the exact input `theme apply` decodes.
- **Docs**: un-caveated the CLI `theme` section (now documents `theme apply` + the round-trip) and added the **Copy CLI command** path to the Theming page's playground toolbar list.

## Format-compatible (verified)

Playground `encodeTheme` = `base64(JSON({light,dark}))`; CLI `theme apply` = `JSON.parse(base64 → utf8)` expecting `{light,dark}`; both map camelCase token keys → `--kebab-case` identically. Verified end-to-end: encoded a sample theme the playground's way, ran the published `theme apply` against a real project, and confirmed the `/* tokiui theme */` block landed in `globals.css`.

## No release

Docs + playground only (`apps/docs`) — no published-package change, so no changeset. The CLI side was already released in 0.3.3.
