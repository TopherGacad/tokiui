# @tokiui/cli

## 0.4.1

### Patch Changes

- fecf6d5: Refresh the registry pin so `add` can install the newly-added frames — **login**, **settings**, **dashboard**, and **sales-analytics** — alongside `sidebar-shell`. No CLI code change; the CLI serves its registry from the matching `cli-v{version}` git tag, so a release (and the accompanying tag) is required to surface newly-added frames.

## 0.4.0

### Minor Changes

- de973f3: Rename "blocks" to "frames" for consistency with the Frames gallery, and split the interactive `add` picker into two steps. Running `npx @tokiui/cli add` with no argument now first asks whether you're adding **Components** or **Frames**, then shows only that category — no more mixed list where a "Sidebar" component sat right next to a "Sidebar" frame. Frames install to `components/frames/<name>/` (was `components/blocks/`), the registry manifest is `frame.json` (was `block.json`), and the CLI reports "Added frame …". Registry fetches are pinned per-version, so previously-installed projects and older CLI versions are unaffected.

## 0.3.3

### Patch Changes

- 73ac599: Fix `tokiui theme apply` to accept themes exported from the playground. It now decodes the `{ light, dark }` token sets the playground produces and writes proper `:root` and `[data-theme="dark"]` override blocks into your `globals.css`, wrapped in marker comments so re-running replaces the block instead of stacking. Previously it misread the encoded format and emitted invalid variables.

## 0.3.2

### Patch Changes

- 525397a: Blocks that declare a `route` now install a ready-to-use page at `app/<route>/page.tsx`, so the block renders at a URL immediately after `tokiui add` — no manual importing or wiring. The `sidebar-shell` block installs at `/dashboard`.

## 0.3.1

### Patch Changes

- fec6258: `init` now takes over the theme in `globals.css` instead of stacking on top of a starter template. A fresh `create-next-app` ships its own `--background`/`--foreground` tokens plus a `@media (prefers-color-scheme: dark)` block that override tokiui's tokens (producing e.g. light components on a dark OS). `init` now detects that starter theme, replaces it with the tokiui setup, and saves the original to `globals.css.bak`. A genuinely hand-written stylesheet is preserved (imports are prepended, with a warning to remove conflicting theme rules).

## 0.3.0

### Minor Changes

- a36d444: Add prebuilt block support to `tokiui add`. Installing a block (e.g. `sidebar-shell`) scaffolds its multi-file composition into a self-contained folder and resolves any component dependencies; `tokiui add` with no argument now lists blocks alongside components. Also corrects the "not initialized" hint to reference `@tokiui/cli`.

## 0.2.1

### Patch Changes

- 1cbb6b4: Refresh the registry pin so `tokiui add` can install the components added since 0.2.0 — **Combobox**, **Kbd**, **Table**, and **Chart**. The CLI serves its component registry from the matching `cli-v{version}` git tag, so a release (and the accompanying tag) is required to surface newly-added components.

## 0.2.0

### Minor Changes

- Add 14 new components, enhance existing components with size/variant/error props, convert all themes to OKLCH,

## 0.1.1

### Patch Changes

- init: full project setup — installs packages, writes utils.ts, configures PostCSS, globals.css, and

## 0.1.0

### Minor Changes

- b315294: Initial release — Button, Badge, Card, Input, Dialog components with OKLCH theming
