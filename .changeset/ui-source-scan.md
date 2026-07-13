---
"@tokiui/ui": patch
---

Fix components imported from `@tokiui/ui` (the Sidebar and everything the blocks compose) rendering unstyled in consumer apps. `@tokiui/ui/styles.css` now includes `@source "../dist"`, so Tailwind v4 scans the compiled components and generates the utility classes they use. Previously a consumer's Tailwind only scanned its own source files, so classes used *inside* imported components — e.g. the Sidebar's `border-r` and `w-[var(--sidebar-width)]` — were never generated, leaving the sidebar with no panel, border, or widths.
