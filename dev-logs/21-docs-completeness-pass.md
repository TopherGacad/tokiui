# 21 — Documentation completeness pass

Audited the docs against a mature component-library baseline — *can a user set up and use tokiui from the docs alone, with their questions answered?* — and closed the gaps. Three tiers.

## Accuracy fixes (docs were wrong)

- **`tokiui.json` manual schema** (installation) — showed `utilsDir` / `globalsCss`; the real config is `componentsDir` / `libDir` / `libAlias` / `style`. Following the old JSON left `add` resolving imports to `@/undefined`.
- **Tailwind v3 callout** — claimed the CLI would "warn and exit"; it warns and continues. Reworded.
- **globals.css behavior** — said init "prepends" imports; on a fresh create-next-app it *replaces* the starter theme and writes a `.bak`. Documented the real behavior (and why: the starter theme otherwise overrides tokiui's tokens — the "white cards on dark OS" symptom).

## Documented features that existed but weren't in the docs

- **Blocks + ready-route** — `add sidebar-shell` installs a folder and auto-creates `app/dashboard/page.tsx`. New "Blocks" section in installation.
- **Preset themes** — named the five (`default`, `rose`, `slate`, `neon`, `newspaper`) and showed applying one via CSS-variable override.
- **Playground workflow** — documented "Copy CSS variables" → paste into globals.css.
- **Form component** — added `docs/components/form` (page + demo + nav); previously only shown inline on input/select/textarea.
- **Chart API** — added props tables for AreaChart / BarChart / DonutChart / RadialChart / Sparkline (the page had none).
- **Table** — gave the flagship "Data table" example copyable code (it was the only code-less Showcase on the site).

## New guide pages (Getting Started)

Introduction, CLI reference, Configuration (`tokiui.json`), Troubleshooting/FAQ. Added a `/docs` → `/docs/introduction` redirect. Nav order: Introduction → Installation → CLI → Configuration → Theming → Troubleshooting.

## Code bugs found while auditing

- **Fixed:** the playground's "Copy CSS variables" emitted a `.dark { }` block, but tokiui's dark selector is `[data-theme="dark"]` — pasted dark overrides never applied. Corrected the emitted selector.
- **Deferred (needs a CLI release):** `tokiui theme apply` expects a flat token map, but the playground encodes nested `{ light, dark }`, so the round-trip would write `--light: [object Object]`. Left undocumented until fixed.

## Not touched here

Homepage marketing bugs (a fabricated changelog with a non-existent "orbit" preset + a `tailwind.config.ts` claim, the dead "Full changelog" link, the inert ⌘K button) are already corrected on the landing-overhaul branch (PR #13), which rewrites that section, adds a real `/changelog`, and ships the command palette — so they weren't double-patched on main.

Verified: `turbo build --filter=@tokiui/docs` compiles and exports all 53 pages, including the 6 new/changed routes. No package source changed, so no changeset.
