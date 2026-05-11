'use client'

import { useState, useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'

interface TocItem { id: string; text: string }

export function TocNav() {
  const pathname = usePathname()
  const [items, setItems] = useState<TocItem[]>([])
  const [active, setActive] = useState('')
  const elCacheRef = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    const headings = Array.from(
      document.querySelectorAll<HTMLHeadingElement>('#docs-main .docs-prose h2')
    )
    const newItems = headings.map((h) => ({
      id: h.id,
      text: h.textContent?.replace(/\s*#\s*$/, '') ?? '',
    }))
    setItems(newItems)

    const scrollY = window.scrollY + 100
    let initialActive = newItems[0]?.id ?? ''
    for (const h of headings) {
      if (h.offsetTop <= scrollY) initialActive = h.id
      else break
    }
    setActive(initialActive)
  }, [pathname])

  useEffect(() => {
    if (items.length === 0) return

    elCacheRef.current = items.map((item) => document.getElementById(item.id))

    function onScroll() {
      const scrollY = window.scrollY + 100
      let current = items[0].id
      for (let i = 0; i < items.length; i++) {
        const el = elCacheRef.current[i]
        if (el && el.offsetTop <= scrollY) current = items[i].id
        else break
      }
      setActive(current)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [items])

  if (items.length === 0) return null

  return (
    <nav className="docs-toc" aria-label="On this page">
      <p className="docs-toc__title">On this page</p>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <a href={`#${item.id}`} className={active === item.id ? 'is-active' : ''}>
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
