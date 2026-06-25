import Link from 'next/link'
import { Card } from '@tokiui/ui'

const EXAMPLES = [
  { href: '/examples/dashboard', title: 'Dashboard', desc: 'App shell with a collapsible sidebar, stat cards, an activity feed, and a data table.' },
  { href: '/examples/login', title: 'Login & Auth', desc: 'Sign-in, sign-up, and password-reset screens with social providers.' },
  { href: '/examples/settings', title: 'Settings', desc: 'Account settings with tabbed sections and realistic forms.' },
]

export default function ExamplesIndex() {
  return (
    <div className="mx-auto max-w-[1100px] px-6 py-16">
      <h1 className="text-3xl font-medium tracking-tight text-foreground">Examples</h1>
      <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-muted-foreground">
        Real pages built entirely from tokiui components — copy them as starting points for your own app.
      </p>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {EXAMPLES.map((e) => (
          <Link key={e.href} href={e.href} className="no-underline">
            <Card shadow="none" interactive className="h-full p-6">
              <h2 className="text-base font-medium text-foreground">{e.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{e.desc}</p>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
