import Link from 'next/link'
import { SiteSearch } from './command-menu'
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
          <Link href="/frames">Frames</Link>
          <Link href="/playground">Playground</Link>
        </nav>
        <div className="header-right">
          <SiteSearch />
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
