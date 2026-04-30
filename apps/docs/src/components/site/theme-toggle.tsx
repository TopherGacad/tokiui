'use client'

import { useTheme } from './use-theme'
import { Icon } from './icons'

export function ThemeToggle() {
  const [theme, toggle, mounted] = useTheme()

  return (
    <button
      type="button"
      className="theme-toggle"
      aria-label={mounted ? `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme` : 'Toggle theme'}
      onClick={toggle}
    >
      {mounted && theme === 'dark' ? <Icon.sun /> : <Icon.moon />}
    </button>
  )
}
