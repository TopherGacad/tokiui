# CLI, Themes, and Registry

---

## CLI — `@tokiui/cli`

### Purpose

The CLI allows developers to install tokiui components into any React project using the copy-paste model. Instead of importing from a package, the component source code is copied directly into the user's project — they own it and can modify it.

### Installation

```bash
npx @tokiui/cli@latest init
npx @tokiui/cli@latest add button
npx @tokiui/cli@latest add          # interactive multi-select
npx @tokiui/cli@latest theme apply <encoded-string>
```

### Package Structure

```
packages/cli/
├── src/
│   ├── commands/
│   │   ├── init.ts      — project setup
│   │   ├── add.ts       — component installation
│   │   └── theme.ts     — theme application
│   └── index.ts         — CLI entry point
├── dist/                — Built output
├── package.json
└── tsup.config.ts
```

### Entry Point

```ts
// src/index.ts
import { Command } from 'commander'
import { initCommand } from './commands/init'
import { addCommand } from './commands/add'
import { themeCommand } from './commands/theme'

const program = new Command()
program
  .name('tokiui')
  .description('Add tokiui components to your project')
  .version('0.1.0')

program.addCommand(initCommand)
program.addCommand(addCommand)
program.addCommand(themeCommand)

program.parse()
```

### `init` Command

Sets up a new project for tokiui:
- Detects project type (Next.js, Vite, etc.)
- Creates `src/components/ui/` directory
- Creates `src/lib/cn.ts` with the `cn()` helper
- Writes Tailwind CSS import and tokiui CSS variable setup to `globals.css`
- Uses `prompts` for interactive confirmation if files already exist

### `add` Command

Fetches and installs a component:
1. Reads `packages/registry/components/{name}.json` from GitHub raw URL
2. Reads the component source file
3. Installs npm `dependencies` listed in the registry JSON (uses user's detected package manager — detects via lockfile)
4. Writes the `.tsx` file to `src/components/ui/{name}.tsx`
5. Prompts before overwriting if file already exists

### `theme apply` Command

Applies a theme from the playground's shareable URL:
1. Decodes the URL-encoded theme string
2. Finds the user's `globals.css`
3. Patches the CSS variable values in-place

### Tech Dependencies

| Package | Purpose |
|---|---|
| commander | CLI framework, parses arguments |
| prompts | Interactive terminal input |
| fs-extra | File system with copy, ensureDir, etc. |
| kleur | Terminal color output (no deps, fast) |
| ora | Spinner for async operations |
| execa | Run shell commands (package manager install) |

### Build Configuration

The CLI builds to a single file that Node.js can execute:

```json
// package.json
{
  "main": "./dist/index.js",
  "bin": {
    "tokiui": "./dist/index.js"
  }
}
```

The `bin` field makes `npx @tokiui/cli` or `npx tokiui` work after installation.

---

## Preset Themes — `@tokiui/themes`

### Purpose

Five pre-designed theme objects that consumers can apply to their project. Used by the docs playground to demo different looks.

### Available Themes

| Theme | Character |
|---|---|
| `default` | Chartreuse primary, neutral grays |
| `rose` | Warm pink/rose primary |
| `slate` | Cool blue-gray primary |
| `neon` | High-chroma electric primary |
| `newspaper` | Near-monochrome, high contrast |

### Structure

```
packages/themes/
├── src/
│   ├── default.ts
│   ├── rose.ts
│   ├── slate.ts
│   ├── neon.ts
│   ├── newspaper.ts
│   ├── types.ts     — Theme and ThemeTokens type definitions
│   └── index.ts     — Exports all themes + allThemes array
└── package.json
```

### Theme Object Shape

Each theme is a typed object matching the CSS token names:

```ts
// types.ts
export interface ThemeTokens {
  background: string
  foreground: string
  primary: string
  primaryForeground: string
  secondary: string
  secondaryForeground: string
  muted: string
  mutedForeground: string
  accent: string
  accentForeground: string
  destructive: string
  destructiveForeground: string
  card: string
  cardForeground: string
  border: string
  input: string
  ring: string
  radius: string
}

export interface Theme {
  name: string
  label: string
  tokens: {
    light: ThemeTokens
    dark: ThemeTokens
  }
}
```

### Usage

```ts
import { defaultTheme, roseTheme, allThemes } from '@tokiui/themes'

// Apply a theme by setting CSS variables
Object.entries(roseTheme.tokens.light).forEach(([key, value]) => {
  document.documentElement.style.setProperty(`--${key}`, value)
})
```

The playground uses `@tokiui/themes` to populate its preset gallery.

---

## Component Registry — `packages/registry`

### Purpose

Static JSON files that the CLI fetches from GitHub raw URLs. There is no build step — these are plain `.json` files committed directly to Git.

### Structure

```
packages/registry/
├── index.json                  — List of all available components
└── components/
    ├── button.json
    ├── badge.json
    ├── card.json
    ├── input.json
    └── dialog.json
```

### `index.json`

```json
{
  "components": [
    { "name": "button", "label": "Button",  "description": "Displays a button." },
    { "name": "badge",  "label": "Badge",   "description": "Displays a badge." },
    { "name": "card",   "label": "Card",    "description": "Displays a card." },
    { "name": "input",  "label": "Input",   "description": "Displays a form input." },
    { "name": "dialog", "label": "Dialog",  "description": "A modal dialog window." }
  ]
}
```

### Component JSON Example (`button.json`)

```json
{
  "name": "button",
  "files": ["components/button.tsx"],
  "dependencies": ["@radix-ui/react-slot", "class-variance-authority"],
  "devDependencies": [],
  "registryDependencies": []
}
```

### How the CLI Fetches Registry Files

The CLI fetches from GitHub raw URLs:

```
https://raw.githubusercontent.com/TopherGacad/tokiui/main/packages/registry/components/button.json
```

This means:
- No server required — static files served by GitHub
- No CDN cost — GitHub handles it
- Always reflects the latest committed version on `main`

### Why Static JSON Instead of an API

- Zero infrastructure to maintain
- Survives indefinitely as long as the GitHub repo exists
- CLI works offline if the user has the files cached
- No rate limiting concerns for typical usage
