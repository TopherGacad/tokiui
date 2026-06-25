'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

// A floating "back to gallery" pill shown only when a frame is viewed standalone.
// Hidden on the gallery itself (/frames) and when embedded in a preview <iframe>,
// so the gallery thumbnails stay clean.
export function FrameBackButton() {
  const pathname = usePathname()
  const [standalone, setStandalone] = useState(false)

  useEffect(() => {
    setStandalone(window.self === window.top)
  }, [])

  if (!standalone || pathname === '/frames') return null

  return (
    <Link
      href="/frames"
      aria-label="Back to all frames"
      className="fixed bottom-6 left-1/2 z-50 inline-flex -translate-x-1/2 items-center gap-2 rounded-full border border-border bg-[color-mix(in_oklch,var(--card)_92%,transparent)] px-4 py-2 text-sm font-medium text-foreground no-underline shadow-lg backdrop-blur transition-colors hover:bg-muted"
    >
      <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="m15 18-6-6 6-6" />
      </svg>
      Back to frames
    </Link>
  )
}
