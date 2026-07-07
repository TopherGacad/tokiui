# Project Scaffolding Prompt

> Paste this entire prompt into Claude Code (terminal) inside an empty directory to scaffold the full project foundation.

---

I want to build a production-grade React component library with Tailwind CSS, with my own identity and design language. Please scaffold the complete project foundation following the architecture below. Be thorough — I want a solid, clean, professional foundation I can build on for months.

## PROJECT OVERVIEW

A copy-paste React component library where users run a CLI to install components into their projects (a source-ownership model — the code lives directly in the user's repo). It includes a documentation website with a live theme playground where users can customize colors, radius, and fonts in real-time and share themes via URL.

## REPOSITORY STRUCTURE (MONOREPO)

Use pnpm workspaces + Turborepo. Final structure:

```
my-ui-lib/
├── packages/
│   ├── ui/                    # The component library (@my-ui-lib/ui)
│   │   ├── src/
│   │   │   ├── components/    # All React components
│   │   │   ├── hooks/         # Shared hooks (useMediaQuery, useTheme)
│   │   │   ├── lib/           # Utilities (cn, etc.)
│   │   │   ├── styles.css     # CSS variable theme tokens
│   │   │   └── index.ts       # Public exports
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── cli/                   # CLI tool (@my-ui-lib/cli)
│   │   ├── src/
│   │   │   ├── commands/      # init, add, theme commands
│   │   │   ├── utils/         # registry fetcher, config, transforms
│   │   │   ├── templates/     # tailwind.config, globals.css templates
│   │   │   └── index.ts       # CLI entry point
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── themes/                # Preset themes (@my-ui-lib/themes)
│   │   ├── src/
│   │   │   ├── default.ts
│   │   │   ├── rose.ts
│   │   │   ├── slate.ts
│   │   │   ├── neon.ts
│   │   │   ├── newspaper.ts
│   │   │   └── index.ts
│   │   └── package.json
│   │
│   └── registry/              # Component manifest for CLI
│       ├── index.json         # List of all components, deps, files
│       └── components/        # Per-component metadata JSON
│
├── apps/
│   └── docs/                  # Documentation website (Next.js)
│       ├── src/
│       │   ├── app/           # App Router
│       │   │   ├── layout.tsx
│       │   │   ├── page.tsx                    # Landing page
│       │   │   ├── globals.css
│       │   │   ├── docs/                       # Documentation pages
│       │   │   │   ├── layout.tsx
│       │   │   │   ├── installation/page.mdx
│       │   │   │   ├── theming/page.mdx
│       │   │   │   └── components/[name]/page.mdx
│       │   │   └── playground/                 # Live theme playground
│       │   │       └── page.tsx
│       │   ├── components/
│       │   │   ├── playground/                 # Theme editor UI
│       │   │   │   ├── theme-editor.tsx
│       │   │   │   ├── color-picker.tsx
│       │   │   │   ├── radius-slider.tsx
│       │   │   │   ├── font-picker.tsx
│       │   │   │   ├── preset-gallery.tsx
│       │   │   │   └── component-showcase.tsx
│       │   │   ├── docs/                       # Docs UI
│       │   │   │   ├── sidebar.tsx
│       │   │   │   ├── code-block.tsx
│       │   │   │   ├── component-preview.tsx
│       │   │   │   └── copy-button.tsx
│       │   │   └── site/                       # Site chrome
│       │   │       ├── header.tsx
│       │   │       ├── footer.tsx
│       │   │       └── theme-toggle.tsx
│       │   └── lib/
│       │       ├── theme/
│       │       │   ├── encode.ts               # theme → URL string
│       │       │   ├── decode.ts               # URL string → theme
│       │       │   ├── presets.ts
│       │       │   └── types.ts
│       │       └── utils.ts
│       ├── next.config.mjs    # Configured for static export
│       ├── tailwind.config.ts
│       └── package.json
│
├── examples/                  # Sample apps (placeholder folders for now)
│   └── nextjs-starter/
│
├── .github/
│   └── workflows/
│       ├── ci.yml             # Lint, typecheck, build on PRs
│       ├── release.yml        # Changesets publish to npm
│       └── deploy.yml         # SSH deploy to on-prem VPS
│
├── .changeset/                # Changesets config
│   └── config.json
│
├── package.json               # Root with workspace scripts
├── pnpm-workspace.yaml
├── turbo.json
├── tsconfig.base.json         # Shared TS config
├── .prettierrc
├── .gitignore
└── README.md
```

## TECH STACK (USE EXACTLY THESE)

**Component library:**
- React 18+
- TypeScript (strict mode)
- Tailwind CSS v4
- Radix UI Primitives (for accessible behavior)
- class-variance-authority (for variants)
- clsx + tailwind-merge (for class name handling)
- Framer Motion (for animations)

**CLI:**
- Commander (argument parsing)
- prompts (interactive questions)
- fs-extra (file ops)
- kleur (terminal colors)
- ora (spinners)
- execa (running shell commands)
- tsup (bundling)

**Docs site:**
- Next.js 15 (App Router) configured for static export (`output: 'export'`)
- Fumadocs or MDX with gray-matter
- Shiki (syntax highlighting)
- react-colorful (color picker)
- culori (color manipulation)
- nuqs (URL-synced state)

**Monorepo:**
- pnpm 9+ (workspaces)
- Turborepo
- Changesets (for versioning)

## ARCHITECTURE RULES

1. NO database, NO authentication, NO admin panel — components live in Git, themes live in URLs/localStorage
2. Static export for Next.js (no server needed for v1)
3. Hosting target: on-prem VPS with Caddy reverse proxy (NOT Vercel)
4. Docs site imports UI package locally via `workspace:*` — no publishing loop during dev
5. Component registry is a static JSON file the CLI fetches from GitHub raw URLs

## THEME SYSTEM

Use HSL CSS variables in `packages/ui/src/styles.css`:
- `--background`, `--foreground`
- `--primary`, `--primary-foreground`
- `--secondary`, `--secondary-foreground`
- `--muted`, `--muted-foreground`
- `--accent`, `--accent-foreground`
- `--destructive`, `--destructive-foreground`
- `--card`, `--card-foreground`
- `--popover`, `--popover-foreground`
- `--border`, `--input`, `--ring`
- `--radius`

Both light mode (`:root`) and dark mode (`.dark`) defined. Components reference these via Tailwind config that maps `bg-primary` → `hsl(var(--primary))` so alpha modifiers work (`bg-primary/50`).

Don't theme fonts/sizes/weights — let users use Tailwind defaults.

## INITIAL COMPONENTS TO BUILD

Build these 5 components fully (responsive, accessible, with cva variants):

1. **Button** — variants: default, destructive, outline, secondary, ghost, link. Sizes: sm, default, lg, icon. Use Radix Slot for asChild support.
2. **Card** — Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter
3. **Input** — text input with proper focus states
4. **Dialog** — using @radix-ui/react-dialog, full-screen on mobile, centered on desktop
5. **Badge** — variants: default, secondary, destructive, outline

Every component MUST be:
- Responsive (mobile-first, min 44×44px touch targets for interactive elements)
- Accessible (proper ARIA, keyboard nav via Radix primitives)
- Forward-ref capable
- TypeScript with proper prop types and VariantProps

## CLI BEHAVIOR

The CLI should support:
- `npx my-ui init` — sets up Tailwind config, globals.css, creates `src/components/ui/` and `src/lib/cn.ts` in the user's project
- `npx my-ui add <component>` — fetches component from GitHub (use placeholder URL for now), resolves dependencies recursively, installs npm deps, writes files
- `npx my-ui add` (no args) — interactive prompt to pick component
- `npx my-ui theme apply <encoded-string>` — decodes a theme URL string and writes CSS variables to globals.css

For the registry, use placeholder GitHub raw URLs like `https://raw.githubusercontent.com/USERNAME/my-ui-lib/main/packages/registry/components/{name}.json` with a TODO comment to replace USERNAME later.

## VERSIONING WITH CHANGESETS

Set up Changesets fully:

1. Initialize `.changeset/config.json` with:
   - `access: "public"`
   - `baseBranch: "main"`
   - `ignore: ["@my-ui-lib/docs"]` (the docs app isn't published)
2. Add `@changesets/cli` to root devDependencies
3. Add scripts to root package.json:
   - `"changeset": "changeset"`
   - `"version": "changeset version"`
   - `"release": "turbo build && changeset publish"`

Create the GitHub Action `.github/workflows/release.yml` that:
- Triggers on push to main
- Installs deps, builds packages
- Uses `changesets/action@v1` to either open a "Release" PR (when changesets are pending) or publish to npm (when the release PR is merged)
- Requires `NPM_TOKEN` secret

Add a CONTRIBUTING.md note explaining: "Run `pnpm changeset` after making any user-facing change. Don't manually bump versions."

## ON-PREM DEPLOYMENT

Create `.github/workflows/deploy.yml` that:
- Triggers on push to main
- Builds the docs site (`pnpm --filter @my-ui-lib/docs build`)
- SSHes to the server using `appleboy/ssh-action`
- Pulls the latest code, installs, rebuilds
- Requires secrets: `SERVER_HOST`, `SERVER_USER`, `SSH_PRIVATE_KEY`

Include a `deployment/Caddyfile.example` showing how to serve the static export with auto-HTTPS.

Include a `deployment/README.md` with step-by-step VPS setup instructions (Ubuntu, Caddy install, directory structure, GitHub Action secrets, SSL).

## RESPONSIVE & ACCESSIBILITY REQUIREMENTS

- Every interactive element: minimum 44×44px touch target
- Every component: tested mentally at 320px, 768px, 1024px, 1440px
- Dialogs: full width minus padding on mobile, max-w on desktop, `max-h-[90vh] overflow-y-auto`
- Use container queries (`@container`) where it makes sense for components used in varying widths
- All Radix primitives wired up correctly (focus management, escape to close, etc.)

## PLAYGROUND REQUIREMENTS

The playground page (`apps/docs/src/app/playground/page.tsx`) must:
- Render real components from `@my-ui-lib/ui` (not mocked previews)
- Have controls for every CSS variable (color pickers for HSL values, slider for radius)
- Sync state to URL via `nuqs` (themes are shareable)
- Save user's local themes to localStorage
- Include 5+ preset themes from `@my-ui-lib/themes`
- Be fully responsive — controls collapse to drawer/sheet on mobile
- Include a "Copy theme URL" button and a "Copy CSS variables" button

## CONFIG FILES TO INCLUDE

- `pnpm-workspace.yaml` with `packages/*` and `apps/*`
- `turbo.json` with build, dev, lint tasks; build outputs cached
- `tsconfig.base.json` with strict mode, modern target
- Per-package `tsconfig.json` extending the base
- `.prettierrc` with consistent formatting rules
- `.gitignore` covering `node_modules`, `.next`, `dist`, `.turbo`, `.env*`
- Root `package.json` with scripts: `dev`, `build`, `lint`, `changeset`, `version`, `release`, `clean`

## WHAT TO ACTUALLY DO

1. Create the entire folder structure above
2. Write every config file (package.json, tsconfig, turbo.json, etc.) with correct content
3. Build the 5 components fully — real working code, not stubs
4. Write the CLI with init and add commands working (using local file paths or placeholder URLs)
5. Build a minimal but real Next.js docs site with at least: landing page, installation page, button docs page, and a working playground page
6. Set up Changesets and both GitHub Actions workflows
7. Write a comprehensive root README.md explaining the project, dev commands, and architecture
8. Write a CONTRIBUTING.md explaining the changeset workflow

## OUTPUT EXPECTATIONS

- All files complete and runnable — `pnpm install && pnpm dev` should work after scaffolding
- TypeScript strict mode with no `any` types
- Components ready to demo on day one
- Comments explaining non-obvious architectural decisions
- A summary at the end listing: what was built, what's deferred, and the exact next steps to take

Please start by confirming you understand the architecture, then scaffold everything in order: configs first, then `packages/ui`, then `packages/cli`, then `apps/docs`, then GitHub Actions, then docs (README + CONTRIBUTING). Use clear progress markers between phases.

---

## How to Use This Prompt

**Where to paste it:** Use Claude Code (the terminal tool) in an empty directory you want to become your project. Claude will scaffold everything in place.

**Time estimate:** Expect Claude Code to spend 10-30 minutes generating files.

**After it finishes:** Run `pnpm install` first, then `pnpm dev` to see the docs site running. If anything fails, paste the error back and Claude will fix it.

**Things to customize before pasting:**
- Replace `my-ui-lib` with your actual project name throughout
- Replace `@my-ui-lib/ui` etc. with your actual npm scope (e.g., `@yourname/ui`)
- If you have a domain for the docs site, mention it where Caddy is configured

**What to do next (after the scaffold exists):**
1. Initialize git, push to a new GitHub repo
2. Add `NPM_TOKEN`, `SERVER_HOST`, `SERVER_USER`, `SSH_PRIVATE_KEY` to GitHub Secrets
3. Run `pnpm changeset` to create your first release entry
4. Start adding more components and presets
