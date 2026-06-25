# Examples Section — Dashboard, Login, Settings

Date: 2026-06-25

---

Adds an **additive** `/examples` section to the docs app — full, real pages composed
entirely from tokiui components. Doubles as a deeper dogfood and an adoption asset. The
existing site design is untouched: new routes + one additive `docs-nav` group; the header
nav was deliberately left alone.

## Structure

- `app/examples/layout.tsx` — own full-width layout reusing the site Header + Footer + an
  in-section sub-nav (`components/examples/examples-nav.tsx`, active-aware via `usePathname`).
- `app/examples/page.tsx` — index linking the three examples.
- `app/examples/{login,settings,dashboard}/page.tsx` — the examples.
- `lib/docs-nav.ts` — additive "Examples" group (discoverable from the docs sidebar).

## Examples

- **Login** — centered auth card: social buttons (`Button` outline), email/password
  (`Input`), remember-me (`Checkbox`). Fully covered by the current component set.
- **Settings** — tabbed (`Tabs` line variant): Profile (`Avatar` + `Input` + `Textarea`),
  Account (`Input` + `Select` + `Separator` + destructive action), Notifications
  (`SwitchField` rows).
- **Dashboard** — app shell in a bordered frame: collapsible `Sidebar` (icon-rail +
  tooltips, badges, user footer), topbar with `SidebarTrigger`, stat `Card`s with delta
  `Badge`s, an activity feed, and a recent-orders **table**.

## Gap surfaced

The dashboard table is **hand-rolled** — tokiui has no **Data Table** (sorting, pagination,
row selection) and no **chart** primitive. These are the clear next component candidates,
exactly as the earlier dogfood surfaced `Kbd`. Everything else across all three pages is
real tokiui components.

Docs-only change — no published-package version bump.
