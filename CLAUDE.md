# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Project Is

**tokiui** is a production-grade, copy-paste React component library (shadcn/ui model). Users run a CLI to install individual components directly into their own projects — they own the files. The repo also ships a documentation website with a live theme playground where themes are encoded in URL parameters and shareable.

GitHub: https://github.com/TopherGacad/tokiui

## Monorepo Structure

pnpm workspaces + Turborepo. Root scripts drive everything; per-package scripts are invoked via `--filter`.

```
packages/
  ui/        @tokiui/ui       — React components (source of truth)
  cli/       @tokiui/cli      — npx CLI: init, add, theme apply
  themes/    @tokiui/themes   — 5 preset themes as TS objects
  registry/  (no package)     — Static JSON fetched by CLI from GitHub raw URLs
apps/
  docs/      @tokiui/docs     — Next.js 15 static export (NOT published to npm)
```

## Commands

```bash
pnpm install          # install all workspace dependencies
pnpm dev              # run all packages in watch/dev mode (Turborepo parallel)
pnpm build            # build all packages (Turborepo cached)
pnpm lint             # lint everything
pnpm clean            # wipe dist/, .next/, .turbo/

# Target a single package
pnpm --filter @tokiui/ui dev
pnpm --filter @tokiui/docs dev
pnpm --filter @tokiui/cli build

# Versioning (Changesets)
pnpm changeset        # create a changeset after any user-facing change
pnpm version          # consume pending changesets, bump package.json versions
pnpm release          # turbo build + changeset publish (CI does this)
```

## Tech Stack

| Layer | Choices |
|---|---|
| Components | React 18, TypeScript strict, Tailwind CSS v4, Radix UI primitives, class-variance-authority, clsx + tailwind-merge, Framer Motion |
| CLI | Commander, prompts, fs-extra, kleur, ora, execa, tsup |
| Docs site | Next.js 15 App Router (`output: 'export'`), MDX + Shiki, react-colorful, culori, nuqs |
| Monorepo | pnpm 9+, Turborepo, Changesets |

## Architecture Decisions

- **No database, no auth, no server** — components live in Git; themes live in URL params and localStorage.
- **Docs imports UI locally** — `"@tokiui/ui": "workspace:*"` so changes to the component library are reflected in the docs instantly without publishing.
- **Registry is static JSON** — the CLI fetches component metadata from GitHub raw URLs (`packages/registry/components/{name}.json`). Registry files already have the correct username (`TopherGacad`).
- **Changesets drives all versioning** — never manually bump `version` fields in package.json. Run `pnpm changeset` after every user-facing change and commit the generated changeset file.
- **`@tokiui/docs` is excluded from npm publishing** — `ignore: ["@tokiui/docs"]` in `.changeset/config.json`.

## Theme System

CSS variables in `packages/ui/src/styles.css`. All tokens use **OKLCH** full color values (e.g. `oklch(0.74 0.17 118)`) — not HSL channel values.

Dark mode uses `[data-theme="dark"]` attribute on `<html>` — not a `.dark` class.

The `@theme` block maps Tailwind utility classes to CSS vars using `var()` directly (not `hsl(var())`):
```css
@theme {
  --color-primary: var(--primary);  /* NOT hsl(var(--primary)) */
}
```

Key tokens: `--background`, `--foreground`, `--primary`, `--primary-foreground`, `--secondary`, `--secondary-foreground`, `--muted`, `--muted-foreground`, `--accent`, `--accent-foreground`, `--destructive`, `--destructive-foreground`, `--card`, `--card-foreground`, `--popover`, `--popover-foreground`, `--border`, `--input`, `--ring`, `--radius`.

Default primary color is chartreuse: `oklch(0.74 0.17 118)` (light) / `oklch(0.78 0.17 118)` (dark).

## Server / Client Boundary

`@tokiui/ui` has two entry points:
- `@tokiui/ui` — server-safe (pure components, no hooks)
- `@tokiui/ui/client` — client-only (`'use client'`); exports `useTheme`, `useMediaQuery`

Site-level hooks live separately in `apps/docs/src/components/site/`:
- `use-copy.ts` — clipboard copy with timed feedback
- `use-theme.ts` — localStorage-persisted theme toggle, sets `document.documentElement.dataset.theme`

## Docs Site Architecture

The docs site uses **custom CSS classes only** — no Tailwind prose utilities. All styles are in `apps/docs/src/app/globals.css`.

```
apps/docs/src/
  app/
    page.tsx                     — Landing page (RSC)
    layout.tsx                   — Root layout; loads Geist + Geist_Mono via next/font/google
    globals.css                  — All site + docs CSS (landing, docs layout, prose, components)
    docs/
      layout.tsx                 — Docs shell: Header + Sidebar + content area
      installation/page.mdx
      theming/page.mdx
      components/button/page.mdx
    playground/
      page.tsx                   — Suspense wrapper for nuqs
      playground-content.tsx     — Full playground with color pickers, radius slider, presets
  components/
    site/                        — Shared site chrome (server + client)
      header.tsx, footer.tsx, hero.tsx
      component-preview.tsx, theme-teaser.tsx, theme-toggle.tsx
      icons.tsx                  — All SVG icons as React components
      use-copy.ts, use-theme.ts  — Client hooks
    docs/                        — Docs-only components
      sidebar.tsx (RSC), sidebar-link.tsx ('use client', usePathname for active state)
      copy-button.tsx, code-block.tsx, component-preview.tsx
    playground/                  — Playground control components
      color-picker.tsx, radius-slider.tsx, font-picker.tsx
      preset-gallery.tsx, theme-editor.tsx, component-showcase.tsx
```

Active sidebar link detection: `SidebarLink` is a `'use client'` component that uses `usePathname()` to apply `.docs-sidebar__link--active`.

## Component Conventions

Every component in `packages/ui/src/components/` must:
- Use `class-variance-authority` for variants; export `VariantProps` alongside the component
- Accept `className` and merge via `cn()` (the `clsx` + `tailwind-merge` helper in `packages/ui/src/lib/`)
- Be `forwardRef`-capable
- Use Radix UI primitives for any behavior requiring accessibility (focus traps, keyboard nav, ARIA)
- Have a minimum 44×44px touch target for interactive elements

## Windows Build Quirk

`apps/docs/next.config.mjs` includes `outputFileTracingExcludes: { '*': ['**/*'] }` to prevent an NTFS race condition during Turborepo's "Collecting build traces" step. Do not remove this.

## Deployment

All three workflows are `workflow_dispatch` (manual trigger only) — not automatic on push:
- **ci.yml** — lint, typecheck, build
- **release.yml** — Changesets action; requires `NPM_TOKEN` secret (not yet configured)
- **deploy.yml** — SSH deploy to server; requires `SERVER_HOST`, `SERVER_USER`, `SSH_PRIVATE_KEY` secrets

Deployment target is on-prem (not Vercel or a cloud VPS).

---

## Development Roadmap

Work through phases in order. Each phase has a clear entry condition, deliverables, and a verification gate before moving on.

| Phase | Status | Description |
|---|---|---|
| 0 | ✅ Done | Bootstrap — scaffold, pnpm install, git init, push to GitHub |
| 1 | ✅ Done | Monorepo health check — Turborepo pipeline, tsconfig, build verification |
| 2 | ✅ Done | Component library — Button, Badge, Card, Input, Dialog production-ready |
| 3 | ✅ Done | Preset themes — 5 themes in `packages/themes/src/` |
| 4 | ✅ Done | Component registry — JSON files in `packages/registry/components/` |
| 5 | ✅ Done | CLI — `init`, `add`, `theme apply` commands |
| 6 | ✅ Done | Docs site — all pages live: landing, installation, theming, button, badge, card, input, dialog, playground |
| 7 | ✅ Done | CI/CD wiring — workflows auto-trigger via workflow_run after CI passes |
| 8 | 🔲 Pending | First npm release — `pnpm changeset` → Release PR → publish |

---

### Phase 2 — Component Library (`packages/ui`)

**Status: Scaffold only — components exist as boilerplate, not real designed implementations.**

The user will design components (likely via Claude Design or a design reference). Do not start implementing until a design spec (`_design-spec/`) is provided.

**Components to build:** Button, Badge, Card, Input, Dialog

**Per-component checklist:**
- `forwardRef` wrapping
- `VariantProps` exported alongside the component
- `cn()` used for `className` merging
- Interactive elements ≥ 44×44px
- No `any` types
- Radix UI primitive for anything needing a11y (Dialog → `@radix-ui/react-dialog`, Switch → `@radix-ui/react-switch`)

**Gate:** `pnpm --filter @tokiui/ui build` exits 0. All 5 components render in the playground with live theme variable overrides.

---

### Phase 6 — Docs Site (In Progress)

**Done:** site chrome, landing page, installation page, theming page, button component page, playground.

**Remaining:** component pages for Badge, Card, Input, Dialog — each at `apps/docs/src/app/docs/components/{name}/page.mdx`. Each page needs: live preview (renders real `@tokiui/ui` component), code snippet, prop table, variants showcase.

**Gate:** `pnpm --filter @tokiui/docs build` produces a valid static export in `apps/docs/out/`.

---

### Phase 7 — CI/CD Wiring

1. Add `NPM_TOKEN` secret to GitHub repo (`Settings → Secrets → Actions`)
2. Add `SERVER_HOST`, `SERVER_USER`, `SSH_PRIVATE_KEY` secrets for deploy
3. Update workflow triggers from `workflow_dispatch` to `push: branches: [main]` as appropriate

---

### Phase 8 — First Release

1. `pnpm changeset` — select `@tokiui/ui`, `@tokiui/cli`, `@tokiui/themes` as `minor`
2. Commit the changeset file
3. Push to `main` — Changesets action opens a Release PR
4. Merge Release PR — publishes `@tokiui/ui@0.1.0`, `@tokiui/cli@0.1.0`, `@tokiui/themes@0.1.0` to npm
5. Test: `npx @tokiui/cli@latest init` in a fresh directory
