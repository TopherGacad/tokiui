'use client'

import { useState, useEffect } from 'react'

interface TocItem { id: string; text: string }

export function TocNav() {
  const [items, setItems] = useState<TocItem[]>([])
  const [active, setActive] = useState('')

  useEffect(() => {
    const headings = Array.from(
      document.querySelectorAll<HTMLHeadingElement>('#docs-main .docs-prose h2')
    )
    setItems(headings.map((h) => ({
      id: h.id,
      text: h.textContent?.replace(/\s*#\s*$/, '') ?? '',
    })))
  }, [])

  useEffect(() => {
    if (items.length === 0) return
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) { setActive(entry.target.id); break }
        }
      },
      { rootMargin: '-80px 0px -70% 0px' }
    )
    items.forEach((item) => {
      const el = document.getElementById(item.id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
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
