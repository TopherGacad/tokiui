# Contributing

## Changesets workflow

Every user-facing change to `@tokiui/ui`, `@tokiui/cli`, or `@tokiui/themes` must have a changeset:

```bash
pnpm changeset
```

Select the affected packages, choose the bump type (`patch` / `minor` / `major`), and write a short description. Commit the generated file in `.changeset/` alongside your code changes.

**Do not manually bump version fields in package.json.** The Changesets action handles that when the Release PR is merged.

## Pull request flow

1. Branch off `main`
2. Make your changes
3. Run `pnpm changeset` if any package has user-facing changes
4. Push and open a PR — CI must pass before merging
5. Merge to `main`; Changesets action will either update the open Release PR or publish if it was already open

## Adding a component

See the README for the required steps. Components must be:
- `forwardRef`-capable
- Built with `class-variance-authority` for variants
- Using `cn()` for className merging
- Accessible via Radix UI primitives where applicable
- Minimum 44×44px touch target for interactive elements
