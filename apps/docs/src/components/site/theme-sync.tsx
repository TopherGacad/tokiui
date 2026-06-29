'use client'

import { useEffect } from 'react'

// Keeps every document's theme in sync with the shared `tokiui-theme` localStorage key.
// This is what makes the /frames previews follow the nav toggle: the previews are
// <iframe>s, and the browser fires a `storage` event in every same-origin browsing
// context EXCEPT the one that made the change — so when the parent page toggles the
// theme, each preview iframe receives it here and re-applies data-theme to its own <html>.
// (Runs in the parent too, harmlessly — the parent's own toggle is handled by useTheme.)
export function ThemeSync() {
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
