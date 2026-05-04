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
  const active = pathname === href

  return (
    <Link
      href={href}
      className={`docs-sidebar__link${active ? ' docs-sidebar__link--active' : ''}`}
    >
      <span>{children}</span>
      {pill && (
        <span className={`pill${pill === 'new' ? ' pill--new' : ''}`}>{pill}</span>
      )}
    </Link>
  )
}
