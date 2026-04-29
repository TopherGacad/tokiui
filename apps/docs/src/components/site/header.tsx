import Link from 'next/link'
import { ThemeToggle } from './theme-toggle'

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="font-bold tracking-tight">
            tokiui
          </Link>
          <nav className="hidden gap-4 text-sm sm:flex">
            <Link
              href="/docs/installation"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Docs
            </Link>
            <Link
              href="/docs/components/button"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Components
            </Link>
            <Link
              href="/playground"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Playground
            </Link>
          </nav>
        </div>
        <ThemeToggle />
      </div>
    </header>
  )
}
