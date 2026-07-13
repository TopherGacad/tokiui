# @tokiui/ui

## 0.6.1

### Patch Changes

- 0c8c334: Fix components imported from `@tokiui/ui` (the Sidebar and everything the blocks compose) rendering unstyled in consumer apps. `@tokiui/ui/styles.css` now includes `@source "../dist"`, so Tailwind v4 scans the compiled components and generates the utility classes they use. Previously a consumer's Tailwind only scanned its own source files, so classes used _inside_ imported components — e.g. the Sidebar's `border-r` and `w-[var(--sidebar-width)]` — were never generated, leaving the sidebar with no panel, border, or widths.

## 0.6.0

### Minor Changes

- a36d444: Add nested sidebar menu primitives — `SidebarMenuSub`, `SidebarMenuSubItem`, and `SidebarMenuSubButton` — an indented, guide-lined sub-menu for tree-style navigation that collapses out of view when the sidebar is in icon-rail mode.

## 0.5.0

### Minor Changes

- b2fb0b9: Add **Chart** — zero-dependency SVG charts: `Sparkline`, `AreaChart` (interactive crosshair + value tooltip), `BarChart`, `DonutChart`, and `RadialChart`. Data-driven and themed with your design tokens (they retint with light/dark). No charting dependency.
- e7cf26f: Add **Table** — composable, accessible table primitives (`Table`, `TableHeader`, `TableBody`, `TableFooter`, `TableRow`, `TableHead`, `TableCell`, `TableCaption`). Use them directly for static tables, or compose with state for sortable / paginated / selectable data tables. No new dependencies.

### Patch Changes

- 16459cf: Fix `useTheme` re-applying its initial `light` value to the DOM and `localStorage` on every (re)mount before reading the stored theme, which caused a flash to light on remount. It now adopts the theme already applied to the DOM (by a pre-paint script) or the stored / system value and applies that — no clobber.

## 0.4.0

### Minor Changes

- e8aa96d: Add two components, completing Phase B:
  - **Combobox** — a searchable single-select dropdown built on Popover (no new dependency). Options-driven API with controlled/uncontrolled value, keyboard navigation, clearable selection, sizes, error state, and form `name` support.
  - **Kbd** — a keyboard-key display for hotkeys and shortcut hints, with `sm`/`md`/`lg` sizes.

- 206bd8d: Add toggle/selected-state affordances surfaced while dogfooding the docs landing page:
  - **Button** — new `shape` prop (`default` | `pill`) and `color="contrast"` (neutral, foreground-filled) for toggle / segmented / "selected" states.
  - **Switch** — new `thumbClassName` prop to style the thumb (knob), including `data-[state=checked]:` variants.
  - **useTheme** — new opt-in `{ transition: true }` option that animates the light/dark switch via the View Transitions API, with a graceful instant fallback where unsupported. Ships a default root-crossfade rule in `styles.css`.

  All additive and backward-compatible — existing usage is unchanged.

## 0.3.0

### Minor Changes

- a4ba450: Add spinner, skeleton, separatir and Avatar components
- 847d7ce: Add Phase B Tier 2 navigation components: Breadcrumb, Pagination, Stepper, Navigation Menu, and Sidebar (collapsible icon-rail mode, grouped nav, badges, and collapsible sub-menus).
- 626ce0e: Add Accordion and Progress components; improve Badge soft colors and Accordion styling

## 0.2.0

### Minor Changes

- Add 14 new components, enhance existing components with size/variant/error props, convert all themes to OKLCH,

## 0.1.0

### Minor Changes

- b315294: Initial release — Button, Badge, Card, Input, Dialog components with OKLCH theming
