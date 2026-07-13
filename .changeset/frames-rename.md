---
"@tokiui/cli": minor
---

Rename "blocks" to "frames" for consistency with the Frames gallery, and split the interactive `add` picker into two steps. Running `npx @tokiui/cli add` with no argument now first asks whether you're adding **Components** or **Frames**, then shows only that category — no more mixed list where a "Sidebar" component sat right next to a "Sidebar" frame. Frames install to `components/frames/<name>/` (was `components/blocks/`), the registry manifest is `frame.json` (was `block.json`), and the CLI reports "Added frame …". Registry fetches are pinned per-version, so previously-installed projects and older CLI versions are unaffected.
