'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function SidebarLink({ href, children }: { href: string; children: React.ReactNode }) {
  const pathname = usePathname()
  const active = pathname === href

  return (
    <Link
      href={href}
      className={`docs-sidebar__link${active ? ' docs-sidebar__link--active' : ''}`}
    >
      {children}
    </Link>
  )
}
