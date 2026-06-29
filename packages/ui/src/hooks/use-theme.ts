'use client'

import { useEffect, useState, useCallback } from 'react'

type Theme = 'light' | 'dark'

export interface UseThemeOptions {
  /**
   * Animate the light/dark switch with the View Transitions API (a full-page
   * crossfade). Falls back to an instant switch where the API is unsupported.
   * Default: false (instant), so existing behavior is unchanged.
   */
  transition?: boolean
}

export function useTheme(options: UseThemeOptions = {}): [Theme, () => void] {
  const { transition = false } = options
  const [theme, setTheme] = useState<Theme>('light')

  useEffect(() => {
    // Adopt the theme already on the DOM (set by a pre-paint script) if present, else
    // fall back to the stored value / system preference. Reading the DOM FIRST means we
    // re-apply the *current* theme on (re)mount instead of clobbering it with the initial
    // 'light' state — which previously caused a flash to light on remount (and, in pages
    // with embedded same-origin iframes, propagated that flash via the storage event).
    const root = document.documentElement
    const current =
      (root.dataset.theme as Theme | undefined) ||
      (localStorage.getItem('tokiui-theme') as Theme | null) ||
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    root.dataset.theme = current
    localStorage.setItem('tokiui-theme', current)
    setTheme(current)
  }, [])

  const toggle = useCallback(() => {
    // Read the live DOM value so we never toggle from a stale render.
    const current = (document.documentElement.dataset.theme as Theme) ?? 'light'
    const next: Theme = current === 'dark' ? 'light' : 'dark'

    // Mutate the DOM synchronously inside the transition callback so the
    // View Transitions snapshot captures the change; sync React state too.
    const apply = () => {
      document.documentElement.dataset.theme = next
      localStorage.setItem('tokiui-theme', next)
      setTheme(next)
    }

    if (transition && typeof document !== 'undefined' && 'startViewTransition' in document) {
      ;(document as Document & { startViewTransition: (cb: () => void) => void }).startViewTransition(apply)
    } else {
      apply()
    }
  }, [transition])

  return [theme, toggle]
}
