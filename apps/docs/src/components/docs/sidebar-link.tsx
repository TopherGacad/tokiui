'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface SidebarLinkProps {
  href: string
  children: React.ReactNode
  pill?: string
}

export function SidebarLink({ href, children, pill }: SidebarLinkProps) {
  const pathname = usePathname()
  const active = pathname === href || pathname.startsWith(href + '/')

  return (
    <Link
      href={href}
      className={`docs-sidebar__link${active ? ' docs-sidebar__link--active' : ''}`}
    >
      <span>{children}</span>
      {pill === 'new' && <span className="sidebar-dot" aria-label="New" />}
    </Link>
  )
}
