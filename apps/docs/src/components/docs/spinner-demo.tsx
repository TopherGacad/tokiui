'use client'

import { Spinner, Button } from '@tokiui/ui'

/* ================================================================
   1. BASIC
   ================================================================ */

export function SpinnerBasicPreview() {
  return <Spinner />
}

/* ================================================================
   2. SIZES
   ================================================================ */

export function SpinnerSizesPreview() {
  return (
    <div className="flex items-center gap-6">
      <Spinner size="sm" />
      <Spinner size="default" />
      <Spinner size="lg" />
      <Spinner size="xl" />
    </div>
  )
}

/* ================================================================
   3. COLORS
   ================================================================ */

export function SpinnerColorsPreview() {
  return (
    <div className="flex flex-wrap items-center gap-6">
      <Spinner color="default" />
      <Spinner color="neutral" />
      <Spinner color="green" />
      <Spinner color="amber" />
      <Spinner color="sky" />
      <Spinner color="red" />
      <span
        className="flex items-center justify-center rounded-md p-2"
        style={{ background: 'oklch(0.18 0.005 95)' }}
      >
        <Spinner color="white" />
      </span>
    </div>
  )
}

/* ================================================================
   4. VARIANTS
   ================================================================ */

export function SpinnerVariantsPreview() {
  const variants = ['arc', 'ring', 'dots', 'bars'] as const
  return (
    <div className="flex flex-wrap items-center gap-10">
      {variants.map((v) => (
        <div key={v} className="flex flex-col items-center gap-3">
          <Spinner variant={v} size="lg" />
          <span className="text-xs font-mono text-muted-foreground">{v}</span>
        </div>
      ))}
    </div>
  )
}

/* ================================================================
   5. INLINE WITH TEXT
   ================================================================ */

export function SpinnerInlinePreview() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Spinner size="sm" color="current" />
        <span>Loading data…</span>
      </div>
      <div className="flex items-center gap-2 text-sm font-medium">
        <Spinner size="sm" color="current" />
        <span>Saving changes…</span>
      </div>
    </div>
  )
}

/* ================================================================
   6. INSIDE A BUTTON (manual pattern)
   ================================================================ */

export function SpinnerInButtonPreview() {
  return (
    <div className="flex flex-wrap gap-3">
      <button
        disabled
        className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground opacity-80 cursor-not-allowed"
      >
        <Spinner size="sm" color="current" />
        Saving…
      </button>
      <button
        disabled
        className="inline-flex items-center gap-2 rounded-md border px-4 py-2 text-sm font-medium cursor-not-allowed opacity-70"
      >
        <Spinner size="sm" color="current" />
        Loading
      </button>
    </div>
  )
}

/* ================================================================
   7. SECTION LOADING
   ================================================================ */

export function SpinnerSectionPreview() {
  return (
    <div className="flex items-center justify-center rounded-lg border" style={{ height: 120, width: '100%', maxWidth: 400 }}>
      <div className="flex flex-col items-center gap-3">
        <Spinner size="lg" />
        <p className="text-sm text-muted-foreground">Loading content…</p>
      </div>
    </div>
  )
}

/* ================================================================
   8. CARD OVERLAY  (real-world usage)
   ================================================================ */

export function SpinnerCardOverlayPreview() {
  return (
    <div className="relative w-72 rounded-xl border bg-card dark:border-white/10 dark:bg-[oklch(0.26_0.005_95)] p-5 shadow-sm">
      <div className="pointer-events-none select-none space-y-3 opacity-25">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-muted dark:bg-[oklch(0.38_0.007_95)]" />
          <div className="flex-1 space-y-1.5">
            <div className="h-3 w-28 rounded bg-muted dark:bg-[oklch(0.38_0.007_95)]" />
            <div className="h-2.5 w-20 rounded bg-muted dark:bg-[oklch(0.38_0.007_95)]" />
          </div>
        </div>
        <div className="h-px bg-border" />
        <div className="space-y-2 pt-1">
          <div className="h-2.5 w-full rounded bg-muted dark:bg-[oklch(0.38_0.007_95)]" />
          <div className="h-2.5 w-4/5 rounded bg-muted dark:bg-[oklch(0.38_0.007_95)]" />
          <div className="h-2.5 w-3/5 rounded bg-muted dark:bg-[oklch(0.38_0.007_95)]" />
        </div>
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2.5 rounded-xl bg-background/70 backdrop-blur-[2px]">
        <Spinner size="lg" />
        <p className="text-sm text-muted-foreground">Loading profile…</p>
      </div>
    </div>
  )
}

/* ================================================================
   9. PAGE LOADER  (real-world usage)
   ================================================================ */

export function SpinnerPageLoaderPreview() {
  return (
    <div className="relative h-44 w-full overflow-hidden rounded-xl border dark:border-white/10 bg-background dark:bg-[oklch(0.24_0.005_95)]">
      <div className="pointer-events-none select-none p-5 opacity-20">
        <div className="mb-4 h-5 w-40 rounded bg-muted dark:bg-[oklch(0.42_0.007_95)]" />
        <div className="space-y-2">
          <div className="h-3 w-full rounded bg-muted dark:bg-[oklch(0.42_0.007_95)]" />
          <div className="h-3 w-11/12 rounded bg-muted dark:bg-[oklch(0.42_0.007_95)]" />
          <div className="h-3 w-4/5 rounded bg-muted dark:bg-[oklch(0.42_0.007_95)]" />
        </div>
        <div className="mt-5 flex gap-2">
          <div className="h-9 w-24 rounded-md bg-muted dark:bg-[oklch(0.42_0.007_95)]" />
          <div className="h-9 w-24 rounded-md bg-muted dark:bg-[oklch(0.42_0.007_95)]" />
        </div>
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-background/80 dark:bg-[oklch(0.24_0.005_95)]/80 backdrop-blur-sm">
        <Spinner size="xl" />
        <p className="text-sm font-medium">Loading page…</p>
      </div>
    </div>
  )
}

/* ================================================================
   10. TYPING INDICATOR  (real-world usage — dots variant in context)
   ================================================================ */

export function SpinnerTypingPreview() {
  return (
    <div className="flex w-72 flex-col gap-3 p-2">
      <div className="self-end max-w-[80%] rounded-2xl rounded-tr-sm bg-primary px-3.5 py-2 text-sm text-primary-foreground">
        Hey, when does the event start?
      </div>
      <div className="flex max-w-[80%] items-end gap-2">
        <div className="h-7 w-7 flex-shrink-0 rounded-full bg-muted dark:bg-[oklch(0.38_0.007_95)] ring-1 ring-black/5 dark:ring-white/15" />
        <div className="rounded-2xl rounded-tl-sm border dark:border-white/15 bg-card dark:bg-[oklch(0.30_0.006_95)] px-3.5 py-2.5">
          <Spinner variant="dots" size="sm" color="neutral" />
        </div>
      </div>
    </div>
  )
}

/* ================================================================
   11. FORM SUBMIT STATE  (real-world usage)
   ================================================================ */

export function SpinnerFormSubmitPreview() {
  return (
    <div className="w-full max-w-sm space-y-4 rounded-xl border dark:border-white/10 bg-card dark:bg-[oklch(0.26_0.005_95)] p-5">
      <div className="space-y-3">
        <div>
          <p className="mb-1 text-sm font-medium">Email</p>
          <div className="flex h-9 items-center rounded-md border dark:border-white/10 bg-muted/50 dark:bg-[oklch(0.32_0.006_95)] px-3 text-sm text-muted-foreground">
            user@example.com
          </div>
        </div>
        <div>
          <p className="mb-1 text-sm font-medium">Message</p>
          <div className="flex h-16 items-start rounded-md border dark:border-white/10 bg-muted/50 dark:bg-[oklch(0.32_0.006_95)] px-3 py-2 text-sm text-muted-foreground">
            Hello, I wanted to ask…
          </div>
        </div>
      </div>
      <Button loading className="w-full">Sending message…</Button>
    </div>
  )
}
