---
"@tokiui/cli": patch
---

`init` now takes over the theme in `globals.css` instead of stacking on top of a starter template. A fresh `create-next-app` ships its own `--background`/`--foreground` tokens plus a `@media (prefers-color-scheme: dark)` block that override tokiui's tokens (producing e.g. light components on a dark OS). `init` now detects that starter theme, replaces it with the tokiui setup, and saves the original to `globals.css.bak`. A genuinely hand-written stylesheet is preserved (imports are prepended, with a warning to remove conflicting theme rules).
