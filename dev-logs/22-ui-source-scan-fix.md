# 22 — Fix: library components render unstyled in consumer apps

## Symptom

A fresh install of the `sidebar-shell` block rendered the sidebar's *structure* (nav, groups, footer) but with no panel — no background, border, widths, or spacing. The block's own stat cards were styled fine.

## Root cause

The block is library-backed: it imports `Sidebar`, `SidebarProvider`, etc. from `@tokiui/ui` (in `node_modules`). Those components' utility classes live in the compiled package, and **Tailwind v4 doesn't scan `node_modules` by default** — so the classes used *inside* the components (`border-r`, `w-[var(--sidebar-width)]`, group/hover styles…) were never generated. The block's own `page.tsx` markup *was* scanned (it's in the user's project), which is why the cards looked right.

The docs site never hit this because its `globals.css` has `@source "../../../../packages/ui/src"`. The published `@tokiui/ui/styles.css` had no equivalent, and `init` writes a plain two-`@import` globals — so consumer builds skipped the component classes entirely.

Measured on a fresh create-next-app + `add sidebar-shell`: **0** `border-right` rules and 49 KB of CSS without a source directive; **2** rules and 88 KB with one.

## Fix

Added `@source "../dist";` to `packages/ui/src/styles.css` (path relative to the shipped `src/styles.css` → the shipped `dist/`). Any app that imports `@tokiui/ui/styles.css` now has Tailwind scan the compiled components automatically — no per-app config, works for both new installs and existing ones on upgrade. Verified: with the self-`@source` and a plain app `globals.css`, the sidebar classes generate (border-right present, CSS back to 88 KB).

Ships as `@tokiui/ui` patch. Troubleshooting page documents the upgrade / manual `@source` path for anyone on an older version.
