# 27 — Calendar frame

A responsive month / week / day calendar — the most complex frame so far.

## Files (`apps/docs/src/registry/frames/calendar/`)

- `date-utils.ts` — zero-dep native-`Date` helpers (week/month grids, formatting). Swappable for date-fns/Temporal.
- `events.ts` — `CalendarEvent` type, `EVENT_STYLES` (literal token classes per color, scan-safe), `createSampleEvents(today)` (demo data relative to a reference day).
- `icons.tsx` — inline SVG.
- `time-grid.tsx` — shared week/day engine: `HourGutter`, `DayColumn` (overlap-aware side-by-side event layout, live now-indicator, click-to-add slots), `TimeGridScroll` (opens at ~7 AM).
- `month-view.tsx` / `week-view.tsx` / `day-view.tsx`.
- `page.tsx` — default export: SSR-safe "today" (mounted guard), toolbar (prev/next/today, month/week/day switcher, + Event), event-detail Dialog (with delete), add-event Dialog, click-a-day → day view, click-a-slot → add.

## Goals met

- **Responsive** — month grid fluid; the week/day time grid scrolls (horizontal on small screens via `min-w`); toolbar wraps.
- **Interactive** — navigate, switch views, click event → detail, click day → jump to day, click slot / +Event → add, delete.
- **Customizable** — events are a plain `CalendarEvent[]` (replace `createSampleEvents`); colors are token-based (`EVENT_STYLES`); the date layer is isolated in `date-utils.ts`.
- **SSR / static-export safe** — `new Date()` runs on the client only (mounted guard), so no hydration mismatch on the statically-exported docs.

## Verified

`tsc --noEmit` clean across the docs (0 errors). Registered in `index.json` `frames[]`, with a gallery route and gallery card. Ships as a `@tokiui/cli` patch; installable after release + the matching `cli-v*` tag.
