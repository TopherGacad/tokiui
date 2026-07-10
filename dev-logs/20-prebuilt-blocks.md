# Prebuilt Blocks & Nested Sidebar Nav

## Nested sidebar primitives (`@tokiui/ui`)

Added `SidebarMenuSub`, `SidebarMenuSubItem`, and `SidebarMenuSubButton` to `sidebar.tsx` — an indented, guide-lined sub-menu that hides automatically in the collapsed icon rail. This unlocks tree-style navigation (a menu item that expands into nested sub-items). Exported from `index.ts` with their prop types.

## Prebuilt blocks — `tokiui add <block>`

Blocks are decomposed, multi-file page compositions installable via the CLI — one notch above a single component.

**Model — library-backed.** Block files import primitives from `@tokiui/ui` (installed by `tokiui init`) and own only the *composition* files. They install as a self-contained folder (`blocks/<name>/`) with relative sibling imports, so **no import rewriting is needed** — the same files render in the docs preview and work after install.

**Pieces:**
- Source + `block.json` manifest live in `apps/docs/src/registry/blocks/<name>/` (also the live-preview source). Catalog: a `blocks[]` array in `packages/registry/index.json`.
- CLI: `fetchBlock` / `fetchBlockSource` in `registry.ts` (new block base URL); `installBlock` + a block-vs-component dispatcher in `add.ts`. `tokiui add` with no argument now lists blocks alongside components.
- Pilot block **`sidebar-shell`**: a collapsible app sidebar (brand header, nested nav via `SidebarMenuSub`, menu badges, user footer) plus a shell page. Decomposed into `app-sidebar`, `nav-main`, `nav-secondary`, `nav-user`, `icons`, and `page`. Previewed at `/frames/sidebar`.

## Sales analytics dashboard frame

Added `sales-frame.tsx` (`/frames/sales-analytics`) — a dense sales report: KPI row, referrers, donut + area charts, a per-rep table, and platform-value bars, built from tokiui components + the Chart component. Full responsive shell (tree nav collapses to a slide-in drawer below `lg`).

## Registry description cleanup

Rewrote several generic component descriptions in `index.json` in tokiui's own voice for a distinct, consistent catalog.
