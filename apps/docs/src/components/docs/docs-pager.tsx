'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { flatNav } from '@/lib/docs-nav'

function ChevronLeft() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ChevronRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function DocsPager() {
  const pathname = usePathname()
  const idx = flatNav.findIndex((item) => item.href === pathname)

  if (idx === -1) return null

  const prev = flatNav[idx - 1]
  const next = flatNav[idx + 1]

  if (!prev && !next) return null

  return (
    <div className="docs-pager">
      {prev ? (
        <Link href={prev.href} className="docs-pager__btn">
          <span className="docs-pager__icon"><ChevronLeft /></span>
          <span className="docs-pager__text">
            <span className="docs-pager__dir">Previous</span>
            <span className="docs-pager__label">{prev.label}</span>
          </span>
        </Link>
      ) : <span />}
      {next ? (
        <Link href={next.href} className="docs-pager__btn docs-pager__btn--next">
          <span className="docs-pager__text">
            <span className="docs-pager__dir">Next</span>
            <span className="docs-pager__label">{next.label}</span>
          </span>
          <span className="docs-pager__icon"><ChevronRight /></span>
        </Link>
      ) : <span />}
    </div>
  )
}
