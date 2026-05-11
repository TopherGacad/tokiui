# Theme System

## Why OKLCH Instead of HSL

Most component libraries (including shadcn/ui) use HSL color values. tokiui uses **OKLCH** — a perceptually uniform color space.

**The problem with HSL:** Two colors at the same HSL lightness value don't appear equally light to the human eye. `hsl(120, 70%, 50%)` (green) looks much lighter than `hsl(240, 70%, 50%)` (blue) even though they share the same lightness number.

**OKLCH is perceptually uniform:** `oklch(0.5 0.2 120)` and `oklch(0.5 0.2 240)` genuinely appear at the same perceptual lightness. This means accessible color pairs are easier to design and predictable across hues.

**OKLCH format:** `oklch(lightness chroma hue)`
- `lightness` — 0 (black) to 1 (white)
- `chroma` — 0 (grey) to ~0.4 (maximum saturation)
- `hue` — 0–360 degrees

---

## Architecture: CSS Custom Properties

All design tokens are **CSS custom properties** defined in `packages/ui/src/styles.css`. This file is imported by the consuming application.

### Step 1: `@theme` block — connects CSS vars to Tailwind utilities

```css
@theme {
  --color-background:          var(--background);
  --color-foreground:          var(--foreground);
  --color-primary:             var(--primary);
  --color-primary-foreground:  var(--primary-foreground);
  --color-secondary:           var(--secondary);
  --color-muted:               var(--muted);
  --color-muted-foreground:    var(--muted-foreground);
  --color-accent:              var(--accent);
  --color-accent-foreground:   var(--accent-foreground);
  --color-destructive:         var(--destructive);
  --color-card:                var(--card);
  --color-card-foreground:     var(--card-foreground);
  --color-popover:             var(--popover);
  --color-popover-foreground:  var(--popover-foreground);
  --color-border:              var(--border);
  --color-input:               var(--input);
  --color-ring:                var(--ring);

  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
}
```

**Critical difference from shadcn/ui (Tailwind v3):**
- shadcn: `--color-primary: hsl(var(--primary))` — HSL channels, needed wrapping
- tokiui: `--color-primary: var(--primary)` — full OKLCH values, no wrapping needed

Tailwind v4 resolves CSS variables at runtime in the browser, so `var()` references work directly inside `@theme`.

### Step 2: Actual color values in `:root` and `[data-theme="dark"]`

```css
@layer base {
  :root {
    --background:            oklch(0.99 0.003 95);
    --foreground:            oklch(0.18 0.005 95);
    --card:                  oklch(1 0 0);
    --card-foreground:       oklch(0.18 0.005 95);
    --popover:               oklch(1 0 0);
    --popover-foreground:    oklch(0.18 0.005 95);
    --primary:               oklch(0.52 0.16 145);   /* green */
    --primary-foreground:    oklch(0.99 0.003 95);
    --secondary:             oklch(0.96 0.005 95);
    --secondary-foreground:  oklch(0.18 0.005 95);
    --muted:                 oklch(0.96 0.005 95);
    --muted-foreground:      oklch(0.50 0.008 95);
    --accent:                oklch(0.96 0.005 95);
    --accent-foreground:     oklch(0.18 0.005 95);
    --destructive:           oklch(0.62 0.20 25);    /* red */
    --destructive-foreground: oklch(0.99 0.003 95);
    --border:                oklch(0.92 0.005 95);
    --input:                 oklch(0.96 0.005 95);
    --ring:                  oklch(0.52 0.16 145);
    --radius:                10px;
    --radius-sm:             6px;
    --radius-lg:             14px;
  }

  [data-theme="dark"] {
    --background:            oklch(0.18 0.005 95);   /* GitHub-dark level */
    --foreground:            oklch(0.96 0.003 95);
    --card:                  oklch(0.21 0.005 95);
    --primary:               oklch(0.72 0.15 145);   /* brighter green for dark */
    --border:                oklch(0.28 0.006 95);
    /* ... all other tokens ... */
  }
}
```

**Dark mode selector:** `[data-theme="dark"]` on `<html>` — NOT `.dark` class.

This is set by JavaScript:
```js
document.documentElement.dataset.theme = 'dark'   // enable dark mode
document.documentElement.dataset.theme = 'light'  // enable light mode
```

---

## Default Brand Color

The default primary is **green** — a warm green distinctive from shadcn's default blue/neutral:

- Light mode: `oklch(0.52 0.16 145)`
- Dark mode: `oklch(0.72 0.15 145)` (brighter to maintain contrast on dark backgrounds)

---

## Dark Mode Toggle Implementation

### In `@tokiui/ui/client` — `useTheme` hook

```ts
export function useTheme(): [Theme, () => void] {
  const [theme, setTheme] = useState<Theme>('light')

  useEffect(() => {
    const stored = localStorage.getItem('tokiui-theme') as Theme | null
    const preferred = window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark' : 'light'
    setTheme(stored ?? preferred)
  }, [])

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('tokiui-theme', theme)
  }, [theme])

  const toggle = useCallback(() => setTheme(t => t === 'dark' ? 'light' : 'dark'), [])
  return [theme, toggle]
}
```

**Behavior:**
1. On mount: reads `localStorage` for a saved preference
2. Falls back to `prefers-color-scheme` system preference
3. On change: sets `document.documentElement.dataset.theme` and saves to `localStorage`

### In the docs site — `use-theme.ts` (site-level hook)

The docs site has its own copy at `apps/docs/src/components/site/use-theme.ts` — same logic but returns a `mounted` boolean to prevent hydration flicker:

```ts
export function useTheme(): [string, () => void, boolean] {
  const [theme, setTheme] = useState('light')
  const [mounted, setMounted] = useState(false)
  // ...
  return [theme, toggle, mounted]
}
```

The `mounted` flag is used in `ThemeToggle` to only render the sun/moon icon after hydration:

```tsx
{mounted && theme === 'dark' ? <Icon.sun /> : <Icon.moon />}
```

---

## How Users Customize Themes

Users override variables in their own `globals.css` after importing tokiui's styles:

```css
@import "tailwindcss";
@import "@tokiui/ui/styles.css";

:root {
  --primary: oklch(0.65 0.20 270);  /* change to purple */
  --radius: 14px;                    /* rounder corners */
}

[data-theme="dark"] {
  --primary: oklch(0.72 0.18 270);
}
```

No component changes required — all components use semantic tokens like `bg-primary` which resolve through the CSS variable chain.

---

## Animation Keyframes

Defined in `styles.css` for use by Dialog and other components:

```css
@keyframes fade-in   { from { opacity: 0 } to { opacity: 1 } }
@keyframes fade-out  { from { opacity: 1 } to { opacity: 0 } }

@keyframes dialog-in {
  from { opacity: 0; transform: translate(-50%, -48%) scale(0.96) }
  to   { opacity: 1; transform: translate(-50%, -50%) scale(1) }
}

@keyframes dialog-out {
  from { opacity: 1; transform: translate(-50%, -50%) scale(1) }
  to   { opacity: 0; transform: translate(-50%, -48%) scale(0.96) }
}
```

Applied via Tailwind v4 arbitrary animation values with Radix UI data attributes:

```tsx
// In dialog.tsx
'data-[state=open]:animate-[dialog-in_200ms_cubic-bezier(0.16,1,0.3,1)]'
'data-[state=closed]:animate-[dialog-out_150ms_ease]'
```

---

## Theme Presets Package (`@tokiui/themes`)

Theme presets live in `packages/themes/src/` as TypeScript objects. All token values are **full OKLCH CSS color strings** (e.g. `oklch(0.52 0.16 145)`), not bare HSL channels.

### Available presets

| Name | File | Character |
|---|---|---|
| Default | `default.ts` | Warm neutral + green primary. Matches `styles.css` exactly. |
| Rose | `rose.ts` | Cool neutral base + rose/pink primary (`oklch(0.55 0.22 12)`) |
| Slate | `slate.ts` | Blue-tinted neutral + navy/blue primary (`oklch(0.40 0.19 255)`) |
| Neon | `neon.ts` | Near-black purple bg + vivid violet primary + cyan-green accent |
| Newspaper | `newspaper.ts` | Warm sepia/cream bg + dark ink primary |

### Structure

```ts
// packages/themes/src/rose.ts
export const roseTheme: Theme = {
  name: 'rose',
  label: 'Rose',
  light: {
    background: 'oklch(1 0 0)',
    primary:    'oklch(0.55 0.22 12)',  // full color value, not bare channels
    radius:     '0.5rem',
    // ...
  },
  dark: {
    background: 'oklch(0.12 0.008 50)',
    primary:    'oklch(0.55 0.22 12)',
    // ...
  },
}
```

### Playground integration

The playground (`apps/docs/src/app/playground/`) uses these presets as starting state. Token values are spread as inline CSS custom properties on the preview container — since values are valid CSS colors, they work directly:

```tsx
// playground-content.tsx
<div style={{ ...(activeVars as React.CSSProperties), backgroundColor: activeTokens.background }}>
  <ComponentShowcase />
</div>
```

The `tokensToCssVars()` helper converts camelCase keys to `--kebab-case` CSS variable names and passes values through verbatim.

### Color picker (OKLCH ↔ hex)

`apps/docs/src/components/playground/color-picker.tsx` uses `culori` v3 to:
- **Display swatch:** `style={{ backgroundColor: value }}` — direct OKLCH value, valid CSS
- **Hex for picker input:** `oklch(...)` → RGB via `toRgb()` → hex
- **On pick:** hex → `toOklch()` → formatted `oklch(L C H)` string passed to `onChange`

### CLI `tokiui theme apply`

The CLI command (`packages/cli/src/commands/theme.ts`) reads a base64-encoded JSON of `{ light: ThemeTokens, dark: ThemeTokens }` from the playground URL and replaces CSS variable values in the user's `globals.css`. Since all token values are now valid OKLCH strings, replacing `--background: oklch(0.99 0.003 95)` with `oklch(1 0 0)` (for example) is always valid CSS.
