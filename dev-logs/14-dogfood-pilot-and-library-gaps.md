# Dogfood Pilot (landing page) + Library Gap Fixes

Date: 2026-06-24

---

## Why

To validate that tokiui can build our own marketing site with **no visual change**, we
built a parallel, non-destructive pilot of the landing page that swaps bespoke,
component-like markup for real `@tokiui/ui` components. The live homepage (`/`) was never
touched; a temporary `/pilot` route provided side-by-side comparison — **since removed**
after the approach was validated and the library fixes below landed.

## Pilot route (temporary — since removed)

A throwaway `/pilot` route plus `components/pilot/` copies mirrored the live landing page
with tokiui components (Features `.feature-card` → `Card`; header/hero/theme-teaser/
component-preview converted) for side-by-side comparison. It validated the approach and was
**removed** once the findings were captured and the library fixes landed — the durable
outcomes are the gap fixes, not the pilot itself.

### Findings

The landing page only needs **5 of 30 components** (`Button, Badge, Card, Input, Switch`) —
expected for a marketing page (mostly layout + basic controls). Most unconverted markup is
**page layout/scaffolding** (no library ships a "hero" or "changelog grid"), not missing
components.

- **`Card` ← `.feature-card`**: pixel-identical (`shadow="none"` + `p-7`; radius/border already token-matched).
- **Genuinely missing component**: `Kbd` (the `⌘K` keycap) — kept bespoke, on the Tier-5 roadmap.
- **Not a gap, correctly bespoke**: `Tabs` can't model the preview's "split" (both-panels-visible)
  mode — that's a layout choice, not tab behavior; the theme-teaser demo cards stay bespoke
  on purpose (tinted by fake `--t-*` preset vars).

## Library gaps fixed (additive, backward-compatible)

Surfaced by the pilot's override hacks; fixed in `@tokiui/ui` and the pilot updated to use the clean APIs:

- **Button** — `shape` (`default` | `pill`) and `color="contrast"` (neutral foreground-filled).
  `rounded-md` moved from the base class into `shape.default` so defaults are unchanged.
- **Switch** — `thumbClassName` prop (the thumb was hardcoded `bg-white`, unreachable by consumers).
- **useTheme** — opt-in `{ transition: true }` View Transitions crossfade + default
  `::view-transition-*(root)` rule in `styles.css`. Mirrors the docs' local hook logic
  (DOM-synchronous apply inside the transition callback).

No live-site or existing-demo visuals change — defaults are preserved across all three.
