import { Header } from '@/components/site/header'
import { Footer } from '@/components/site/footer'
import { Hero } from '@/components/site/hero'
import { ComponentPreview } from '@/components/site/component-preview'
import { ThemeTeaser } from '@/components/site/theme-teaser'
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
                <div key={i} className="feature-card">
                  <div className="feature-card__icon">{f.icon}</div>
                  <h3 className="feature-card__title">{f.title}</h3>
                  <p className="feature-card__desc">{f.desc}</p>
                </div>
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
