# Promote the dogfood pilot → the live landing page

Date: 2026-06-26

---

The `/pilot` route (a parallel, tokiui-component rebuild of the landing page) was deleted after
validation (`ab5053a`). Per request, its conversions are now applied to the **live** landing page so
the homepage itself is built with tokiui — not just bespoke CSS.

## Approach

The pilot was a few commits stale (it predated the `/frames` nav link), so rather than restore the
stale files wholesale — which would have reverted the Frames link — its conversions were
**re-applied onto the current live components**, preserving everything added since.

## What changed (visual output unchanged)

- **Header** — search trigger `<button class="header-search">` → `<Button variant="outline">`
  (Frames nav link kept; ⌘K keycap kept bespoke).
- **Hero** — "Now public" pill → `<Badge variant="outline">`; copy button → `<Button size="icon">`.
- **Theme toggle** — `<button class="theme-toggle">` → `<Button size="icon">` + the library
  `useTheme({ transition: true })` crossfade (no longer the docs' private hook).
- **Theme teaser** — preset pickers → `<Button shape="pill" color="contrast">`. The two fake-token
  preview cards stay bespoke on purpose (they demo arbitrary `--t-*` vars, not real tokens).
- **Component preview** — hand-rolled switch → `<Switch thumbClassName=…>`; "Live" pill → `<Badge soft dot>`.
- **Features** (`page.tsx`) — `.feature-card` div → `<Card shadow="none">`.
- **Footer / changelog / install bar / nav links** — kept bespoke (no clean component mapping).

Every swap carries className overrides that reproduce the original exactly — this is an
implementation swap, not a redesign.

## Notes

- Exercises exactly the APIs the dogfood drove into 0.4.0: button `shape` / `color="contrast"`,
  switch `thumbClassName`, `useTheme({ transition })`.
- `Kbd` now exists, so the ⌘K keycap could also move onto the component — deferred to keep this a
  faithful promotion of the already-validated pilot.
- The landing-page changelog is still placeholder copy (lists components that don't exist yet) — a
  separate content fix, intentionally out of scope here.
- Docs app is not a published package, so no changeset. Typecheck clean (`docs tsc: 0`).
