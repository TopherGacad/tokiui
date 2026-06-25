'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, cn } from '@tokiui/ui'
import { CopyButton } from '@/components/docs/copy-button'
import type { FrameFile } from '@/lib/get-frame-source'

const BackIcon = () => (
  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m15 18-6-6 6-6" /></svg>
)
const CodeIcon = () => (
  <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m16 18 6-6-6-6M8 6l-6 6 6 6" /></svg>
)
const FileIcon = () => (
  <svg className="size-3.5 shrink-0 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6" /></svg>
)

export function FrameChrome({ title, files }: { title: string; files: FrameFile[] }) {
  const pathname = usePathname()
  const [standalone, setStandalone] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(0)

  useEffect(() => {
    setStandalone(window.self === window.top)
  }, [])

  // Group files by directory for the tree.
  const groups = useMemo(() => {
    const out: { dir: string; items: { label: string; idx: number }[] }[] = []
    files.forEach((f, idx) => {
      let g = out.find((x) => x.dir === f.dir)
      if (!g) { g = { dir: f.dir, items: [] }; out.push(g) }
      g.items.push({ label: f.label, idx })
    })
    return out
  }, [files])

  // Hidden inside the gallery preview iframe and on the gallery page itself.
  if (!standalone || pathname === '/frames') return null

  const file = files[active]
  const pill = 'inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-sm font-medium no-underline transition-colors'

  return (
    <>
      <div className="fixed bottom-6 left-1/2 z-40 flex -translate-x-1/2 items-center gap-0.5 rounded-full border border-border bg-[color-mix(in_oklch,var(--card)_92%,transparent)] p-1 shadow-lg backdrop-blur">
        <Link href="/frames" aria-label="Back to all frames" className={cn(pill, 'text-foreground hover:bg-muted')}>
          <BackIcon /> Frames
        </Link>
        <span className="h-5 w-px bg-border" />
        <button type="button" onClick={() => setOpen(true)} className={cn(pill, 'text-foreground hover:bg-muted')}>
          <CodeIcon /> View code
        </button>
      </div>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="right" size="xl" className="flex w-full flex-col gap-0 p-0 sm:max-w-3xl">
          <SheetHeader>
            <SheetTitle>{title}</SheetTitle>
            <SheetDescription>Copy these files into your project — built with @tokiui/ui.</SheetDescription>
          </SheetHeader>

          <div className="flex min-h-0 flex-1">
            {/* File tree */}
            <aside className="w-48 shrink-0 overflow-y-auto border-r border-border p-2 sm:w-56">
              {groups.map((g) => (
                <div key={g.dir} className="mb-3">
                  <p className="truncate px-2 pb-1 font-mono text-[10px] uppercase tracking-wide text-muted-foreground">{g.dir}</p>
                  {g.items.map((it) => (
                    <button
                      key={it.idx}
                      type="button"
                      onClick={() => setActive(it.idx)}
                      className={cn(
                        'flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-[13px] transition-colors',
                        active === it.idx ? 'bg-muted font-medium text-foreground' : 'text-muted-foreground hover:bg-muted/60 hover:text-foreground',
                      )}
                    >
                      <FileIcon /> <span className="truncate">{it.label}</span>
                    </button>
                  ))}
                </div>
              ))}
            </aside>

            {/* Code */}
            <div className="relative min-w-0 flex-1 overflow-auto bg-card">
              <CopyButton
                text={file.raw}
                className="absolute right-3 top-3 z-10 inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-2.5 py-1.5 font-mono text-[11px] text-muted-foreground shadow-sm transition-colors hover:text-foreground"
              />
              <div className="frame-code" dangerouslySetInnerHTML={{ __html: file.html }} />
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}
