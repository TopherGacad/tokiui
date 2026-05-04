# Monorepo Setup

## Package Manager: pnpm Workspaces

We use **pnpm 9.1.0** as the package manager. pnpm's workspace feature allows multiple packages to share `node_modules` from the root while maintaining isolated dependency trees per package.

### `pnpm-workspace.yaml`

```yaml
packages:
  - 'packages/*'
  - 'apps/*'
```

This tells pnpm that any directory under `packages/` or `apps/` is a workspace package. When one package depends on another (e.g., `apps/docs` depends on `packages/ui`), pnpm creates a symlink instead of downloading from npm.

### Workspace Dependencies

Internal packages reference each other using the `workspace:*` protocol:

```json
// apps/docs/package.json
{
  "dependencies": {
    "@tokiui/ui": "workspace:*",
    "@tokiui/themes": "workspace:*"
  }
}
```

`workspace:*` means "use whatever version is in the local workspace" — changes to `packages/ui` are immediately reflected in `apps/docs` without publishing.

---

## Build Orchestration: Turborepo

**Turborepo v2.1.3** orchestrates builds across all packages, ensuring correct build order and caching results.

### `turbo.json`

```json
{
  "$schema": "https://turbo.build/schema.json",
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**", ".next/**", "out/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "lint": {
      "outputs": []
    },
    "clean": {
      "cache": false
    }
  }
}
```

**Key configuration:**

- `"dependsOn": ["^build"]` — the `^` prefix means "build my dependencies first". So when building `@tokiui/docs`, Turborepo automatically builds `@tokiui/ui` and `@tokiui/themes` first.
- `"outputs"` — tells Turborepo what to cache. On a second run with no changes, cached outputs are restored instantly (FULL TURBO).
- `"cache": false` on `dev` — development servers shouldn't be cached.
- `"persistent": true` on `dev` — marks long-running processes.

### Build Order (automatic)

```
@tokiui/themes ──┐
@tokiui/ui     ──┼──► @tokiui/docs
@tokiui/cli    ──┘
```

Turborepo reads the `pnpm-workspace.yaml` dependency graph and determines this order automatically.

---

## Root Package Scripts

```json
// package.json (root)
{
  "scripts": {
    "dev":       "turbo dev",
    "build":     "turbo build",
    "lint":      "turbo lint",
    "clean":     "turbo clean",
    "format":    "prettier --write \"**/*.{ts,tsx,md,json,css}\"",
    "changeset": "changeset",
    "version":   "changeset version",
    "release":   "turbo build && changeset publish"
  }
}
```

| Command | What it does |
|---|---|
| `pnpm dev` | Starts all packages in watch/dev mode in parallel |
| `pnpm build` | Builds all packages in dependency order |
| `pnpm lint` | Runs TypeScript type checking across all packages |
| `pnpm clean` | Deletes `dist/`, `.next/`, `.turbo/` |
| `pnpm changeset` | Opens interactive prompt to create a new changeset |
| `pnpm version` | Consumes pending changesets and bumps versions |
| `pnpm release` | Builds everything then publishes all packages to npm |

---

## TypeScript Configuration

### `tsconfig.base.json` (root)

All packages extend this base config:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  }
}
```

**Key decisions:**
- `"strict": true` — enables all strict type checks
- `"moduleResolution": "bundler"` — modern resolution used by Vite/tsup/Next.js bundlers
- `"noUnusedLocals"` / `"noUnusedParameters"` — prevents dead code
- `"target": "ES2022"` — modern JS output

Each package has its own `tsconfig.json` that extends this:

```json
// packages/ui/tsconfig.json
{
  "extends": "../../tsconfig.base.json",
  "include": ["src"]
}
```

---

## Package Bundler: tsup

Each `packages/*` entry uses **tsup** to build TypeScript into distributable JavaScript.

### Example `tsup.config.ts` (packages/ui)

```ts
import { defineConfig } from 'tsup'

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    client: 'src/client.ts',
  },
  format: ['cjs', 'esm'],
  dts: true,
  sourcemap: true,
  clean: true,
  external: ['react', 'react-dom'],
})
```

**Output per package:**
```
dist/
  index.js       — CommonJS
  index.mjs      — ESM
  index.d.ts     — TypeScript declarations
  index.d.mts    — ESM TypeScript declarations
  (+ source maps)
```

---

## Windows Build Quirk

Turborepo's "Collecting build traces" step causes an NTFS race condition on Windows — the error is:

```
ENOENT: .next/server/app/_not-found/page.js.nft.json
```

**Fix:** Added to `apps/docs/next.config.mjs`:

```js
outputFileTracingExcludes: {
  '*': ['**/*'],
}
```

This disables output file tracing entirely for the docs build. Only reproducible through Turborepo (not direct `next build`).
