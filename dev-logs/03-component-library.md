# Component Library — @tokiui/ui

## Package Structure

```
packages/ui/
├── src/
│   ├── components/
│   │   ├── button.tsx
│   │   ├── badge.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   └── dialog.tsx
│   ├── hooks/
│   │   ├── use-theme.ts
│   │   └── use-media-query.ts
│   ├── lib/
│   │   └── utils.ts         — cn() helper
│   ├── styles.css           — OKLCH tokens + Tailwind @theme
│   ├── index.ts             — Main entry (server-safe)
│   └── client.ts            — Client entry ('use client' hooks)
├── dist/                    — Built output (gitignored)
├── package.json
├── tsconfig.json
└── tsup.config.ts
```

---

## Two Entry Points

The package has two separate entry points to respect the Next.js App Router server/client boundary:

### `@tokiui/ui` — server-safe

```ts
// src/index.ts
export { Button, buttonVariants } from './components/button'
export type { ButtonProps } from './components/button'
export { Badge, badgeVariants } from './components/badge'
export type { BadgeProps } from './components/badge'
export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from './components/card'
export { Input } from './components/input'
export type { InputProps } from './components/input'
export { Dialog, DialogPortal, DialogOverlay, DialogClose, DialogTrigger,
         DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription } from './components/dialog'
export { cn } from './lib/utils'
```

Components can be imported in React Server Components.

### `@tokiui/ui/client` — client-only

```ts
// src/client.ts
'use client'
export { useMediaQuery } from './hooks/use-media-query'
export { useTheme } from './hooks/use-theme'
```

Hooks require `'use client'` and must not be imported in Server Components.

---

## Core Utility: `cn()`

```ts
// src/lib/utils.ts
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

- `clsx` handles conditional class strings
- `tailwind-merge` deduplicates conflicting Tailwind classes (e.g., `p-4 p-6` → `p-6`)

All components use `cn()` so consumers can override styles via `className`.

---

## Component Conventions

Every component follows these rules:

1. **`forwardRef`** — allows parent components to access the DOM element
2. **`VariantProps`** — exported alongside the component so consumers get type-safe variant props
3. **`cn()` for className** — user's `className` always wins via merge
4. **No `any` types** — TypeScript strict throughout
5. **Minimum 44×44px touch target** — for interactive elements
6. **Radix UI** for anything requiring accessibility (focus traps, keyboard nav, ARIA)

---

## Components

### Button

```tsx
const buttonVariants = cva(
  [
    'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium',
    'transition-all duration-150 select-none',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
    'active:scale-[0.97]',
  ],
  {
    variants: {
      variant: {
        default:     'bg-primary text-primary-foreground shadow-sm hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
        outline:     'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
        secondary:   'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
        ghost:       'hover:bg-accent hover:text-accent-foreground',
        link:        'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 min-w-[44px] px-4 py-2',
        sm:      'h-9  min-w-[44px] px-3 text-xs',
        lg:      'h-11 min-w-[44px] px-8 text-base',
        icon:    'h-10 w-10',
      },
    },
    defaultVariants: { variant: 'default', size: 'default' },
  }
)
```

**Key decisions:**
- `active:scale-[0.97]` — provides press feedback
- `min-w-[44px]` on all sizes — ensures 44px touch target
- `asChild` prop via `@radix-ui/react-slot` — renders as any element (e.g., Next.js `<Link>`)

**Usage:**
```tsx
<Button>Click me</Button>
<Button variant="outline" size="lg">Large outline</Button>
<Button asChild><Link href="/docs">Go to docs</Link></Button>
```

---

### Badge

```tsx
const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors',
  {
    variants: {
      variant: {
        default:     'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
        secondary:   'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive: 'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
        outline:     'border-border text-foreground',
      },
    },
    defaultVariants: { variant: 'default' },
  }
)
```

Renders as a `<span>` (correct for inline use). Has `forwardRef`.

---

### Card

Compound component pattern — multiple sub-components compose a complete card:

```tsx
Card           // outer container — rounded border + bg-card
CardHeader     // top section — flex column, padding
CardTitle      // h3 heading
CardDescription // muted paragraph
CardContent    // main body area
CardFooter     // bottom row — flex, padding
```

All sub-components have `forwardRef` and accept `className`.

**Usage:**
```tsx
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>Content here</CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>
```

---

### Input

```tsx
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => (
    <input
      type={type}
      className={cn(
        'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm',
        'ring-offset-background placeholder:text-muted-foreground',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'file:border-0 file:bg-transparent file:text-sm file:font-medium',
        className
      )}
      ref={ref}
      {...props}
    />
  )
)
```

Forwards all native `<input>` attributes. Works with any `type` (text, email, password, file, etc.).

---

### Dialog

Built on `@radix-ui/react-dialog`. Provides:

- **Focus trap** — keyboard focus stays inside while open
- **Escape to close** — built into Radix
- **Scroll lock** — body scroll prevented while open
- **Portal** — renders into `document.body`, not inline
- **Animated overlay** — fade in/out via keyframes
- **Animated content** — scale + fade enter/exit

```
Dialog              // Root state machine (Radix)
DialogTrigger       // Opens dialog on click
DialogPortal        // Renders into document.body
DialogOverlay       // Dark backdrop with fade animation
DialogContent       // The panel (includes built-in close button)
DialogHeader        // Top section
DialogTitle         // Required — becomes aria-labelledby
DialogDescription   // Optional — becomes aria-describedby
DialogFooter        // Bottom actions row
DialogClose         // Closes dialog — use asChild to wrap your button
```

**Usage:**
```tsx
<Dialog>
  <DialogTrigger asChild>
    <Button>Open</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Confirm action</DialogTitle>
      <DialogDescription>This cannot be undone.</DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
      <Button>Confirm</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

---

## Package Configuration

### `package.json` key fields

```json
{
  "name": "@tokiui/ui",
  "version": "0.1.0",
  "license": "MIT",
  "exports": {
    ".": {
      "types":   "./dist/index.d.ts",
      "import":  "./dist/index.mjs",
      "require": "./dist/index.js"
    },
    "./client": {
      "types":   "./dist/client.d.ts",
      "import":  "./dist/client.mjs",
      "require": "./dist/client.js"
    },
    "./styles.css": "./src/styles.css"
  },
  "files": ["dist", "src/styles.css"]
}
```

- `exports` — modern package exports map; supports both ESM and CJS
- `files` — whitelist for npm publish; only `dist/` and `styles.css` are included (no source, no tests, no docs)

---

## `useTheme` Hook (client entry)

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

## `useMediaQuery` Hook (client entry)

```ts
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(query)
    setMatches(media.matches)
    const listener = (e: MediaQueryListEvent) => setMatches(e.matches)
    media.addEventListener('change', listener)
    return () => media.removeEventListener('change', listener)
  }, [query])

  return matches
}
```
