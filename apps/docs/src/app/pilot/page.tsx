// PILOT ROUTE — /pilot
// A parallel copy of the live landing page (app/page.tsx) that swaps bespoke,
// component-like markup for real @tokiui/ui components, to test whether the
// library can rebuild our own site with NO visual change. The live homepage is
// never touched. Compare side-by-side: "/" (live) vs "/pilot" (tokiui components).
//
// Maximal conversion — every bespoke element that maps to a component is now tokiui:
//   • Header        → Button (search), Button icon (theme toggle); nav links + ⌘K kept (see pilot/header)
//   • Hero          → Badge (pill), Button (CTAs + copy); install bar/title kept (layout)
//   • Features      → Card (pixel-identical)
//   • ComponentPreview → Button, Input, Switch, Badge; tab bar kept (Tabs lacks split mode)
//   • ThemeTeaser   → Button (preset pickers + CTA); preset-demo cards kept (intentional fake-token demo)
//   • Footer        → reused as-is: plain logo text + links, nothing maps to a component.
// Genuinely MISSING from tokiui on this page: `Kbd` (the ⌘K keycap).

import { Card } from '@tokiui/ui'
import { Header } from '@/components/pilot/header'
import { Footer } from '@/components/site/footer'
import { Hero } from '@/components/pilot/hero'
import { ComponentPreview } from '@/components/pilot/component-preview'
import { ThemeTeaser } from '@/components/pilot/theme-teaser'
import { Icon } from '@/components/site/icons'

const CHANGELOG = [
  { v: '0.1.4', date: '2 days ago', entry: 'Added DateRange, Combobox, and Toast. Fixed focus ring on Switch in dark mode.' },
  { v: '0.1.3', date: '9 days ago', entry: "Token export now writes to tailwind.config.ts directly. New 'orbit' theme preset." },
  { v: '0.1.2', date: '3 weeks ago', entry: 'Button variant API simplified — variant + size only. Migration codemod included.' },
]

const FEATURES = [
  {
    icon: <Icon.tokens />,
    title: 'Wired to our design tokens',
    desc: 'Every primitive reads from the same token map our designers ship from Figma. Update once, propagate everywhere.',
  },
  {
    icon: <Icon.upgrade />,
    title: 'Owned, but versioned',
    desc: 'Components install as code. When we ship a breaking change, a codemod migrates your usage — no fork rot.',
  },
  {
    icon: <Icon.a11y />,
    title: 'Accessible by default',
    desc: 'Built on Radix primitives. Keyboard, focus, ARIA — handled, audited, and covered by our internal a11y tests.',
  },
]

export default function PilotHomePage() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />

        <section className="section section--tight" id="changelog" data-screen-label="Changelog">
          <div className="container">
            <div className="changelog-head">
              <h2 className="changelog-head__title">What&apos;s new</h2>
              <a href="#" className="changelog-head__link">
                Full changelog <Icon.arrow />
              </a>
            </div>
            <div className="changelog">
              {CHANGELOG.map((c) => (
                <div key={c.v} className="changelog__item">
                  <span className="changelog__v mono">v{c.v}</span>
                  <span className="changelog__date mono">{c.date}</span>
                  <span className="changelog__entry">{c.entry}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section" data-screen-label="Features">
          <div className="container">
            <div className="section-head">
              <h2 className="section-title">Built for the way we ship.</h2>
            </div>
            <div className="features">
              {FEATURES.map((f, i) => (
                // PILOT: `.feature-card` div → tokiui <Card>. shadow="none" (the
                // bespoke card has no shadow) + p-7 (28px) + matched hover/transition
                // reproduce the original exactly; rounded-lg + border already match tokens.
                <Card
                  key={i}
                  shadow="none"
                  className="p-7 transition-colors duration-200 hover:border-[var(--border-strong)]"
                >
                  <div className="feature-card__icon">{f.icon}</div>
                  <h3 className="feature-card__title">{f.title}</h3>
                  <p className="feature-card__desc">{f.desc}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <ComponentPreview />
        <ThemeTeaser />
      </main>
      <Footer />
    </>
  )
}
