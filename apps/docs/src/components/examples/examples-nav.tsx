'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@tokiui/ui'

const LINKS = [
  { href: '/examples', label: 'Overview' },
  { href: '/examples/dashboard', label: 'Dashboard' },
  { href: '/examples/login', label: 'Login & Auth' },
  { href: '/examples/settings', label: 'Settings' },
]

export function ExamplesNav() {
  const pathname = usePathname()
  return (
    <div className="sticky top-[53px] z-30 border-b border-border bg-[color-mix(in_oklch,var(--background)_82%,transparent)] backdrop-blur">
      <nav aria-label="Examples" className="mx-auto flex h-12 max-w-[1100px] items-center gap-1 overflow-x-auto px-6">
        {LINKS.map((l) => {
          const active = l.href === '/examples' ? pathname === l.href : pathname.startsWith(l.href)
          return (
            <Link
              key={l.href}
              href={l.href}
              aria-current={active ? 'page' : undefined}
              className={cn(
                'whitespace-nowrap rounded-md px-3 py-1.5 text-[13px] no-underline transition-colors',
                active ? 'bg-muted font-medium text-foreground' : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {l.label}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
