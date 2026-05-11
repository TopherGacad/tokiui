'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { Sheet, SheetContent, SheetTitle, SheetBody } from '@tokiui/ui'
import { Sidebar } from './sidebar'

const MenuIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
  </svg>
)

export function MobileNav() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => { setOpen(false) }, [pathname])

  return (
    <>
      <button
        className="mobile-menu-btn"
        onClick={() => setOpen(true)}
        aria-label="Open navigation"
      >
        <MenuIcon />
      </button>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="mobile-nav-sheet">
          <SheetTitle className="sr-only">Navigation</SheetTitle>
          <SheetBody style={{ padding: '16px 0' }}>
            <Sidebar />
          </SheetBody>
        </SheetContent>
      </Sheet>
    </>
  )
}
