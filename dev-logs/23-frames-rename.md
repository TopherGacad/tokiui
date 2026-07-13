# 23 — Rename "blocks" → "frames" + categorized `add` picker

## Why

The gallery, nav, and URL all said **Frames**, while the installer said **block** (`add` printed "Added block", files landed in `components/blocks/`). A user who saw "Frames" went looking for "frames" and hit "block" instead — confusing. "Blocks" is also the term a competitor library uses for this feature, so "frames" keeps tokiui's naming its own.

Separately, the interactive `add` picker listed components and frames in one flat multiselect, so a "Sidebar" component sat right next to a "Sidebar" frame — easy to pick the wrong one.

## What changed

- **CLI** (`packages/cli`): `RegistryBlock`→`RegistryFrame`, `fetchBlock`→`fetchFrame`, `fetchBlockSource`→`fetchFrameSource`, `installBlock`→`installFrame`, `BLOCK_BASE`→`FRAME_BASE` (→ `apps/docs/src/registry/frames`). Install dir `components/blocks/<name>/` → `components/frames/<name>/`; output "Adding/Added block" → "frame".
- **Interactive `add`**: a category step first (Components / Frames), then a single-category multiselect.
- **Registry**: `index.json` `blocks[]` → `frames[]`; manifest `block.json` → `frame.json` (`type: "frame"`); source dir `apps/docs/src/registry/blocks/` → `frames/`.
- **Docs**: installation / CLI / introduction / troubleshooting / configuration reworded block→frame; the `/frames/sidebar` gallery page imports from `registry/frames`.

## Compatibility

Registry fetches are pinned to the `cli-v{version}` git tag, so an older published CLI keeps reading its old `blocks[]` / `block.json` from its own tag — no break. The new CLI reads `frames[]` / `frame.json` from its matching tag. Ships as a `@tokiui/cli` minor; the matching `cli-v` tag must be pushed after publish.

## Note

Done in an isolated git worktree so the running docs dev server (which locks `apps/docs`) was never disturbed; verified via CI rather than a local build.
