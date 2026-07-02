import Link from 'next/link'
import { Card } from '@tokiui/ui'
import { Header } from '@/components/site/header'
import { Footer } from '@/components/site/footer'
import { Hero } from '@/components/site/hero'
import { ComponentPreview } from '@/components/site/component-preview'
import { ThemeTeaser } from '@/components/site/theme-teaser'
import { Icon } from '@/components/site/icons'

const CHANGELOG = [
  { v: '0.5.0', date: 'Latest', entry: 'Table and Chart — zero-dependency SVG charts (area, bar, donut, radial, sparkline). Theme now persists across navigation.' },
  { v: '0.4.0', date: 'Recent', entry: 'Combobox and Kbd. Button gains shape + contrast options; Switch adds thumbClassName; opt-in useTheme crossfade.' },
  { v: '0.3.0', date: 'Earlier', entry: 'Navigation suite — Sidebar, Navigation Menu, Stepper, Breadcrumb, Pagination, Accordion, and Progress.' },
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

export default function HomePage() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />

        <section className="section section--tight" id="changelog" data-screen-label="Changelog">
          <div className="container">
            <div className="changelog-head">
              <h2 className="changelog-head__title">What&apos;s new</h2>
              <Link href="/changelog" className="changelog-head__link">
                Full changelog <Icon.arrow />
              </Link>
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
                // .feature-card div → tokiui Card. shadow="none" + p-7 + matched hover reproduce
                // the original exactly (rounded-lg + border already match the tokens).
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
