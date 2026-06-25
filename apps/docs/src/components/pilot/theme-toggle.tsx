'use client'

// PILOT: bespoke `.theme-toggle` <button> → tokiui <Button size="icon">.
// 2c FIXED: now uses the LIBRARY useTheme with the new opt-in `{ transition: true }`
// crossfade — no longer the docs' private hook. The sun/moon spans keep their global
// animation classes (they key off [data-theme]).
import { Button } from '@tokiui/ui'
import { useTheme } from '@tokiui/ui/client'
import { Icon } from '../site/icons'

export function ThemeToggle() {
  const [, toggle] = useTheme({ transition: true })

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Toggle theme"
      onClick={toggle}
      // overrides to match .theme-toggle: 34×34, radius-sm, bordered, transparent, no shadow/scale
      className="relative h-[34px] w-[34px] overflow-hidden rounded-[var(--radius-sm)] border border-border bg-transparent text-muted-foreground shadow-none active:scale-100 hover:bg-muted hover:text-foreground hover:border-[var(--border-strong)]"
    >
      <span className="theme-toggle__sun" aria-hidden="true"><Icon.sun /></span>
      <span className="theme-toggle__moon" aria-hidden="true"><Icon.moon /></span>
    </Button>
  )
}
