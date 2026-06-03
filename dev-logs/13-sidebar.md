# Sidebar

Date: 2026-06-03

---

## Component (`sidebar.tsx`)

No Radix UI primitive — custom implementation using React context + Radix Tooltip for collapsed-mode labels.

### Architecture

- `SidebarProvider` — wraps the full layout; provides `open/setOpen/toggle` via context; also mounts `TooltipPrimitive.Provider` so tooltip delays are shared
- CSS variables `--sidebar-width` (240px) and `--sidebar-width-collapsed` (56px) set on the provider wrapper; `Sidebar` transitions between them via `transition-[width]`

### Components

- `Sidebar` — `<aside>` with `data-state="expanded|collapsed"` and smooth width transition
- `SidebarTrigger` — panel-layout icon button; calls `toggle()` from context
- `SidebarHeader` / `SidebarContent` / `SidebarFooter` — layout slots; content is scrollable
- `SidebarSeparator` — `<hr>` with border token
- `SidebarGroup` — flex-col wrapper for a nav section
- `SidebarGroupLabel` — uppercase tracking label; fades + collapses in icon-rail mode
- `SidebarMenu` / `SidebarMenuItem` — semantic `<ul>/<li>` for nav items
- `SidebarMenuButton` — the core interactive element; `isActive` for highlight, `tooltip` for collapsed-mode tooltip (via Radix Tooltip), `asChild` for router link support
- `SidebarMenuBadge` — count badge that fades out when collapsed
- `SidebarInset` — `flex-1` main content area sitting beside the sidebar

### Docs

Four demos embedded as full app-shell previews (fixed height container):
1. Basic — two nav groups (Main + Analytics) + bottom settings/help links
2. Collapsible sub-menus — `Platform`/`Projects` groups; parent items toggle a nested `SidebarMenu` (chevron + `grid-rows` height animation), built from base primitives only. Nested list hidden while the rail is collapsed (reads `useSidebar().open`)
3. User footer — workspace header + nav + user avatar/email pinned to footer
4. Icon rail — starts collapsed (`defaultOpen={false}`); tooltips appear on hover

### Fixes (2026-06-03)

- **Collapsed-mode labels**: `SidebarMenuButton` now hides all children except the leading icon when collapsed (`[&>*:not(:first-child)]:hidden`) so the icon rail shows clean centered icons instead of clipped labels.
- **Prose-list leak (docs)**: `.docs-prose ul` (`padding-left: 22px`, specificity 0,1,1) was overriding the component's `p-0` reset inside live demos, indenting nav lists and pushing collapsed icons ~11px off-center. Added a list-spacing reset scoped to `.show__body` / `.doc-preview__stage` in `globals.css`. Also benefits Navigation Menu, Pagination, and Breadcrumb demos. Note: this reset zeroes `<ul>` padding inside demos, so the sub-menu demo puts its indent/border on a wrapper `<div>`, not the `<ul>`.
