import { nav } from '@/lib/docs-nav'
import { SidebarLink } from './sidebar-link'

export function Sidebar() {
  return (
    <nav aria-label="Docs navigation">
      {nav.map((section) => (
        <div key={section.label} className="docs-sidebar__section">
          <span className="docs-sidebar__label">{section.label}</span>
          {section.items.map((item) => (
            <SidebarLink key={item.href} href={item.href} pill={item.pill}>
              {item.label}
            </SidebarLink>
          ))}
        </div>
      ))}
    </nav>
  )
}
