// PILOT: header converted to tokiui where elements map to a component.
//   • search trigger (.header-search) → <Button variant="outline"> (override-heavy to match)
//   • theme toggle                    → pilot <ThemeToggle> (tokiui <Button>)
//   • nav links                       → kept as <Link> — plain text nav has no clean tokiui
//                                        primitive (Button would add padding/hover bg / underline)
//   • ⌘K keycap (.kbd)                → kept bespoke — tokiui has NO `Kbd` component (Tier-5 roadmap)
import Link from 'next/link'
import { Button } from '@tokiui/ui'
import { Icon } from '../site/icons'
import { ThemeToggle } from './theme-toggle'

interface HeaderProps {
  mobileNav?: React.ReactNode
}

export function Header({ mobileNav }: HeaderProps) {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        {mobileNav && <div className="mobile-menu-slot">{mobileNav}</div>}
        <Link href="/" className="wordmark" aria-label="tokiui home">
          <span className="brand__chip">tu</span>
          <span>tokiui</span>
        </Link>
        <nav className="nav" aria-label="Primary">
          <Link href="/docs/installation">Docs</Link>
          <Link href="/docs/components/button">Components</Link>
          <Link href="/playground">Playground</Link>
        </nav>
        <div className="header-right">
          <Button
            variant="outline"
            aria-label="Search components (⌘K)"
            // overrides to match .header-search: 34h, 200 min-w, left-aligned, muted bg, 13px, no shadow
            className="h-[34px] min-w-[200px] justify-start gap-2 rounded-[var(--radius-sm)] border-border bg-muted px-3 text-[13px] font-normal text-muted-foreground shadow-none active:scale-100 hover:bg-muted hover:text-foreground hover:border-[var(--border-strong)]"
          >
            <Icon.search />
            <span className="flex-1 text-left">Search</span>
            {/* tokiui has no Kbd component — keeping the bespoke keycap */}
            <span className="kbd">⌘K</span>
          </Button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
