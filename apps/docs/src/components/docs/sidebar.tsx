import { SidebarLink } from './sidebar-link'

const nav = [
  {
    label: 'Getting Started',
    items: [
      { label: 'Installation', href: '/docs/installation' },
      { label: 'Theming', href: '/docs/theming', pill: 'new' },
    ],
  },
  {
    label: 'Components',
    items: [
      { label: 'Button',  href: '/docs/components/button' },
      { label: 'Badge',   href: '/docs/components/badge' },
      { label: 'Card',    href: '/docs/components/card' },
      { label: 'Input',   href: '/docs/components/input' },
      { label: 'Dialog',  href: '/docs/components/dialog' },
    ],
  },
]

export function Sidebar() {
  return (
    <nav aria-label="Docs navigation">
      {nav.map((section) => (
        <div key={section.label} className="docs-sidebar__section">
          <span className="docs-sidebar__label">{section.label}</span>
          {section.items.map((item) => (
            <SidebarLink key={item.href} href={item.href} pill={'pill' in item ? item.pill : undefined}>
              {item.label}
            </SidebarLink>
          ))}
        </div>
      ))}
    </nav>
  )
}
