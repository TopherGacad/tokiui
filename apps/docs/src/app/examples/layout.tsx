import type { Metadata } from 'next'
import { Header } from '@/components/site/header'
import { Footer } from '@/components/site/footer'
import { ExamplesNav } from '@/components/examples/examples-nav'

export const metadata: Metadata = {
  title: { default: 'Examples', template: '%s — tokiui Examples' },
  description: 'Real, copy-paste pages built entirely from tokiui components.',
}

export default function ExamplesLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <ExamplesNav />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  )
}
