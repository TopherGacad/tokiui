# tokiui

A production-grade React component library built with Tailwind CSS v4 and Radix UI. Copy components directly into your project — no dependency, no lock-in.

## Packages

| Package | Description |
|---|---|
| `@tokiui/ui` | React components |
| `@tokiui/cli` | CLI to add components to any project |
| `@tokiui/themes` | Preset theme definitions |
| `packages/registry` | Static JSON registry (no build step) |

## Development

Requires pnpm 9+ and Node 18+.

```bash
pnpm install
pnpm dev          # run all packages in watch mode
pnpm build        # build everything (Turborepo cached)
pnpm lint         # typecheck all packages
pnpm clean        # wipe all build artifacts
```

### Work on a specific package

```bash
pnpm --filter @tokiui/ui dev
pnpm --filter @tokiui/docs dev
pnpm --filter @tokiui/cli build
```

## Adding a new component

1. Create `packages/ui/src/components/<name>.tsx`
2. Export it from `packages/ui/src/index.ts`
3. Add `packages/registry/components/<name>.json` with its npm dependencies
4. Add it to `packages/registry/index.json`
5. Run `pnpm changeset` to record the change

## Releasing

Versioning is managed by [Changesets](https://github.com/changesets/changesets).

```bash
pnpm changeset        # after any user-facing change — describe what changed
pnpm version          # local version bump (CI does this via Release PR)
pnpm release          # build + publish to npm (CI does this after Release PR merges)
```

Never manually edit `version` fields in `package.json`.

## Deployment

The docs site (`apps/docs`) is a Next.js static export deployed to a VPS via GitHub Actions. See `deployment/README.md` for server setup.
