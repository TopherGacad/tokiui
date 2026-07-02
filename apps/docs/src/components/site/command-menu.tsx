'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button, Kbd, Dialog, DialogContent, DialogTitle, cn } from '@tokiui/ui'
import { flatNav } from '@/lib/docs-nav'
import { Icon } from './icons'

// Top-level pages that aren't in the docs nav.
const PAGES = [
  { label: 'Installation', href: '/docs/installation' },
  { label: 'Theming', href: '/docs/theming' },
  { label: 'Frames', href: '/frames' },
  { label: 'Playground', href: '/playground' },
  { label: 'Changelog', href: '/changelog' },
]

export function SiteSearch() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)

  // ⌘K / Ctrl+K toggles the palette.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen((o) => !o)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const items = useMemo(() => {
    const seen = new Set<string>()
    const all = [...PAGES, ...flatNav].filter((i) => (seen.has(i.href) ? false : seen.add(i.href)))
    const q = query.trim().toLowerCase()
    return q ? all.filter((i) => i.label.toLowerCase().includes(q)) : all
  }, [query])

  useEffect(() => setActive(0), [query])

  function go(href: string) {
    setOpen(false)
    setQuery('')
    router.push(href)
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActive((a) => Math.min(a + 1, items.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive((a) => Math.max(a - 1, 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (items[active]) go(items[active].href)
    }
  }

  return (
    <>
      <Button
        variant="outline"
        onClick={() => setOpen(true)}
        aria-label="Search components (⌘K)"
        className="h-[34px] min-w-[200px] justify-start gap-2 rounded-[var(--radius-sm)] border-border bg-muted px-3 text-[13px] font-normal text-muted-foreground shadow-none active:scale-100 hover:bg-muted hover:text-foreground hover:border-[var(--border-strong)]"
      >
        <Icon.search />
        <span className="flex-1 text-left">Search</span>
        <Kbd size="sm">⌘K</Kbd>
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="gap-0 overflow-hidden p-0 sm:max-w-lg">
          <DialogTitle className="sr-only">Search components and pages</DialogTitle>
          <div className="flex items-center gap-2.5 border-b border-border px-4 text-muted-foreground">
            <Icon.search />
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder="Search components and pages…"
              className="h-12 w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
            />
          </div>
          <div className="max-h-[min(60vh,20rem)] overflow-y-auto p-2">
            {items.length === 0 ? (
              <p className="px-3 py-8 text-center text-sm text-muted-foreground">No results for “{query}”.</p>
            ) : (
              items.map((it, i) => (
                <button
                  key={it.href}
                  type="button"
                  onClick={() => go(it.href)}
                  onMouseMove={() => setActive(i)}
                  className={cn(
                    'flex w-full items-center justify-between gap-3 rounded-md px-3 py-2 text-left text-sm transition-colors',
                    i === active ? 'bg-muted text-foreground' : 'text-muted-foreground',
                  )}
                >
                  <span>{it.label}</span>
                  <span className="shrink-0 font-mono text-[11px] opacity-50">{it.href}</span>
                </button>
              ))
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
