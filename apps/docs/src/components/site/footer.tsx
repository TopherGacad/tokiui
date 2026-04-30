import { Icon } from './icons'

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
          <Icon.glyph style={{ color: 'var(--primary)' }} />
          <span style={{ color: 'var(--foreground)', fontWeight: 500 }}>tokiui</span>
          <span className="mono" style={{ fontSize: 12 }}>v0.1.4</span>
          <span style={{ fontSize: 12 }}>· updated 2 days ago</span>
        </div>
        <div className="site-footer__links">
          <a href="#components">Components</a>
          <a href="#">Source</a>
          <a href="#">#tokiui-help</a>
        </div>
      </div>
    </footer>
  )
}
