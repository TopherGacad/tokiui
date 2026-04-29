import Link from 'next/link'

const nav = [
  {
    label: 'Getting Started',
    items: [
      { label: 'Installation', href: '/docs/installation' },
      { label: 'Theming', href: '/docs/theming' },
    ],
  },
  {
    label: 'Components',
    items: [
      { label: 'Button', href: '/docs/components/button' },
      { label: 'Card', href: '/docs/components/card' },
      { label: 'Input', href: '/docs/components/input' },
      { label: 'Dialog', href: '/docs/components/dialog' },
      { label: 'Badge', href: '/docs/components/badge' },
    ],
  },
]

export function Sidebar() {
  return (
    <nav className="space-y-6 text-sm">
      {nav.map((section) => (
        <div key={section.label}>
          <p className="mb-2 font-semibold">{section.label}</p>
          <ul className="space-y-1">
            {section.items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block rounded px-2 py-1 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  )
}
