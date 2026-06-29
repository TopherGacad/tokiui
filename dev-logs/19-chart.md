# Chart component — zero-dependency SVG charts

Date: 2026-06-29

---

Adds the **Chart** component — the gap the dashboard frame exposed (it hand-rolled SVG charts
because the library had none).

## Component (`chart.tsx`)

Zero-dependency SVG styled with the tokiui tokens (so charts retint with the theme), no charting lib:

- `Sparkline` — tiny inline trend line (KPI cards, table cells).
- `AreaChart` — gradient area + optional dashed `compare` series; **interactive** crosshair + active
  point + value tooltip on hover (HTML overlays, so the dot isn't distorted by the SVG stretch);
  renders its own x-axis labels.
- `BarChart` — responsive bars with hover highlight + tooltip.
- `DonutChart` — segmented ring with centered children.
- `RadialChart` — progress gauge.

Data-driven (`data: number[]` / `{ label?, value, color }[]`), `valueFormat` for tooltips, `labels`
for the x-axis. Intentionally presentational — for heavy analytics (zoom/brush/huge data) reach for a
dedicated lib (documented on the page).

## Docs + registry

- `/docs/components/chart` page with live demos for each type + nav entry.
- Registry entry → `tokiui add chart` (no npm dependencies).

## Dogfood

- Rewired the dashboard frame onto the library `Chart`; deleted the frame-local `charts.tsx`.

## Notes

- Validated the "can zero-dep SVG be genuinely interactive?" question with a live crosshair/tooltip
  proof on the dashboard chart **before** promoting it into the library.
- changeset: `@tokiui/ui` minor.
