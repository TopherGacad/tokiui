import Link from 'next/link'
import { Header } from '@/components/site/header'
import { Footer } from '@/components/site/footer'
import { Button } from '@tokiui/ui'

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="container mx-auto px-4 py-24 text-center">
          <div className="mx-auto max-w-3xl">
            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-6xl">
              Beautiful components.
              <br />
              <span className="text-muted-foreground">Yours to own.</span>
            </h1>
            <p className="mb-10 text-lg text-muted-foreground sm:text-xl">
              A copy-paste React component library built with Tailwind CSS and Radix UI. Add
              components directly to your project — no dependencies, no lock-in.
            </p>
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button asChild size="lg">
                <Link href="/docs/installation">Get Started</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/playground">Theme Playground</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Install snippet */}
        <section className="container mx-auto px-4 pb-24">
          <div className="mx-auto max-w-xl">
            <div className="rounded-lg border bg-card p-4 font-mono text-sm">
              <span className="text-muted-foreground">$ </span>
              <span>npx @tokiui/cli add button</span>
            </div>
          </div>
        </section>

        {/* Feature grid */}
        <section className="border-t bg-muted/40">
          <div className="container mx-auto px-4 py-24">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((f) => (
                <div key={f.title} className="rounded-lg border bg-card p-6">
                  <div className="mb-3 text-2xl">{f.icon}</div>
                  <h3 className="mb-2 font-semibold">{f.title}</h3>
                  <p className="text-sm text-muted-foreground">{f.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

const features = [
  {
    icon: '📋',
    title: 'Copy & paste',
    description:
      'Copy components into your project. You own the code — customize freely without waiting for library updates.',
  },
  {
    icon: '🎨',
    title: 'Theme playground',
    description:
      'Customize every color token, radius, and more in real time. Share themes via URL.',
  },
  {
    icon: '♿',
    title: 'Accessible by default',
    description:
      'Built on Radix UI primitives. Keyboard navigation, focus management, and ARIA attributes included.',
  },
  {
    icon: '🌗',
    title: 'Dark mode',
    description:
      'Every component supports light and dark mode via CSS variables. Toggle with a single class.',
  },
  {
    icon: '📱',
    title: 'Mobile first',
    description:
      'Responsive components with minimum 44×44px touch targets and mobile-optimized interactions.',
  },
  {
    icon: '⚡',
    title: 'Tailwind CSS v4',
    description:
      'Fully typed class names, alpha modifiers on every color token, and zero runtime overhead.',
  },
]
