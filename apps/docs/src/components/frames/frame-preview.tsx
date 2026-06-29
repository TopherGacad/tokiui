'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

// The frames are designed at a desktop viewport; we render them in a non-interactive
// <iframe> scaled to fit the tile (ResizeObserver keeps the scale fitted on resize).
const BASE_W = 1280
const BASE_H = 800

export function FramePreview({ href, title, desc }: { href: string; title: string; desc: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [scale, setScale] = useState(0.42)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const update = () => setScale(el.clientWidth / BASE_W)
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  // The preview is a separate document (iframe), so the nav's theme toggle — which
  // only sets data-theme on the parent <html> — doesn't reach it. Mirror the parent
  // theme into the iframe on load and whenever it changes (same-origin).
  useEffect(() => {
    const iframe = iframeRef.current
    if (!iframe) return
    const root = document.documentElement
    const sync = () => {
      const doc = iframe.contentDocument
      if (doc?.documentElement) doc.documentElement.dataset.theme = root.dataset.theme || 'light'
    }
    iframe.addEventListener('load', sync)
    const mo = new MutationObserver(sync)
    mo.observe(root, { attributes: true, attributeFilter: ['data-theme'] })
    sync()
    return () => {
      iframe.removeEventListener('load', sync)
      mo.disconnect()
    }
  }, [])

  return (
    <Link href={href} className="group block no-underline">
      <div className="overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-[var(--border-strong)]">
        <div
          ref={ref}
          className="relative w-full overflow-hidden border-b border-border bg-background"
          style={{ height: BASE_H * scale }}
        >
          <iframe
            ref={iframeRef}
            src={href}
            title={`${title} preview`}
            aria-hidden="true"
            tabIndex={-1}
            loading="lazy"
            className="pointer-events-none absolute left-0 top-0 border-0"
            style={{ width: BASE_W, height: BASE_H, transform: `scale(${scale})`, transformOrigin: 'top left' }}
          />
        </div>
        <div className="flex items-center justify-between gap-3 p-4">
          <div className="min-w-0">
            <h2 className="text-sm font-medium text-foreground">{title}</h2>
            <p className="mt-0.5 truncate text-[13px] text-muted-foreground">{desc}</p>
          </div>
          <span className="shrink-0 text-muted-foreground transition-colors group-hover:text-foreground" aria-hidden="true">→</span>
        </div>
      </div>
    </Link>
  )
}
