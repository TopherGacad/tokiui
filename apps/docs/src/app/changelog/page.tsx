import { Badge } from '@tokiui/ui'
import { Header } from '@/components/site/header'
import { Footer } from '@/components/site/footer'

export const metadata = {
  title: 'Changelog — tokiui',
  description: 'Every release of @tokiui/ui.',
}

const RELEASES: { v: string; latest?: boolean; highlights: string[] }[] = [
  {
    v: '0.5.0',
    latest: true,
    highlights: [
      'New Table component — composable primitives for static and data tables.',
      'New Chart component — zero-dependency SVG charts: area, bar, donut, radial, and sparkline.',
      'Theme now persists across client-side navigation (useTheme no longer flashes to light).',
    ],
  },
  {
    v: '0.4.0',
    highlights: [
      'New Combobox (searchable select) and Kbd (keyboard key) components.',
      'Button gains shape (pill) and color="contrast" options.',
      'Switch adds a thumbClassName prop; useTheme gains an opt-in View Transitions crossfade.',
    ],
  },
  {
    v: '0.3.0',
    highlights: [
      'Navigation suite — Sidebar, Navigation Menu, and Stepper.',
      'Breadcrumb and Pagination for wayfinding.',
      'Accordion and Progress.',
    ],
  },
  {
    v: '0.2.0',
    highlights: [
      'The tokiui CLI — init, add, and theme commands for copy-paste installs.',
      'Five preset themes: default, neon, newspaper, rose, and slate.',
    ],
  },
  {
    v: '0.1.0',
    highlights: [
      'Initial release — the core component set built on Radix primitives + Tailwind.',
      'OKLCH design tokens with dark mode via [data-theme].',
      'Docs site and the copy-paste component registry.',
    ],
  },
]

export default function ChangelogPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main id="main" className="flex-1">
        <div className="mx-auto max-w-3xl px-6 py-14">
          <h1 className="text-3xl font-medium tracking-tight text-foreground">Changelog</h1>
          <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-muted-foreground">
            Every release of <span className="font-mono text-foreground">@tokiui/ui</span> — versioned
            independently with Changesets, published to npm.
          </p>

          <div className="mt-10 divide-y divide-border">
            {RELEASES.map((r) => (
              <div key={r.v} className="grid gap-4 py-8 sm:grid-cols-[140px_1fr]">
                <div className="flex items-center gap-2">
                  <Badge variant={r.latest ? 'solid' : 'soft'} className="font-mono">
                    v{r.v}
                  </Badge>
                  {r.latest && <span className="text-[11px] uppercase tracking-wide text-muted-foreground">Latest</span>}
                </div>
                <ul className="space-y-2 text-sm text-foreground">
                  {r.highlights.map((h, i) => (
                    <li key={i} className="flex gap-2.5">
                      <span className="mt-[7px] size-1.5 shrink-0 rounded-full bg-primary" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
