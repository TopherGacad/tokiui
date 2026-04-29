# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Status

The repository currently contains only `project-scaffold-prompt.md`. To bootstrap the full project, paste that file's contents into Claude Code from within this directory. After scaffolding, run `pnpm install && pnpm dev` to verify everything works.

## What This Project Is

**tokiui** is a production-grade, copy-paste React component library (shadcn/ui model). Users run a CLI to install individual components directly into their own projects — they own the files. The repo also ships a documentation website with a live theme playground where themes are encoded in URL parameters and shareable.

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

- **No database, no auth, no server** — components live in Git; themes live in URL params and localStorage. The docs site is a pure static export served by Caddy on a VPS, not Vercel.
- **Docs imports UI locally** — `"@tokiui/ui": "workspace:*"` so changes to the component library are reflected in the docs instantly without publishing.
- **Registry is static JSON** — the CLI fetches component metadata from GitHub raw URLs (`packages/registry/components/{name}.json`). The `USERNAME` placeholder in registry URLs must be replaced with the real GitHub username after initial push.
- **Changesets drives all versioning** — never manually bump `version` fields in package.json. Run `pnpm changeset` after every user-facing change and commit the generated changeset file. CI handles publishing when the Release PR is merged.
- **`@tokiui/docs` is excluded from npm publishing** — `ignore: ["@tokiui/docs"]` in `.changeset/config.json`.

## Theme System

CSS variables in `packages/ui/src/styles.css` under `:root` (light) and `.dark`. All variables are HSL channel values (no `hsl()` wrapper) so Tailwind alpha modifiers work: `bg-primary/50` → `hsl(var(--primary) / 0.5)`.

Key tokens: `--background`, `--foreground`, `--primary`, `--primary-foreground`, `--secondary`, `--secondary-foreground`, `--muted`, `--muted-foreground`, `--accent`, `--accent-foreground`, `--destructive`, `--destructive-foreground`, `--card`, `--card-foreground`, `--popover`, `--popover-foreground`, `--border`, `--input`, `--ring`, `--radius`.

Do not theme fonts, sizes, or weights — users use Tailwind defaults for those.

## Server / Client boundary

`@tokiui/ui` has two entry points:
- `@tokiui/ui` — server-safe (pure components, no hooks). Import components like `Button`, `Card`, etc. here.
- `@tokiui/ui/client` — client-only (`'use client'`). Import `useTheme` and `useMediaQuery` here.

This split is required for Next.js App Router. Merging hooks back into the main bundle will break the docs build with a "needs `useEffect` in a Client Component" error.

## Component Conventions

Every component in `packages/ui/src/components/` must:
- Use `class-variance-authority` for variants; export `VariantProps` alongside the component
- Accept `className` and merge via `cn()` (the `clsx` + `tailwind-merge` helper in `packages/ui/src/lib/`)
- Be `forwardRef`-capable
- Use Radix UI primitives for any behavior requiring accessibility (focus traps, keyboard nav, ARIA)
- Have a minimum 44×44px touch target for interactive elements

## Playground

`apps/docs/src/app/playground/page.tsx` renders real `@tokiui/ui` components (not mocks) with live CSS-variable overrides. Theme state is URL-synced via `nuqs` and also persisted to localStorage. The "Copy theme URL" button encodes the current theme into a URL parameter using `apps/docs/src/lib/theme/encode.ts`.

## Deployment

GitHub Actions workflows:
- **ci.yml** — lint, typecheck, build on every PR
- **release.yml** — Changesets action on push to `main`; opens a Release PR when changesets are pending, publishes to npm when the Release PR is merged (requires `NPM_TOKEN` secret)
- **deploy.yml** — SSH deploy to VPS on push to `main` (requires `SERVER_HOST`, `SERVER_USER`, `SSH_PRIVATE_KEY` secrets)

See `deployment/README.md` for VPS setup and `deployment/Caddyfile.example` for the reverse-proxy config.

---

## Development Roadmap

Work through phases in order. Each phase has a clear entry condition, deliverables, and a verification gate before moving on. Never start the next phase until the gate passes.

---

### Phase 0 — Bootstrap (Prerequisite for Everything)

**Entry condition:** This directory contains only `project-scaffold-prompt.md` and `CLAUDE.md`.

**Steps:**
1. Paste `project-scaffold-prompt.md` into Claude Code in this directory. Let it finish completely before touching anything.
2. Replace every occurrence of `my-ui-lib` / `@my-ui-lib` with `tokiui` / `@tokiui` across all generated files.
3. Run `pnpm install` from the repo root.
4. Run `pnpm dev` — the docs site should open at `localhost:3000` (or configured port).

**Gate:** `pnpm install && pnpm build` exits 0 with no type errors. `pnpm dev` starts without crashing.

**Then — set up Git and GitHub:**
```bash
git init
git add .
git commit -m "chore: initial scaffold"
# Create a new empty repo on GitHub, then:
git remote add origin https://github.com/<USERNAME>/tokiui.git
git branch -M main
git push -u origin main
```

After pushing, replace the `USERNAME` placeholder in all `packages/registry/` JSON files with your real GitHub username.

---

### Phase 1 — Monorepo Health Check

**Goal:** Confirm the build pipeline is wired correctly before writing any feature code.

**Checklist:**
- `turbo.json` — `build` depends on `^build` (deps build first), `dev` has no cache, `lint` is standalone
- `tsconfig.base.json` — `strict: true`, `moduleResolution: bundler`, `target: ES2022`
- Each package's `tsconfig.json` extends `../../tsconfig.base.json`
- `pnpm --filter @tokiui/ui build` produces output in `packages/ui/dist/`
- `pnpm --filter @tokiui/docs build` produces output in `apps/docs/out/` (static export)
- `pnpm lint` passes clean

**Gate:** All three packages build independently; Turborepo cache hits on a second `pnpm build` run (confirms pipeline is correct).

---

### Phase 2 — Component Library (`packages/ui`)

**Goal:** Deliver all 5 initial components, fully working with the theme system.

**Order within this phase:**

1. **Theme foundation first** — verify `packages/ui/src/styles.css` CSS variables render correctly in the docs site before touching any component. Confirm both `:root` and `.dark` apply. Confirm `bg-primary/50` alpha modifier works.

2. **Button** — implement first because it touches every cva pattern (variants, sizes, `asChild` via Radix Slot). If Button is clean, the other components follow the same structure.

3. **Badge** — simplest, no interactivity. Good for verifying the variant/export pattern is consistent.

4. **Card** — compound component pattern (Card + CardHeader + CardTitle etc.). Validate that named sub-exports work correctly from `packages/ui/src/index.ts`.

5. **Input** — single component, but verify focus ring uses `--ring` token and disabled state is visually correct.

6. **Dialog** — most complex. Radix Dialog needs `DialogPortal`, `DialogOverlay`, `DialogContent`, `DialogTitle`, `DialogDescription`. Verify: focus trap, Escape to close, mobile full-screen vs desktop centered, `max-h-[90vh] overflow-y-auto`.

**Per-component checklist:**
- `forwardRef` wrapping
- `VariantProps` exported alongside the component
- `cn()` used for `className` merging
- Interactive elements ≥ 44×44px
- No `any` types

**Gate:** `pnpm --filter @tokiui/ui build` exits 0 with no TS errors. All 5 components render in the docs site playground with live theme variable overrides.

---

### Phase 3 — Preset Themes (`packages/themes`)

**Goal:** 5 preset themes defined as TS objects, consumable by the docs playground.

Themes: `default`, `rose`, `slate`, `neon`, `newspaper`. Each exports an object matching the CSS variable token shape from Phase 2.

**Gate:** Importing `@tokiui/themes` in the docs app and applying a preset visually changes the component palette in the playground.

---

### Phase 4 — Component Registry (`packages/registry`)

**Goal:** Static JSON files the CLI will fetch. No build step — these are plain `.json` files committed to Git.

**Structure for each component:**
```json
{
  "name": "button",
  "files": ["components/button.tsx"],
  "dependencies": ["@radix-ui/react-slot", "class-variance-authority"],
  "devDependencies": [],
  "registryDependencies": []
}
```

`packages/registry/index.json` lists all available components.

**Gate:** Every component built in Phase 2 has a corresponding registry JSON. All `dependencies` fields match what the component actually imports.

---

### Phase 5 — CLI (`packages/cli`)

Build commands in this order — each depends on the previous being stable:

**5a. `init` command**
- Detects project type (Next.js, Vite, etc.)
- Writes Tailwind config entries for CSS variable tokens
- Creates `src/components/ui/` and `src/lib/cn.ts`
- Interactive prompts if config already exists

**5b. `add <component>` command**
- Fetches registry JSON from GitHub raw URL
- Resolves `registryDependencies` recursively (e.g., Dialog depends on overlay utility)
- Installs npm `dependencies` with the user's package manager (auto-detected via lockfile)
- Writes component files to `src/components/ui/`
- Handles conflict: prompt before overwriting existing files

**5c. `add` (interactive)**
- Fetches `packages/registry/index.json`
- Renders a multi-select prompt via `prompts`
- Calls the same install logic as `add <component>`

**5d. `theme apply <encoded-string>`**
- Decodes the URL-encoded theme string
- Patches CSS variable values in the user's `globals.css`

**Testing the CLI:** Create a temp Next.js app outside this repo, run `node packages/cli/dist/index.js init` inside it, then `node packages/cli/dist/index.js add button`. Verify the file is written and the component renders.

**Gate:** `init` + `add button` work end-to-end in a fresh external project with no manual steps.

---

### Phase 6 — Docs Site (`apps/docs`)

Build pages in dependency order:

**6a. Site chrome** (header, footer, theme toggle) — shared by all pages.

**6b. Landing page** — hero, feature cards, "Copy install command" snippet, link to playground.

**6c. Installation page** (`docs/installation/page.mdx`) — covers `npx @tokiui/cli init` and `add`. Code blocks use Shiki for syntax highlighting.

**6d. Theming page** (`docs/theming/page.mdx`) — explains CSS variable system, how to override tokens, dark mode.

**6e. Component pages** — one MDX page per component at `docs/components/[name]/page.mdx`. Each page includes: live preview (renders the real component), code snippet, prop table, variants showcase.

**6f. Playground** (`app/playground/page.tsx`) — built last because it depends on all themes and components being stable.
- Controls for every CSS variable (color pickers via `react-colorful`, HSL conversion via `culori`, radius slider, font family select)
- URL state sync via `nuqs`
- localStorage persistence
- Mobile: controls collapse into a drawer
- "Copy theme URL" and "Copy CSS variables" buttons
- Preset gallery from `@tokiui/themes`

**Gate:** `pnpm --filter @tokiui/docs build` produces a valid static export in `apps/docs/out/`. Serve locally with `npx serve apps/docs/out` and verify all pages load, playground controls update component styles in real time, and a shared theme URL restores state on reload.

---

### Phase 7 — CI/CD Wiring

**7a. ci.yml** — runs on every PR. Steps: `pnpm install` → `pnpm lint` → `pnpm build`. Must pass before merging.

**7b. release.yml** — runs on push to `main`. Uses `changesets/action@v1`. Requires `NPM_TOKEN` secret in GitHub repo settings.

**7c. deploy.yml** — runs on push to `main` after `release.yml`. Builds docs, SSH's to VPS, pulls and rebuilds. Requires `SERVER_HOST`, `SERVER_USER`, `SSH_PRIVATE_KEY` secrets.

**Gate:** Open a test PR that changes a component. CI runs and all checks pass. Merge it; the deploy workflow triggers and the VPS reflects the update.

---

### Phase 8 — First Release

1. `pnpm changeset` — select `@tokiui/ui`, `@tokiui/cli`, `@tokiui/themes` as `minor` (first real release)
2. Commit the generated changeset file
3. Push to `main` — Changesets action opens a "Release" PR automatically
4. Review and merge the Release PR — Changesets action publishes all three packages to npm
5. Verify on npmjs.com that `@tokiui/ui@0.1.0`, `@tokiui/cli@0.1.0`, `@tokiui/themes@0.1.0` are live
6. Test the published CLI in a fresh directory: `npx @tokiui/cli@latest init`

---

### GitHub Versioning Readiness

**Not ready yet.** Three blockers:

| Blocker | What's needed |
|---|---|
| No git repo | `git init` + initial commit |
| Scaffold not run | `package.json` files, `.changeset/config.json`, and workflow files don't exist yet |
| No GitHub remote | Can't add secrets without a repo |

**Once Phase 0 is complete**, versioning is ready to activate with three steps:
1. Push to GitHub (Phase 0 covers this)
2. Add `NPM_TOKEN` secret to the GitHub repo (`Settings → Secrets → Actions`)
3. Run `pnpm changeset` for any user-facing change — the rest is automated

The scaffold already generates `.changeset/config.json` and `release.yml`, so there's nothing to write manually.
