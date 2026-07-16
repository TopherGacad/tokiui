import Link from 'next/link'
import { Icon } from './icons'

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
          <Icon.glyph style={{ color: 'var(--primary)' }} />
          <span style={{ color: 'var(--foreground)', fontWeight: 500 }}>tokiui</span>
          <span className="mono" style={{ fontSize: 12 }}>v0.5.0</span>
        </div>
        <div className="site-footer__links">
          <Link href="/docs/installation">Docs</Link>
          <Link href="/docs/components/button">Components</Link>
          <Link href="/frames">Frames</Link>
          <Link href="/playground">Playground</Link>
          <Link href="/changelog">Changelog</Link>
          <a href="https://github.com/TopherGacad/tokiui" target="_blank" rel="noreferrer">GitHub</a>
        </div>
      </div>
    </footer>
  )
}
