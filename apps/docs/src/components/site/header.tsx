import Link from 'next/link'
import { Icon } from './icons'
import { ThemeToggle } from './theme-toggle'

export function Header() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
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
          <button type="button" className="header-search" aria-label="Search components (⌘K)">
            <Icon.search />
            <span>Search</span>
            <span className="kbd">⌘K</span>
          </button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
