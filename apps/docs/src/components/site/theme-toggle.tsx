'use client'

import { useTheme } from './use-theme'
import { Icon } from './icons'

export function ThemeToggle() {
  const [, toggle] = useTheme()

  return (
    <button
      type="button"
      className="theme-toggle"
      aria-label="Toggle theme"
      onClick={toggle}
    >
      <span className="theme-toggle__sun" aria-hidden="true"><Icon.sun /></span>
      <span className="theme-toggle__moon" aria-hidden="true"><Icon.moon /></span>
    </button>
  )
}
