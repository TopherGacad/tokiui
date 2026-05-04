# Documentation Site — @tokiui/docs

## Overview

The docs site is a **Next.js 15 static export** — it builds to a folder of plain HTML/CSS/JS files with no server required. It is not published to npm.

**URL:** Will be served from the on-prem server at `/var/www/tokiui` once deployment secrets are configured.

---

## Tech Stack

| Technology | Purpose |
|---|---|
| Next.js 15 (App Router) | Framework, static export |
| MDX via `@next/mdx` | Markdown + React components for docs pages |
| rehype-pretty-code + Shiki | Syntax highlighting in code blocks |
| remark-gfm | GitHub Flavored Markdown (tables, strikethrough) |
| Tailwind CSS v4 | Styling via same token system as the UI package |
| nuqs | URL state sync for the playground |
| react-colorful | Color picker inputs in playground |
| culori | OKLCH ↔ hex color conversion |
| Geist + Geist Mono | Typography (loaded via `next/font/google`) |

---

## Next.js Configuration

```js
// next.config.mjs
import createMDX from '@next/mdx'
import remarkGfm from 'remark-gfm'
import rehypePrettyCode from 'rehype-pretty-code'

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [[rehypePrettyCode, { theme: 'github-dark', keepBackground: false }]],
  },
})

const nextConfig = {
  output: 'export',               // static HTML export
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  images: { unoptimized: true },  // required for static export
  outputFileTracingExcludes: { '*': ['**/*'] }, // Windows NTFS fix
}

export default withMDX(nextConfig)
```

---

## Directory Structure

```
apps/docs/src/
├── app/
│   ├── layout.tsx                  — Root layout (fonts, NuqsAdapter)
│   ├── page.tsx                    — Landing page (RSC)
│   ├── globals.css                 — ALL styles (no Tailwind prose utilities)
│   ├── docs/
│   │   ├── layout.tsx              — Docs shell: Header + Sidebar + content
│   │   ├── installation/page.mdx
│   │   ├── theming/page.mdx
│   │   └── components/
│   │       ├── button/page.mdx
│   │       ├── badge/page.mdx
│   │       ├── card/page.mdx
│   │       ├── input/page.mdx
│   │       └── dialog/page.mdx
│   └── playground/
│       ├── page.tsx                — Suspense wrapper for nuqs
│       └── playground-content.tsx — Full playground UI
└── components/
    ├── site/                       — Shared chrome (server + client)
    │   ├── header.tsx
    │   ├── footer.tsx
    │   ├── hero.tsx               — 'use client' (useCopy, Button)
    │   ├── icons.tsx              — All SVG icons as React components
    │   ├── theme-toggle.tsx       — 'use client' (useTheme)
    │   ├── component-preview.tsx  — 'use client' (landing page preview)
    │   ├── theme-teaser.tsx       — 'use client' (theme preset cards)
    │   ├── use-copy.ts            — Clipboard hook
    │   └── use-theme.ts           — Theme toggle hook (site-level)
    ├── docs/                       — Docs-only components
    │   ├── sidebar.tsx            — RSC nav
    │   ├── sidebar-link.tsx       — 'use client' (usePathname for active)
    │   ├── copy-button.tsx        — 'use client' (useCopy)
    │   ├── code-block.tsx         — Code block with copy button
    │   └── component-preview.tsx  — Preview wrapper for MDX pages
    └── playground/                 — Playground controls
        ├── color-picker.tsx
        ├── radius-slider.tsx
        ├── font-picker.tsx
        ├── preset-gallery.tsx
        ├── theme-editor.tsx
        └── component-showcase.tsx
```

---

## Root Layout

```tsx
// app/layout.tsx
import { Geist, Geist_Mono } from 'next/font/google'
import { NuqsAdapter } from 'nuqs/adapters/next/app'

const geistSans = Geist({ subsets: ['latin'], variable: '--font-geist-sans' })
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono' })

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <NuqsAdapter>{children}</NuqsAdapter>
      </body>
    </html>
  )
}
```

**Key decisions:**
- `suppressHydrationWarning` — prevents React warning when `data-theme` is set by client-side JS
- `NuqsAdapter` wraps everything so nuqs can sync URL state in the playground
- Fonts set as CSS variables, referenced in `globals.css`

---

## CSS Architecture

The docs site uses **custom CSS classes only** — no Tailwind prose plugin, no `@apply` for prose content.

All styles live in `apps/docs/src/app/globals.css`. Key class groups:

| Class | Purpose |
|---|---|
| `.site-header` | Top navigation bar |
| `.hero`, `.hero__*` | Landing page hero section |
| `.docs-layout` | Outer grid (header + sidebar + content) |
| `.docs-body` | Sidebar + content flex row |
| `.docs-sidebar` | Left navigation panel |
| `.docs-sidebar__link` | Nav link |
| `.docs-sidebar__link--active` | Active nav link (set by usePathname) |
| `.docs-content` | Main content area |
| `.docs-prose` | Typography for MDX content (h1-h3, p, a, code, table) |
| `.doc-preview` | Component preview panel in docs |
| `.code-block` | Code block with floating copy button |

This approach was chosen because:
1. Tailwind prose utilities don't match the exact design
2. All spacing/colors use the same CSS token system as the UI package
3. Easier to maintain — styles are co-located by purpose, not scattered across MDX

---

## Active Sidebar Link

The sidebar uses `usePathname()` to detect the active page. Since `usePathname` is a client hook, the active link detection is extracted into a separate `'use client'` component:

```tsx
// components/docs/sidebar-link.tsx
'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function SidebarLink({ href, children }) {
  const pathname = usePathname()
  return (
    <Link
      href={href}
      className={`docs-sidebar__link${pathname === href ? ' docs-sidebar__link--active' : ''}`}
    >
      {children}
    </Link>
  )
}
```

The parent `Sidebar` component remains a React Server Component — only the individual links are client components.

---

## Playground

The playground at `/playground` allows live theme editing with URL-shareable state.

### URL State with nuqs

```tsx
// playground-content.tsx
import { useQueryState } from 'nuqs'

// Each CSS variable is a URL parameter
const [primary, setPrimary] = useQueryState('primary', { defaultValue: 'oklch(0.74 0.17 118)' })
```

**Why nuqs:** `useSearchParams` from Next.js doesn't support SSR updates and requires a Suspense boundary. nuqs handles both, and on a static export, the Suspense boundary is the clean solution.

**Why URL state:** Themes are shareable via URL. The "Copy theme URL" button copies the current window URL. Anyone opening it sees the exact same theme.

### Suspense Wrapper

```tsx
// playground/page.tsx
import { Suspense } from 'react'
import { PlaygroundContent } from './playground-content'

export default function PlaygroundPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PlaygroundContent />
    </Suspense>
  )
}
```

Required because nuqs reads `useSearchParams` which needs Suspense on static exports.

---

## MDX Component Pages

Each component page at `docs/components/{name}/page.mdx` follows this structure:

```mdx
export const metadata = { title: 'Button' }

import { ComponentPreview } from '@/components/docs/component-preview'
import { Button } from '@tokiui/ui'

# Button

Description of the component.

## Usage

\`\`\`tsx
import { Button } from '@/components/ui/button'
\`\`\`

## Variants

<ComponentPreview>
  <Button variant="default">Default</Button>
  <Button variant="outline">Outline</Button>
</ComponentPreview>

## Props

| Prop | Type | Default |
|---|---|---|
| `variant` | `default \| outline \| ...` | `default` |
```

**Key:** The `<ComponentPreview>` wrapper renders the actual `@tokiui/ui` component (not a screenshot or mock) — so it reflects live theme variables.
