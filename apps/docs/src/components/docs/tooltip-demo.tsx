'use client'

import {
  Tooltip, TooltipTrigger, TooltipContent,
  Button,
} from '@tokiui/ui'

/* ================================================================
   1. BASIC
   ================================================================ */

export function TooltipBasicPreview() {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">Hover me</Button>
      </TooltipTrigger>
      <TooltipContent>Quick action</TooltipContent>
    </Tooltip>
  )
}

/* ================================================================
   2. ICON BUTTONS
   ================================================================ */

function IconBtn({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="ghost" color="neutral" size="icon" aria-label={label}>
          {children}
        </Button>
      </TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  )
}

export function TooltipIconPreview() {
  return (
    <div style={{ display: 'flex', gap: 4 }}>
      <IconBtn label="Bold">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"/><path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"/></svg>
      </IconBtn>
      <IconBtn label="Italic">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="19" y1="4" x2="10" y2="4"/><line x1="14" y1="20" x2="5" y2="20"/><line x1="15" y1="4" x2="9" y2="20"/></svg>
      </IconBtn>
      <IconBtn label="Underline">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6 4v6a6 6 0 0 0 12 0V4"/><line x1="4" y1="20" x2="20" y2="20"/></svg>
      </IconBtn>
      <IconBtn label="Link">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
      </IconBtn>
    </div>
  )
}

/* ================================================================
   3. SIDES
   ================================================================ */

export function TooltipSidesPreview() {
  const sides = ['top', 'right', 'bottom', 'left'] as const
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, auto)', gap: 8, justifyContent: 'center' }}>
      {sides.map((side) => (
        <Tooltip key={side}>
          <TooltipTrigger asChild>
            <Button variant="outline" color="neutral" style={{ width: 110, fontSize: 13 }}>
              {side.charAt(0).toUpperCase() + side.slice(1)}
            </Button>
          </TooltipTrigger>
          <TooltipContent side={side}>Tooltip on {side}</TooltipContent>
        </Tooltip>
      ))}
    </div>
  )
}

/* ================================================================
   4. DELAY
   ================================================================ */

export function TooltipDelayPreview() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <Button variant="outline" color="neutral">Instant</Button>
        </TooltipTrigger>
        <TooltipContent>No delay (0ms)</TooltipContent>
      </Tooltip>
      <Tooltip delayDuration={500}>
        <TooltipTrigger asChild>
          <Button variant="outline" color="neutral">Default</Button>
        </TooltipTrigger>
        <TooltipContent>Default delay (500ms)</TooltipContent>
      </Tooltip>
      <Tooltip delayDuration={1200}>
        <TooltipTrigger asChild>
          <Button variant="outline" color="neutral">Slow</Button>
        </TooltipTrigger>
        <TooltipContent>Slow delay (1200ms)</TooltipContent>
      </Tooltip>
    </div>
  )
}

/* ================================================================
   5. RICH CONTENT
   ================================================================ */

export function TooltipRichPreview() {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
          Learn more
        </Button>
      </TooltipTrigger>
      <TooltipContent style={{ maxWidth: 220, lineHeight: 1.5 }}>
        <p style={{ fontWeight: 600, marginBottom: 3 }}>Keyboard shortcut</p>
        <p>Press <kbd style={{ fontFamily: 'var(--font-mono)', fontSize: 11, background: 'rgba(255,255,255,0.15)', padding: '1px 4px', borderRadius: 3 }}>⌘K</kbd> to open the command palette from anywhere.</p>
      </TooltipContent>
    </Tooltip>
  )
}

/* ================================================================
   6. DISABLED ELEMENT
   ================================================================ */

export function TooltipDisabledPreview() {
  return (
    <Tooltip>
      {/* Wrap disabled button in a span — disabled elements don't fire pointer events */}
      <TooltipTrigger asChild>
        <span tabIndex={0} style={{ display: 'inline-block', cursor: 'not-allowed' }}>
          <Button disabled style={{ pointerEvents: 'none' }}>
            Publish
          </Button>
        </span>
      </TooltipTrigger>
      <TooltipContent>You need editor permissions to publish.</TooltipContent>
    </Tooltip>
  )
}
