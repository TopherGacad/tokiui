# Version Automation — Changesets

## What Changesets Does

Changesets is a versioning and changelog management tool designed for monorepos. It solves the problem of coordinating version bumps across multiple related packages.

**Without Changesets:** You manually edit `version` fields in multiple `package.json` files, manually write changelogs, and hope you don't forget to bump a dependency.

**With Changesets:** You describe your changes in a human-readable file. When you're ready to release, Changesets calculates the correct version bumps automatically and generates changelogs from your descriptions.

---

## Configuration

```json
// .changeset/config.json
{
  "$schema": "https://unpkg.com/@changesets/config@3.0.0/schema.json",
  "changelog": "@changesets/cli/changelog",
  "commit": false,
  "fixed": [],
  "linked": [],
  "access": "public",
  "baseBranch": "main",
  "updateInternalDependencies": "patch",
  "ignore": ["@tokiui/docs"]
}
```

| Field | Value | Meaning |
|---|---|---|
| `access` | `"public"` | All packages publish with `--access public` |
| `baseBranch` | `"main"` | Changesets compares against the `main` branch |
| `updateInternalDependencies` | `"patch"` | When `@tokiui/ui` releases, `@tokiui/docs` gets a patch bump to its dependency |
| `ignore` | `["@tokiui/docs"]` | The docs app is never published to npm |
| `commit` | `false` | Changesets does not auto-commit the changeset files |

---

## Semver Bump Types

| Type | When to use | Example |
|---|---|---|
| `patch` | Bug fixes, internal changes | `0.1.0` → `0.1.1` |
| `minor` | New features, backwards-compatible | `0.1.0` → `0.2.0` |
| `major` | Breaking changes | `0.1.0` → `1.0.0` |

---

## Full Release Workflow (Step by Step)

### Step 1 — Developer makes changes

Developer adds a new component, fixes a bug, or updates documentation.

### Step 2 — Create a changeset

```bash
pnpm changeset
```

This opens an interactive prompt:

```
◉ Which packages would you like to include?
  ◉ @tokiui/ui
  ◯ @tokiui/cli
  ◯ @tokiui/themes

◉ Which packages should have a major bump? (none selected)
◉ Which packages should have a minor bump?
  ◉ @tokiui/ui

◉ Please enter a summary for this change:
  Add Select component with keyboard navigation support

=== Summary ===
minor: @tokiui/ui

Is this your desired changeset? (Y/n) · yes
```

This creates a file like `.changeset/fluffy-cats-dance.md`:

```markdown
---
"@tokiui/ui": minor
---

Add Select component with keyboard navigation support
```

### Step 3 — Commit and push the changeset

```bash
git add .changeset/fluffy-cats-dance.md
git commit -m "feat: add Select component"
git push origin main
```

### Step 4 — CI runs and passes

The CI workflow (`ci.yml`) runs lint and build on the pushed commit.

### Step 5 — Release workflow triggers automatically

After CI passes, the `release.yml` workflow triggers via `workflow_run`.

The Changesets action finds the pending changeset and:
1. Creates a branch called `changeset-release/main`
2. On that branch: bumps `@tokiui/ui` version in `package.json`, generates/updates `CHANGELOG.md`, deletes the changeset file
3. Opens a Pull Request titled **"chore: release packages"**

The PR diff looks like:

```diff
// packages/ui/package.json
- "version": "0.1.0"
+ "version": "0.2.0"

// packages/ui/CHANGELOG.md (new file)
+ ## 0.2.0
+ ### Minor Changes
+ - Add Select component with keyboard navigation support
```

### Step 6 — Review and merge the Release PR

Go to the PR on GitHub, review the version bumps and changelog, then click **Merge**.

### Step 7 — Changesets publishes to npm

The merge triggers CI again. When CI passes, the Release workflow triggers. This time, Changesets finds no pending changeset but detects that `@tokiui/ui@0.2.0` is not on npm. It runs:

```bash
pnpm release
# → turbo build (builds all packages)
# → changeset publish (publishes @tokiui/ui@0.2.0 to npm)
```

---

## Multiple Packages in One Release

If multiple packages change simultaneously:

```bash
pnpm changeset
# Select: @tokiui/ui (minor), @tokiui/themes (patch)
# Summary: Add new tokens to default theme and Select component
```

The generated changeset file:

```markdown
---
"@tokiui/ui": minor
"@tokiui/themes": patch
---

Add new tokens to default theme and Select component
```

Changesets handles all packages in a single Release PR.

---

## Rules

1. **Never manually edit `version` in `package.json`** — always use `pnpm changeset`
2. **Run `pnpm changeset` for every user-facing change** — even small ones
3. **`@tokiui/docs` is never versioned** — it's in the `ignore` list
4. **The Release PR is created automatically** — you just need to merge it
5. **Publishing happens on Release PR merge** — not on every push

---

## First Release (v0.1.0 — 2026-04-30)

The first release was created manually by running `pnpm changeset` and selecting `minor` for all three packages:

```markdown
---
"@tokiui/cli": minor
"@tokiui/themes": minor
"@tokiui/ui": minor
---

Initial release — Button, Badge, Card, Input, Dialog components with OKLCH theming
```

This bumped all packages from `0.0.1` → `0.1.0` and published:
- `@tokiui/ui@0.1.0`
- `@tokiui/cli@0.1.0`
- `@tokiui/themes@0.1.0`
