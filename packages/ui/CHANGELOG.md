# @tokiui/ui

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
