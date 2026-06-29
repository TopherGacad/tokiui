'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

// Keeps the theme sticky and in sync across documents.
//
// 1) Re-assert on every navigation. `data-theme` lives on <html> (set by the pre-paint
//    script in the root layout) and is NOT React-controlled, so a client-side route change
//    that remounts components can drop or transiently clobber it. Re-applying the stored
//    value on each pathname change guarantees dark mode stays dark until the user toggles
//    it — e.g. navigating back from /frames/dashboard to /frames.
//
// 2) Cross-context sync for the /frames previews: they're <iframe>s, and the browser fires
//    a `storage` event in every same-origin context EXCEPT the one that made the change, so
//    a parent toggle reaches each preview here and it re-applies data-theme to itself.
export function ThemeSync() {
  const pathname = usePathname()

  useEffect(() => {
    const stored = localStorage.getItem('tokiui-theme')
    if (stored) document.documentElement.dataset.theme = stored
  }, [pathname])

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === 'tokiui-theme' && e.newValue) {
        document.documentElement.dataset.theme = e.newValue
      }
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  return null
}
