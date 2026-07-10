# tokiui — Project Overview

## What It Is

tokiui is a production-grade React component library built for internal company use. It follows the **copy-paste model** where users install individual component source files directly into their own projects via a CLI. Components are also available as a published npm package for projects that prefer a dependency-based approach.

The library ships with a documentation website, a live theme playground, a CLI tool, and a preset theme collection.

## Why We Built It

Our company builds web applications using **Next.js and React.js on the frontend** with **Laravel as the API backend**. We previously relied on third-party component libraries but decided to build our own standard library to:

- Enforce a consistent design system across all company projects
- Use a more modern color system (OKLCH instead of HSL)
- Own the component code and design decisions
- Ship a theme playground with URL-shareable themes

## Repository

**GitHub:** https://github.com/TopherGacad/tokiui

## Monorepo Structure

```
tokiui/
├── packages/
│   ├── ui/         @tokiui/ui       — React components (published to npm)
│   ├── cli/        @tokiui/cli      — npx CLI tool (published to npm)
│   ├── themes/     @tokiui/themes   — Preset themes (published to npm)
│   └── registry/   (no package)    — Static JSON fetched by CLI
├── apps/
│   └── docs/       @tokiui/docs     — Next.js documentation site (not published)
├── dev-logs/                        — This directory: development reference logs
├── .changeset/                      — Changesets version management
└── .github/workflows/               — CI/CD automation
```

## Tech Stack

### Component Library (`packages/ui`)

| Technology | Version | Purpose |
|---|---|---|
| React | 18.3.1 | UI component framework |
| TypeScript | 5.5.4 | Type safety, strict mode |
| Tailwind CSS | v4.0.0 | Utility-first styling |
| Radix UI (react-dialog) | ^1.1.1 | Accessible Dialog primitive |
| Radix UI (react-slot) | ^1.1.0 | `asChild` prop for Button |
| class-variance-authority | ^0.7.0 | Component variant management |
| clsx | ^2.1.1 | Conditional class composition |
| tailwind-merge | ^2.5.2 | Merge Tailwind classes without conflicts |
| Framer Motion | ^11.3.0 | Animation library (available for component use) |
| tsup | ^8.2.4 | Bundler for the package |

### CLI (`packages/cli`)

| Technology | Version | Purpose |
|---|---|---|
| Commander | ^12.1.0 | CLI framework |
| prompts | ^2.4.2 | Interactive terminal prompts |
| fs-extra | ^11.2.0 | Enhanced file system operations |
| kleur | ^4.1.5 | Terminal color output |
| ora | ^8.0.1 | Terminal spinners |
| execa | ^9.3.0 | Run child processes |
| tsup | ^8.2.4 | Bundler |

### Themes (`packages/themes`)

| Technology | Version | Purpose |
|---|---|---|
| TypeScript | 5.5.4 | Type-safe theme objects |
| tsup | ^8.2.4 | Bundler |

### Docs Site (`apps/docs`)

| Technology | Version | Purpose |
|---|---|---|
| Next.js | ^15.0.0 (15.5.15) | React framework, static export |
| React | 18.3.1 | UI framework |
| TypeScript | 5.5.4 | Type safety |
| Tailwind CSS | v4.0.0 | Styling |
| @next/mdx | ^15.0.0 | MDX support in Next.js |
| @mdx-js/loader | ^3.0.1 | MDX webpack loader |
| rehype-pretty-code | ^0.14.0 | Syntax highlighting in MDX |
| Shiki | ^1.10.3 | Syntax highlighter engine |
| remark-gfm | ^4.0.0 | GitHub Flavored Markdown |
| nuqs | ^2.1.1 | URL state synchronization |
| react-colorful | ^5.6.1 | Color picker component |
| culori | ^3.3.0 | Color conversion utilities |
| Geist / Geist Mono | (via next/font) | Typography |

### Monorepo Tooling

| Technology | Version | Purpose |
|---|---|---|
| pnpm | 9.1.0 | Package manager with workspace support |
| Turborepo | ^2.1.3 | Monorepo build system with caching |
| Changesets | ^2.27.1 | Versioning and changelog automation |
| Prettier | ^3.3.3 | Code formatting |
| Node.js | >=18 | Runtime requirement |

### CI/CD

| Technology | Purpose |
|---|---|
| GitHub Actions | Automation platform |
| changesets/action@v1 | Release PR automation |
| appleboy/ssh-action | SSH into deployment server |
| appleboy/scp-action | Copy static files to server |

## How Users Install Components

**As a published package:**
```bash
pnpm add @tokiui/ui
import { Button } from '@tokiui/ui'
```

**Via CLI (copy-paste model):**
```bash
npx @tokiui/cli@latest init
npx @tokiui/cli@latest add button
# Copies button.tsx into src/components/ui/button.tsx
```

## Published Packages

All three packages were first released at `v0.1.0` on 2026-04-30:

- https://www.npmjs.com/package/@tokiui/ui
- https://www.npmjs.com/package/@tokiui/cli
- https://www.npmjs.com/package/@tokiui/themes
