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
    const stored = localStorage.getItem('tokiui-theme') as Theme | null
    const preferred = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    setTheme(stored ?? preferred)
  }, [])

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('tokiui-theme', theme)
  }, [theme])

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
