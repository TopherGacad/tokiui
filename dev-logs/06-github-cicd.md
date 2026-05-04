# GitHub Actions — CI/CD Pipeline

## Overview

Three workflow files handle the full CI/CD pipeline:

```
.github/workflows/
├── ci.yml       — Lint and build on every push/PR
├── release.yml  — Create Release PR or publish to npm
└── deploy.yml   — Build docs and copy to on-prem server
```

## Pipeline Flow

```
Developer pushes to main (or PR merged)
              │
              ▼
         ┌─────────┐
         │  ci.yml  │
         │  lint    │
         │  build   │
         └────┬─────┘
              │ (only if CI passes)
    ┌─────────┴─────────┐
    │                   │
    ▼                   ▼
release.yml         deploy.yml
Changesets          Build all packages
action              Copy out/ to server
    │
    ▼
If changeset pending → open Release PR
If Release PR merged → publish to npm
```

---

## `ci.yml` — Lint and Build

```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  ci:
    name: Lint & Build
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: pnpm
      - run: pnpm install --frozen-lockfile
      - run: pnpm build
      - run: pnpm lint
```

**Triggers:** Every push to `main` and every pull request targeting `main`.

**Steps:**
1. Checkout code
2. Set up pnpm (reads version from `packageManager` field in root `package.json`)
3. Set up Node.js 20 with pnpm caching
4. Install dependencies (frozen lockfile = no accidental updates)
5. `pnpm build` — Turborepo builds all packages in dependency order
6. `pnpm lint` — TypeScript type checking across all packages

---

## `release.yml` — Version Management and npm Publishing

```yaml
name: Release

on:
  workflow_run:
    workflows: [CI]
    branches: [main]
    types: [completed]

concurrency: ${{ github.workflow }}-${{ github.ref }}

permissions:
  contents: write
  pull-requests: write

jobs:
  release:
    runs-on: ubuntu-latest
    if: ${{ github.event.workflow_run.conclusion == 'success' }}

    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
      - uses: pnpm/action-setup@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: pnpm
      - run: pnpm install --frozen-lockfile
      - run: pnpm build
      - name: Create Release PR or Publish
        uses: changesets/action@v1
        with:
          publish: pnpm release
          title: 'chore: release packages'
          commit: 'chore: release packages'
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          NPM_TOKEN: ${{ secrets.NPM_TOKEN }}
```

**Trigger:** `workflow_run` — only fires after CI completes. The `if: conclusion == 'success'` guard ensures it skips if CI failed.

**Permissions needed:**
- `contents: write` — push the `changeset-release/main` branch
- `pull-requests: write` — create the Release PR

**Required GitHub setting:** In repo Settings → Actions → General → Workflow permissions:
- ✅ Read and write permissions
- ✅ Allow GitHub Actions to create and approve pull requests

**Secrets required:**
- `GITHUB_TOKEN` — auto-provided by GitHub Actions
- `NPM_TOKEN` — npm Granular Access Token with "Read and write" on packages + "bypass 2FA" enabled

**What Changesets action does:**
- If pending changesets exist → creates/updates `changeset-release/main` branch → opens PR titled "chore: release packages"
- If no pending changesets but unpublished versions exist → runs `pnpm release` → publishes to npm

---

## `deploy.yml` — Static Site Deployment

```yaml
name: Deploy Docs

on:
  workflow_run:
    workflows: [CI]
    branches: [main]
    types: [completed]

jobs:
  deploy:
    runs-on: ubuntu-latest
    if: ${{ github.event.workflow_run.conclusion == 'success' }}

    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: pnpm
      - run: pnpm install --frozen-lockfile
      - name: Build all packages then docs
        run: pnpm build
      - name: Deploy to server
        uses: appleboy/ssh-action@v1.0.3
        with:
          host: ${{ secrets.SERVER_HOST }}
          username: ${{ secrets.SERVER_USER }}
          key: ${{ secrets.SSH_PRIVATE_KEY }}
          script: mkdir -p /var/www/tokiui
      - name: Copy static files to server
        uses: appleboy/scp-action@v0.1.7
        with:
          host: ${{ secrets.SERVER_HOST }}
          username: ${{ secrets.SERVER_USER }}
          key: ${{ secrets.SSH_PRIVATE_KEY }}
          source: apps/docs/out/
          target: /var/www/tokiui/
          strip_components: 2
```

**Why `pnpm build` instead of `pnpm --filter @tokiui/docs build`:**

`@tokiui/docs` imports from `@tokiui/ui` via `workspace:*`. In CI there are no pre-built `dist/` files, so `@tokiui/ui` must be built first. `pnpm build` runs Turborepo which automatically builds dependencies first (`dependsOn: ["^build"]`). Using `--filter` alone bypasses Turborepo's dependency resolution.

**Secrets required:**
- `SERVER_HOST` — IP address or hostname of the on-prem server
- `SERVER_USER` — SSH username on the server
- `SSH_PRIVATE_KEY` — Full contents of the SSH private key file

**Status:** Build step works. SSH step pending until server secrets are configured.

---

## Troubleshooting History

### 403 on git push from Release workflow

**Error:** `remote: Permission to TopherGacad/tokiui.git denied to github-actions[bot]`

**Cause:** The default GitHub Actions token has read-only access. The `permissions` block in the workflow file alone is not always sufficient with `workflow_run` triggers.

**Fix:** GitHub repo → Settings → Actions → General → Workflow permissions → **Read and write permissions**

---

### "GitHub Actions is not permitted to create or approve pull requests"

**Error:** `HttpError: GitHub Actions is not permitted to create or approve pull requests`

**Cause:** Separate setting from write permissions.

**Fix:** GitHub repo → Settings → Actions → General → Workflow permissions → check **"Allow GitHub Actions to create and approve pull requests"**

---

### 403 on npm publish — 2FA required

**Error:** `E403 Forbidden - Two-factor authentication or granular access token with bypass 2fa enabled is required`

**Cause:** npm requires either 2FA setup OR a token with bypass 2FA enabled for publishing.

**Fix:** Generate a new **Granular Access Token** on npmjs.com with:
- Permissions: Read and write on packages
- ✅ Bypass two-factor authentication checked
- Update `NPM_TOKEN` in GitHub secrets

---

### Module not found `@tokiui/ui` in CI docs build

**Error:** `Module not found: Can't resolve '@tokiui/ui'` during docs build

**Cause:** An earlier deploy workflow used `pnpm --filter @tokiui/docs build` which skips building `@tokiui/ui` first.

**Fix:** Changed to `pnpm build` so Turborepo handles the full dependency graph.

---

### Windows NTFS build error

**Error:** `ENOENT: .next/server/app/_not-found/page.js.nft.json` when building via Turborepo on Windows

**Cause:** Race condition during Next.js "Collecting build traces" step when Turborepo is managing file output.

**Fix:** Added to `next.config.mjs`:
```js
outputFileTracingExcludes: { '*': ['**/*'] }
```
