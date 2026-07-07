'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
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
  <svg className="size-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6" /></svg>
)

const copyBtn = 'inline-flex shrink-0 items-center gap-1.5 rounded-md border border-border bg-card px-2.5 py-1.5 font-mono text-[11px] text-muted-foreground transition-colors hover:text-foreground'

export function FrameChrome({ title, files, deps = [], usage }: { title: string; files: FrameFile[]; deps?: string[]; usage?: string }) {
  const pathname = usePathname()
  const [standalone, setStandalone] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(0)

  useEffect(() => {
    setStandalone(window.self === window.top)
  }, [])

  // Hidden inside the gallery preview iframe and on the gallery page itself.
  if (!standalone || pathname === '/frames') return null

  const file = files[active]
  const cli = deps.length ? `npx tokiui add ${deps.join(' ')}` : ''
  const pill = 'inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-sm font-medium no-underline transition-colors text-foreground hover:bg-muted'

  return (
    <>
      <div className="fixed bottom-6 left-1/2 z-40 flex -translate-x-1/2 items-center gap-0.5 rounded-full border border-border bg-[color-mix(in_oklch,var(--card)_92%,transparent)] p-1 shadow-lg backdrop-blur">
        <Link href="/frames" aria-label="Back to all frames" className={pill}>
          <BackIcon /> Frames
        </Link>
        <span className="h-5 w-px bg-border" />
        <button type="button" onClick={() => setOpen(true)} className={pill}>
          <CodeIcon /> View code
        </button>
      </div>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="bottom" className="flex h-[88vh] flex-col gap-0 p-0">
          <SheetHeader className="pr-12">
            <SheetTitle>{title}</SheetTitle>
            <SheetDescription>Install it with the CLI, or copy the files into your project.</SheetDescription>
          </SheetHeader>

          {cli && (
            <div className="flex items-center gap-2 border-b border-border bg-muted/30 px-4 py-2.5">
              <span className="shrink-0 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">CLI</span>
              <code className="min-w-0 flex-1 overflow-x-auto whitespace-nowrap rounded-md border border-border bg-card px-2.5 py-1.5 font-mono text-xs text-foreground [scrollbar-width:none]">
                {cli}
              </code>
              <CopyButton text={cli} className={copyBtn} />
            </div>
          )}

          {usage && (
            <div className="border-b border-border px-4 py-2 text-[12px] leading-relaxed text-muted-foreground">
              {usage}
            </div>
          )}

          {/* Editor-style file tabs + active path + copy */}
          <div className="flex items-center gap-1 overflow-x-auto border-b border-border px-2 py-1.5">
            {files.map((f, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActive(i)}
                className={cn(
                  'flex shrink-0 items-center gap-1.5 rounded-md px-2.5 py-1.5 text-[13px] transition-colors',
                  active === i ? 'bg-muted font-medium text-foreground' : 'text-muted-foreground hover:bg-muted/60 hover:text-foreground',
                )}
              >
                <FileIcon /> {f.label}
              </button>
            ))}
            <span className="ml-auto hidden shrink-0 truncate pl-3 pr-1 font-mono text-[11px] text-muted-foreground md:inline">
              {file.dir}/{file.label}
            </span>
            <CopyButton text={file.raw} className={cn(copyBtn, 'ml-1')} />
          </div>

          {/* Code (the only scrolling region) */}
          <div className="min-h-0 flex-1 overflow-auto bg-card">
            <div className="frame-code" dangerouslySetInnerHTML={{ __html: file.html }} />
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}
