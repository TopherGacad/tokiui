# Frames Section — Dashboard, Login, Settings

Date: 2026-06-25

---

Adds a standalone **`/frames`** section: full page templates built entirely from tokiui
components, presented as a **grid of live previews**. It is *not* part of the docs/component
pages and intentionally **not** in the docs sidebar.

## Structure

- `app/frames/layout.tsx` — minimal passthrough (section metadata only); frames render full-bleed.
- `app/frames/page.tsx` — the gallery: site Header + a responsive grid of live preview tiles + Footer.
- `components/frames/frame-preview.tsx` — client tile that renders a scaled, non-interactive
  `<iframe>` of the frame (a `ResizeObserver` keeps the scale fitted) and links to the full page.
- `app/frames/{login,settings,dashboard}/page.tsx` — the frames, rendered standalone/full-bleed.
- `components/frames/charts.tsx` — dependency-free SVG/CSS charts (Sparkline, AreaChart, segmented DonutChart, RadialRing) styled entirely with tokiui tokens. tokiui has no chart primitive yet, so these are hand-rolled (flagged gap).

## Frames

- **Login** — centered auth card: social buttons (`Button`), email/password (`Input`), remember-me (`Checkbox`).
- **Settings** — tabbed (`Tabs` line): Profile (`Avatar` + `Input` + `Textarea`), Account (`Input` + `Select` + `Separator`), Notifications (`SwitchField`).
- **Dashboard** — a **full-viewport, responsive analytics** app (`components/frames/dashboard-frame.tsx`, client): collapsible `Sidebar` (icon-rail below `lg` via `useMediaQuery`); KPI cards with **sparklines** + trend `Badge`s; an **interactive revenue area chart** (metric `Tabs` swap the series) + period `Select`; a segmented **channel donut**; a refined transactions table (`Avatar` + status `Badge`s + real `Pagination`); a **radial target ring**; and a `Progress`-based top-products panel.

## Responsive by default (standard for all frames)

Frames are **production-level, responsive pages** — not fixed-size mockups. Each fills the
viewport and adapts to the screen size (e.g. the dashboard reflows its grids and collapses
its sidebar to an icon-rail below `lg`). This is the standard for **every frame going
forward**. The gallery tiles render each frame live in a scaled `<iframe>`, so the preview
reflects the real, responsive page.

## Gap surfaced

The dashboard table is hand-rolled — tokiui has no **Data Table** (sorting, pagination, row
selection) or **chart** primitive yet. These are the clear next component candidates, just as
the earlier dogfood surfaced `Kbd`.

Docs-only change — no published-package version bump. (Header nav untouched; discovery TBD —
the gallery is reachable at `/frames`.)
