'use client'

import { useState, useEffect, useCallback } from 'react'

const KEY = 'tokiui-theme'

export function useTheme(): [string, () => void, boolean] {
  const [theme, setTheme] = useState('light')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem(KEY)
    const initial = saved ?? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    setTheme(initial)
    setMounted(true)
  }, [])

  const toggle = useCallback(() => {
    // Read from DOM — always current regardless of React render cycle
    const current = document.documentElement.dataset.theme ?? 'light'
    const next = current === 'dark' ? 'light' : 'dark'

    const apply = () => {
      document.documentElement.dataset.theme = next
      localStorage.setItem(KEY, next)
      setTheme(next)
    }

    if ('startViewTransition' in document) {
      // Modern browsers: full-page crossfade via View Transitions API
      (document as Document & { startViewTransition: (cb: () => void) => void })
        .startViewTransition(apply)
    } else {
      // Fallback: briefly add a class that forces transitions on everything
      const root = document.documentElement
      root.classList.add('theme-transitioning')
      apply()
      setTimeout(() => root.classList.remove('theme-transitioning'), 300)
    }
  }, [])

  return [theme, toggle, mounted]
}
