# Handoff: tokiui Sales Analytics Dashboard

## Overview
A dense sales-analytics dashboard ("New report" view) for the tokiui product. It shows revenue performance, per-rep sales breakdowns, referrer channels, platform value, and sales dynamics over time. The layout is a rounded "app shell" floating on a neutral desk background, with a dual left navigation (icon rail + expandable tree), a search top bar, and a scrollable analytics canvas.

## About the Design Files
The file in this bundle — `Dashboard.html` — is a **design reference created in HTML/CSS**. It is a prototype showing intended look and behavior, **not production code to copy directly**.

Your task is to **recreate this design in the target codebase's existing environment** (React, Vue, Svelte, SwiftUI, etc.) using its established patterns, component library, and design tokens. If no environment exists yet, choose the most appropriate framework for the project and implement it there. Treat the HTML as the source of truth for visual design (spacing, color, type, states) and structure — but express it idiomatically in your stack (real components, a charting library for the graphs, an icon set, etc.).

## Fidelity
**High-fidelity (hifi).** Colors, typography, spacing, radii, and states are final and intentional. Recreate the UI faithfully using the codebase's existing libraries and patterns. Exact token values are listed under **Design Tokens** below.

One deliberate note: the source screenshot this was derived from used a magenta accent. This design intentionally uses the **tokiui chartreuse accent** instead (`oklch(0.74 0.17 118)`) to stay on-brand. Keep chartreuse unless the product owner says otherwise.

---

## Layout — App Shell

Outer frame: full viewport, `16px` padding, desk background `oklch(0.95 0.004 95)` (dark: `oklch(0.09 0.004 95)`).

The **shell** is a CSS grid, `border-radius: 20px`, `1px` border, `box-shadow` xl, `overflow: hidden`:

```
grid-template-columns: 64px 232px 1fr;   /* rail | tree nav | main */
```

- **Column 1 — Icon rail (64px)**: vertical flex, centered, `border-right`.
- **Column 2 — Tree nav (232px)**: brand header + scrollable nav tree, `border-right`.
- **Column 3 — Main (1fr)**: vertical flex → top bar (fixed) + scrollable canvas.

Everything is one screen; only the main canvas and the tree nav scroll independently.

---

## Screens / Views

### 1. Icon Rail (column 1)
- **Purpose**: top-level app switcher.
- **Layout**: `flex-column`, `align-items:center`, `padding:16px 0`, `gap:6px`.
- **Components (top→bottom)**:
  - **Logo tile**: 36×36, `border-radius:11px`, bg `--foreground`, text `--card`, "t", weight 700, 17px, `margin-bottom:14px`.
  - **Nav icon buttons** (5): 40×40, `border-radius:12px`, transparent → hover `--muted`. Active button: bg `--primary`, text `--primary-foreground`, plus a 3px chartreuse indicator tab bleeding off the left edge (`left:-16px`, height 22px). Icons: explore/compass, **reports (bar chart — active)**, documents, command (⌘ glyph), edit/pencil.
  - **Spacer** (flex:1).
  - **Help** icon button (circle-question).
  - **Avatar**: 34×34 circle, gradient `135deg, oklch(0.72 0.16 250) → oklch(0.42 0.14 285)`, initials "JR", 2px `--card` border, with a chartreuse status dot (9px) top-right.
  - **Settings** gear icon button.

### 2. Tree Nav (column 2)
- **Purpose**: workspace navigation with nested folders.
- **Brand header**: `padding:20px 16px 16px`, "tokiui.com" weight 600 15px + chevron-down (muted).
- **Scroll area**: `padding:0 10px 14px`, custom thin scrollbar.
- **nav-link** (row): `flex`, `gap:9px`, `padding:7px 10px`, `border-radius:8px`, font 13.5px, color `--muted-foreground`; hover/active bg `--muted` + text `--foreground` (active also weight 500). Leading icon 15px. Optional trailing: a `+` add button (appears on hover, opacity 0→1), a disclosure chevron (rotates 90° when open), or a badge.
- **Badges**: pill, min-width 18px, height 18px, font 10.5px mono weight 600. Default badge = bg `--primary` / text `--primary-foreground`; muted variant = bg `--muted`, `1px` border, muted text.
- **Nested groups** (`.nav-sub`): `padding-left:14px` with a `1px` vertical guide line (`--border`) at `left:15px`; child links `padding-left:18px`, font 13px.
- **Content (exact copy & structure)**:
  - Top-level links: **Starred** (star icon), **Recent** (clock), **Sales list** (list), **Goals** (target/concentric circles).
  - **Dashboard** group (open, has `+`): children → *Codename*, *Shared with me* (open, chevron) → *Cargo2go*, *Cloudz3r* (badge **2**), *Idioma*, *Syllables*, *x-0b*.
  - **Reports** group (open, file icon, has `+`): children → *Shared with me* (open) → *Deals by user*, *Deal duration*; *My reports* (open) → *Emails received*, *Deal duration*, **New report** (active, colored `--primary`, weight 600), *Analytics* (muted badge **7**).
  - **Manage folders** (archive icon), `margin-top:8px`.

### 3. Top Bar (column 3, header)
- **Layout**: `flex`, `align-items:center`, `gap:14px`, `padding:12px 20px`, `border-bottom`, bg `--card`.
- **Search**: pill, `flex:1` max-width 440px, height 38px, `border-radius:999px`, bg `--input`, `1px` border; search icon + input placeholder `Try searching "insights"` + `⌘ K` kbd chip. Focus-within → border `--ring`, bg `--card`.
- **Spacer** (flex:1).
- **Icon button** (hamburger/menu): 36×36, `border-radius:10px`, `1px` border.
- **Avatar stack**: 3 overlapping 30px circles (`margin-left:-8px`), 2px `--card` borders; gradient avatars "A" (orange), "E" (blue), "M" (purple).
- **Add button**: 38×38, `border-radius:12px`, bg `--primary`, `+` icon, shadow-sm; hover darkens 12%.

### 4. Analytics Canvas (column 3, scroll)
`padding:22px 24px 40px`, scrolls vertically.

**(a) Report head row** — `flex`, `gap:12px`, `margin-bottom:20px`:
- Dashed `+` chip (32px circle).
- People chips: pill, height 32px, `1px` border, 24px gradient avatar + name — "Armin A." (orange), "Eren Y." (blue), "Mikasa A." (purple).
- Spacer, then 3 icon buttons (settings-sliders, download, share/upload).
- **Timeframe** pill: chartreuse toggle switch (on) + "Timeframe" + bold date "Sep 1 – Nov 30, 2023" + chevron.

**(b) Title**: `h1` "New report", 30px, weight 600, `letter-spacing:-0.03em`.

**(c) Revenue + KPI card** (`.card` + `18px` pad, `margin-bottom:14px`):
- **rev-row**: `display:flex; flex-wrap:wrap; gap:18px 24px; justify-content:space-between`. IMPORTANT — this must wrap so the KPI grid reflows below the revenue block on narrow canvases (see Responsive).
  - **rev-block** (`min-width:260px`): label "Revenue" (13px muted); amount `$528,976` 44px weight 600 `letter-spacing:-0.035em`, with `.82` cents in muted; inline delta chips → up chip `7.9%` (arrow-up-right icon, bg `up@14%`, text `--up` green) + value chip `$27,335.09` (bg `--muted`, border). Sub-line: "vs prev. $501,641.73 · Jun 1 – Aug 31, 2023 ⌄" 12.5px muted.
  - **kpi-row** (`flex:1 1 520px`): grid `repeat(5, minmax(96px,1fr))`, `gap:10px`. Each **kpi**: `1px` border, `border-radius:10px`, `padding:12px 14px`, `flex-column`, `gap:6px`. Label 11.5px muted (some with trailing chevron/star); value 20px weight 600; foot 11.5px muted.
    1. **Top sales** — "72", foot avatar "M" + "Mikasa", label has `>` chevron.
    2. **Best deal** — **dark card** (bg `--foreground`, text `--card`), star icon in chartreuse, "$42,300", foot "Rolf Inc. >".
    3. **Deals** — "256", foot mini-delta `▾ 5` (red/down).
    4. **Value** — "528k", foot `▴ 7.9%` (green/up).
    5. **Win rate** — "44%", foot `▴ 1.2%` (green/up).
- **segbar** (`margin-top:14px`, flex, `gap:8px`): a track of proportional pills (use `flex` values as weights) + a dark "Details >" button.
  - Pills (avatar + bold value + muted mono %): A `$209,633` 39.63% (flex 2.09), E `$156,841` 29.65% (flex 1.57), M `$117,115` 22.14% (flex 1.17), S `$45,386` 8.58% (flex 0.45). Pill bg `--muted`, `1px` border, `border-radius:999px`.
  - **Details button**: dark pill, height 34px, bg `--foreground`, text `--card`.

**(d) Main grid** (`.grid-main`): `grid-template-columns: 1.35fr 1.4fr; gap:14px; margin-top:16px; align-items:start`. Collapses to one column below 1180px. Two `.col` (flex-column, gap 14px).

**LEFT column:**
- **Referrers card**: card-head (drag-handle icon + "Referrers" title, "Filters ▽" pill button). Four rows, grid `1fr auto auto`, `padding:11px 16px`, divided by `1px` borders. Each: rounded-square brand icon (24px) + name; mono value; muted mono %.
  - Dribbble `$227,459` 43% (icon bg `oklch(.6 .19 355)` pink, "D"); Instagram `$142,823` 27% (gradient orange→magenta, "Ig"); Behance `$89,935` 11% (`oklch(.5 .16 265)` blue, "Bē"); Google `$37,028` 7% (`oklch(.55 .18 145)` green, "G").
- **Deals amount donut card**: card-head ("Deals amount" + muted "by referrer", kebab button). Donut = `conic-gradient` 130px with a 22px inner cutout (`::after` = `--card`), center label "Total / $497k". Legend 2×2: Dribbble 43% (red), Instagram 27% (purple), Behance 19% (blue), Google 11% (green) — each a colored dot + name + right-aligned mono %.
- **Platform value card**: card-head (small "D" tile + "Platform value" + muted "Dribbble", segmented toggle Revenue|Leads|W/L with Revenue active). Body grid `150px 1fr`:
  - **bar-summary**: dark rounded block (`bg --foreground`, `text --card`), "Average monthly / Revenue / $18,552", lines "Leads **373** · 97/276", "Win/loss **16%** · 51/318".
  - **bars**: flex row, height 210px, 3 stacked columns (Sep/Oct/Nov). Each stack = chartreuse bar (with a dark price tag chip above: $6,901 / $11,035 / $9,288) over a muted bar; mono x-labels.

**RIGHT column** — single card containing a mini per-rep table + inline expansion + line chart:
- **Header row** (`.sales-th`, grid `1.5fr 1fr 0.7fr 0.7fr 1.2fr`, 11px muted): Sales | Revenue | Leads | KPI | W/L.
- **Rep row** (`.sales-tr`, same grid, `padding:12px 16px`, top border): 26px avatar + name; mono revenue; a dark **num-pill** (leads count) + muted mono total; mono KPI; W/L = `%` + soft num-pill + number.
  - Armin A. — $209,633 · 41/118 · 0.84 · 31% [12] 29.
  - Mikasa A. — $156,841 · 54/103 · 0.89 · 39% [21] 33 — **expanded**, has a collapse chevron button.
- **Expansion panel** (`.sales-expand`, bg `--muted`, `border-radius:12px`, `margin:4px 12px`, `padding:12px 14px`):
  - Tag row: "Top sales 🏆", "Sales streak 🔥", "Top review 👍", and a right-aligned accent tag `▴3 $156,841` (bg `--primary-soft`).
  - "Work with platforms" (12.5px weight 600).
  - **platform-mini** grid 2×2 (`.pm` cards): Dribbble 14.1% $44,072; Instagram 28.1% $44,072; **Google** 5.4% $8,449 (accent variant, `--primary-soft` bg); Other 7.1% $11,595.
- **Sales dynamic** (12.5px weight 600) + **line chart**: week labels W1–W6 (mono, muted). SVG `viewBox 0 0 480 120`, `preserveAspectRatio:none`: 3 horizontal gridlines; a **chartreuse** area path (gradient fill `primary@28% → 0%`) as the primary series; a **dashed muted** secondary line; two marker dots (chartreuse at x192, dark at x384) with 2px `--card` stroke.
- **Final rep row**: Eren Y. — $117,115 · 22/84 · 0.79 · 32% [7] 15 (top border).

---

## Interactions & Behavior
The prototype is mostly static; implement these behaviors in the real app:
- **Rail buttons / nav-links**: route navigation; active state reflects current route. Tree groups expand/collapse (chevron rotates 90°, children show/hide). `+` add buttons appear on row hover (opacity transition).
- **Search**: `⌘K` opens/focuses; focus-within restyles the pill.
- **Timeframe toggle**: switch enables/disables the comparison window; the date range opens a date-range picker.
- **Filters / kebab / toggle** buttons on cards: open menus (see the separate Menu Sheet component for menu styling) and re-query the card's data.
- **Segmented toggles** (Platform value Revenue|Leads|W/L): swap the metric shown in the summary + bars.
- **Rep rows**: click chevron to expand/collapse the detail panel (only one open at a time in the mock; product can allow multiple).
- **Hover states**: all buttons/rows have a `--muted` hover; icon buttons also shift border to `--border-strong`. Transitions ~120–150ms ease on background/color/border.
- **Charts**: use a real charting lib (Recharts/visx/Chart.js/etc.); add tooltips on hover for bars, line points, and donut segments.

## Responsive Behavior
- `.rev-row` is `flex-wrap` so the 5-KPI grid drops below the revenue block when the canvas is narrow — **do not** use a rigid 2-column grid here (it collapses/clips the KPI cards).
- `.kpi-row`: at ≤1320px switch to `repeat(auto-fit, minmax(120px, 1fr))` so cards reflow instead of shrinking.
- `.grid-main`: single column at ≤1180px.
- Consider collapsing the 232px tree nav to an overlay on small screens and the 64px rail to a bottom bar on mobile (not in the mock — product decision).

## State Management
- **Navigation**: current route/active nav item; per-group expanded/collapsed booleans (persist to localStorage).
- **Report scope**: selected people (chips), timeframe range + compare-on boolean.
- **Card controls**: Platform-value metric (`revenue|leads|wl`), Referrers filter state, expanded rep id.
- **Data**: revenue summary, per-rep rows, referrer breakdown, donut distribution, platform monthly series, sales-dynamic weekly series. Each card fetches independently and shows loading/empty/error states (the mock has none — add skeletons matching card shapes).
- **Theme**: `data-theme="light|dark"` on `<html>`; the mock's bottom-right toggle should become the app's theme switch (persist to localStorage / follow system).

## Design Tokens

All colors are **oklch**. Light theme (dark values in parentheses where they differ):

**Neutrals / surfaces**
- `--background` `oklch(0.99 0.003 95)` (dark `0.12 0.005 95`)
- desk bg (body) `oklch(0.95 0.004 95)` (dark `0.09 0.004 95`)
- `--foreground` `oklch(0.18 0.005 95)` (dark `0.96 0.003 95`)
- `--card` `oklch(1 0 0)` (dark `0.16 0.005 95`)
- `--muted` `oklch(0.96 0.005 95)` (dark `0.20 0.006 95`)
- `--muted-foreground` `oklch(0.50 0.008 95)` (dark `0.62 0.008 95`)
- `--border` `oklch(0.92 0.005 95)` (dark `0.24 0.006 95`)
- `--border-strong` `oklch(0.86 0.006 95)` (dark `0.32 0.008 95`)
- `--input` `oklch(0.96 0.005 95)` (dark `0.20 0.006 95`)

**Accent (chartreuse)**
- `--primary` `oklch(0.74 0.17 118)` (dark `0.80 0.17 118`)
- `--primary-foreground` `oklch(0.14 0.005 95)`
- `--primary-soft` `oklch(0.94 0.08 118)` (dark `0.30 0.10 118`)
- `--ring` `oklch(0.74 0.17 118)` (dark `0.78 0.17 118`)

**Status**
- `--up` (positive/green) `oklch(0.58 0.15 150)`
- `--down` / `--destructive` (negative/red) `oklch(0.62 0.20 25)`

**Brand icon colors (referrers/platforms)**
- Dribbble pink `oklch(0.6 0.19 355)`, Instagram gradient `oklch(0.65 0.2 30) → oklch(0.55 0.22 350)`, Behance blue `oklch(0.5 0.16 265)`, Google green `oklch(0.55 0.18 145)`.
- Donut segments: red `oklch(0.62 0.20 25)`, purple `oklch(0.72 0.16 300)`, blue `oklch(0.60 0.14 250)`, green `oklch(0.55 0.16 145)`.
- Person avatars: Armin/orange `135deg oklch(0.7 0.16 40)→oklch(0.45 0.13 30)`, Eren/blue `oklch(0.68 0.15 250)→oklch(0.42 0.13 275)`, Mikasa/purple `oklch(0.6 0.17 300)→oklch(0.4 0.14 315)`, JR/indigo `oklch(0.72 0.16 250)→oklch(0.42 0.14 285)`.

**Radii**: `--radius-sm 6px`, `--radius 10px`, `--radius-lg 14px`, `--radius-xl 20px`; pills `999px`.

**Shadows**
- sm `0 1px 2px 0 oklch(0.18 0.005 95 / 0.04)`
- md `0 4px 12px -2px oklch(0.18 0.005 95 / 0.06), 0 1px 3px 0 oklch(0.18 0.005 95 / 0.04)`
- lg `0 12px 32px -8px oklch(0.18 0.005 95 / 0.10), 0 4px 8px -4px oklch(0.18 0.005 95 / 0.05)`
- xl `0 32px 64px -16px oklch(0.18 0.005 95 / 0.14), 0 12px 24px -8px oklch(0.18 0.005 95 / 0.06)`
- (dark theme uses pure-black-alpha equivalents — see the `[data-theme="dark"]` block in the HTML.)

**Typography**
- Sans: **Geist** (`400/500/600/700`) — `ui-sans-serif, system-ui, sans-serif` fallback.
- Mono: **Geist Mono** (`400/500/600`) — used for all numbers, %, KPIs, badges, kbd chips.
- Base 14px / line-height ~1.5. Scale used: 11–11.5px (labels/badges), 12–13.5px (body/rows), 15px (brand), 20px (KPI value), 30px (page title), 44px (revenue) — headings tighten letter-spacing (`-0.02em` to `-0.035em`).

**Spacing**: multiples of 2/4 (gaps 4/6/8/10/14/18/24; card pad 12–18px; canvas pad 22/24px).

## Assets
- **Fonts**: Geist + Geist Mono via Google Fonts (`https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&family=Geist+Mono:wght@400;500;600`). Self-host in production.
- **Icons**: all inline SVG in the Lucide/Feather visual style (24×24, `stroke-width` ~1.8–2, round caps/joins). Use **lucide-react** (or the codebase's icon set) — approximate mapping: compass, bar-chart, file-text, command, edit-3, help-circle, settings, star, clock, list, target, layout-dashboard, folder, plus, chevron-down/right/up, search, menu, sliders-horizontal, download, share/upload, trending-up (arrow-up-right), more-horizontal (kebab), filter, grip. Brand marks (Dribbble/Instagram/Behance/Google) are rendered as colored initial tiles in the mock — swap for real brand SVGs if licensing allows.
- **Charts**: no image assets — donut is a CSS `conic-gradient`, bars are divs, the line chart is hand-authored SVG. Reimplement with a charting library.
- No raster images or logos are required.

## Files
- `Dashboard.html` — the complete hi-fi design reference (self-contained: tokens, layout, all components, light/dark theming, responsive rules). Open it in a browser and use the bottom-right light/dark toggle to inspect both themes. All measurements above are taken from this file's CSS.
