---
"@tokiui/cli": patch
---

Blocks that declare a `route` now install a ready-to-use page at `app/<route>/page.tsx`, so the block renders at a URL immediately after `tokiui add` — no manual importing or wiring. The `sidebar-shell` block installs at `/dashboard`.
