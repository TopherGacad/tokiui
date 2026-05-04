# npm Publishing

## Package Scope

All three packages are published under the `@tokiui` scope:
- `@tokiui/ui`
- `@tokiui/cli`
- `@tokiui/themes`

Scoped packages default to **private** on npm. Publishing them as public requires either:
1. A paid npm org (for private access)
2. Explicitly publishing with `--access public`

We use option 2 — packages are public and free to use.

---

## Setup Steps

### 1. Create npm Account

1. Go to **npmjs.com** → Sign Up
2. Fill in username, email, password
3. Verify email

### 2. Create `@tokiui` Organization

The `@tokiui` scope must be owned by either an npm username matching `tokiui` or an npm org named `tokiui`.

1. Log in → click **+** → **Create Organization**
2. Name: `tokiui`
3. Select **Unlimited public packages** (free)
4. Create

### 3. Generate an npm Token

Used by GitHub Actions to publish packages automatically.

1. npmjs.com → profile photo → **Access Tokens**
2. Click **Generate New Token**
3. Select **Granular Access Token**
4. Fill in:
   - **Token name:** `tokiui-ci`
   - **Expiration:** 90 days (maximum available)
   - **Allowed IP ranges:** leave blank (GitHub Actions uses dynamic IPs)
   - **Packages and scopes:** Read and write, All packages
   - **Organizations:** tokiui — Read and write
   - ✅ **Bypass two-factor authentication** — required for CI publishing
5. Click **Generate Token**
6. Copy the token immediately (starts with `npm_...`) — it is shown only once

### 4. Add Token to GitHub Secrets

1. Go to `github.com/TopherGacad/tokiui` → **Settings**
2. **Secrets and variables** → **Actions**
3. **New repository secret**
4. Name: `NPM_TOKEN`
5. Value: paste the npm token
6. Save

---

## What Gets Published

The `files` field in each `package.json` acts as a **whitelist** — only listed files are included in the npm tarball. Everything else is excluded automatically.

### `@tokiui/ui`
```json
"files": ["dist", "src/styles.css"]
```
Published contents:
- `dist/index.js` — CommonJS
- `dist/index.mjs` — ESM
- `dist/index.d.ts` — TypeScript declarations
- `dist/client.js` / `.mjs` / `.d.ts` — client entry
- `src/styles.css` — OKLCH tokens + Tailwind @theme block
- `package.json` (automatically included)

### `@tokiui/cli`
```json
"files": ["dist"]
```
Published contents: the built CLI binary and its dependencies.

### `@tokiui/themes`
```json
"files": ["dist"]
```
Published contents: the compiled theme objects.

**Verified with:**
```bash
cd packages/ui && npm pack --dry-run
```

---

## Public Access Configuration

The `.changeset/config.json` sets `"access": "public"`:

```json
{
  "access": "public",
  "baseBranch": "main",
  "ignore": ["@tokiui/docs"]
}
```

This tells the Changesets CLI to pass `--access public` to every `npm publish` call. Without this, scoped packages would fail with a 402 payment required error.

`@tokiui/docs` is in the `ignore` list because it's a private internal app, not something that should ever be published.

---

## How Publishing Works in CI

The `release.yml` workflow handles publishing automatically:

```
pnpm release
  └── turbo build     (build all packages)
  └── changeset publish
        ├── npm info @tokiui/ui    (check current npm version)
        ├── npm info @tokiui/cli
        ├── npm info @tokiui/themes
        └── if local version > npm version → npm publish --access public
```

Changesets only publishes packages where the local `version` in `package.json` is higher than what's on npm. It will not re-publish an already-published version.

---

## Verifying Published Packages

```bash
npm view @tokiui/ui
npm view @tokiui/cli
npm view @tokiui/themes
```

Each should show version, description, dependencies, and publish date.

### First Release Output (v0.1.0 — 2026-04-30)

```
@tokiui/ui@0.1.0 | MIT | deps: 6 | versions: 1
tokiui React component library — production-grade copy-paste components
built on Radix UI and Tailwind CSS v4

dist-tags:
latest: 0.1.0

published 6 minutes ago by tophergacad
```

---

## Token Rotation

The npm token expires in 90 days. When it expires:
1. npm publishing will fail with a 401 Unauthorized error in the Release workflow
2. Fix: generate a new Granular Access Token on npmjs.com
3. Update the `NPM_TOKEN` secret in GitHub repo settings
4. Re-run the failed workflow

**Recommendation:** Set a calendar reminder for day 85 to rotate proactively.
