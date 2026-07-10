---
"@tokiui/cli": patch
---

Fix `tokiui theme apply` to accept themes exported from the playground. It now decodes the `{ light, dark }` token sets the playground produces and writes proper `:root` and `[data-theme="dark"]` override blocks into your `globals.css`, wrapped in marker comments so re-running replaces the block instead of stacking. Previously it misread the encoded format and emitted invalid variables.
