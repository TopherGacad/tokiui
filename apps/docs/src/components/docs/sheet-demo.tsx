'use client'

import { useState } from 'react'
import {
  Sheet, SheetTrigger, SheetClose, SheetContent,
  SheetHeader, SheetFooter, SheetTitle, SheetDescription, SheetBody,
} from '@tokiui/ui'

/* ----- Shared trigger style ----- */
const triggerStyle: React.CSSProperties = {
  height: 36, padding: '0 14px', borderRadius: 8,
  border: '1px solid var(--border)', background: 'var(--background)',
  fontSize: 14, fontWeight: 500, color: 'var(--foreground)', cursor: 'pointer',
}

const actionStyle: React.CSSProperties = {
  height: 36, padding: '0 16px', borderRadius: 8, border: 'none',
  fontSize: 14, fontWeight: 500, cursor: 'pointer',
}

/* ================================================================
   1. SIDES
   ================================================================ */

export function SheetSidesPreview() {
  const sides = ['top', 'right', 'bottom', 'left'] as const
  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      {sides.map((side) => (
        <Sheet key={side}>
          <SheetTrigger style={triggerStyle}>{side}</SheetTrigger>
          <SheetContent side={side}>
            <SheetHeader>
              <SheetTitle>Sheet — {side}</SheetTitle>
              <SheetDescription>Opens from the {side} edge of the screen.</SheetDescription>
            </SheetHeader>
            <SheetBody>
              <p style={{ fontSize: 14, color: 'var(--muted-foreground)', margin: 0 }}>
                Add your content here. The sheet scrolls when its content overflows.
              </p>
            </SheetBody>
          </SheetContent>
        </Sheet>
      ))}
    </div>
  )
}

/* ================================================================
   2. EDIT FORM
   ================================================================ */

export function SheetFormPreview() {
  const [open, setOpen] = useState(false)

  const fields = [
    { id: 'sf-title',    label: 'Title',      type: 'text',  placeholder: 'Fix login redirect on mobile'  },
    { id: 'sf-assignee', label: 'Assignee',   type: 'text',  placeholder: 'sc, tl, mk…'                  },
    { id: 'sf-due',      label: 'Due date',   type: 'date',  placeholder: ''                              },
    { id: 'sf-priority', label: 'Priority',   type: 'text',  placeholder: 'Low, Medium, High, Critical'   },
  ]

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger style={triggerStyle}>New task</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>New task</SheetTitle>
          <SheetDescription>Add a task to the current sprint.</SheetDescription>
        </SheetHeader>
        <SheetBody>
          <div style={{ display: 'grid', gap: 16 }}>
            {fields.map((f) => (
              <div key={f.id} style={{ display: 'grid', gap: 6 }}>
                <label htmlFor={f.id} style={{ fontSize: 13, fontWeight: 500, color: 'var(--foreground)' }}>
                  {f.label}
                </label>
                <input
                  id={f.id}
                  type={f.type}
                  placeholder={f.placeholder}
                  style={{
                    height: 38, borderRadius: 8, border: '1px solid var(--input)',
                    background: 'var(--background)', padding: '0 12px',
                    fontSize: 14, color: 'var(--foreground)', outline: 'none', width: '100%',
                    boxSizing: 'border-box',
                  }}
                />
              </div>
            ))}
            <div style={{ display: 'grid', gap: 6 }}>
              <label htmlFor="sf-desc" style={{ fontSize: 13, fontWeight: 500, color: 'var(--foreground)' }}>Description</label>
              <textarea
                id="sf-desc"
                placeholder="What needs to be done, and why…"
                rows={3}
                style={{
                  borderRadius: 8, border: '1px solid var(--input)',
                  background: 'var(--background)', padding: '8px 12px',
                  fontSize: 14, color: 'var(--foreground)', outline: 'none',
                  width: '100%', boxSizing: 'border-box', resize: 'vertical', fontFamily: 'inherit',
                }}
              />
            </div>
          </div>
        </SheetBody>
        <SheetFooter>
          <SheetClose style={{ ...actionStyle, background: 'var(--muted)', color: 'var(--foreground)' }}>
            Cancel
          </SheetClose>
          <button
            style={{ ...actionStyle, background: 'var(--primary)', color: 'var(--primary-foreground)' }}
            onClick={() => setOpen(false)}
          >
            Create task
          </button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

/* ================================================================
   3. NAVIGATION
   ================================================================ */

const NAV_LINKS = [
  { label: 'Feed',      href: '#' },
  { label: 'Explore',   href: '#' },
  { label: 'Releases',  href: '#' },
  { label: 'Roadmap',   href: '#' },
  { label: 'Docs',      href: '#' },
]

const MenuIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
  </svg>
)

export function SheetNavigationPreview() {
  return (
    <Sheet>
      <SheetTrigger style={{ ...triggerStyle, display: 'flex', alignItems: 'center', gap: 8 }}>
        <MenuIcon /> Menu
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Navigation</SheetTitle>
        </SheetHeader>
        <SheetBody>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                style={{
                  padding: '9px 12px', borderRadius: 8, fontSize: 14,
                  fontWeight: 500, color: 'var(--foreground)',
                  textDecoration: 'none', display: 'block',
                  transition: 'background 0.15s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--muted)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </SheetBody>
        <SheetFooter style={{ justifyContent: 'flex-start' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 32, height: 32, borderRadius: '50%', background: 'var(--primary)',
              color: 'var(--primary-foreground)', display: 'flex', alignItems: 'center',
              justifyContent: 'center', fontSize: 12, fontWeight: 700, flexShrink: 0,
            }}>SC</div>
            <div>
              <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--foreground)', margin: 0 }}>sc</p>
              <p style={{ fontSize: 11, color: 'var(--muted-foreground)', margin: 0 }}>sc@company.com</p>
            </div>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

/* ================================================================
   4. BOTTOM SHEET
   ================================================================ */

const ACTIONS = [
  { label: 'Share link',      color: 'var(--foreground)' },
  { label: 'Copy to clipboard', color: 'var(--foreground)' },
  { label: 'Download',        color: 'var(--foreground)' },
  { label: 'Delete',          color: 'var(--destructive)' },
]

export function SheetBottomPreview() {
  const [open, setOpen] = useState(false)
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger style={triggerStyle}>More actions</SheetTrigger>
      <SheetContent side="bottom">
        <SheetHeader>
          <SheetTitle>File options</SheetTitle>
          <SheetDescription>Choose an action for this file.</SheetDescription>
        </SheetHeader>
        <SheetBody style={{ paddingTop: 8, paddingBottom: 8 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {ACTIONS.map((action) => (
              <button
                key={action.label}
                onClick={() => setOpen(false)}
                style={{
                  padding: '11px 12px', borderRadius: 8, textAlign: 'left',
                  background: 'none', border: 'none', cursor: 'pointer',
                  fontSize: 14, fontWeight: 500, color: action.color, width: '100%',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--muted)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'none')}
              >
                {action.label}
              </button>
            ))}
          </div>
        </SheetBody>
      </SheetContent>
    </Sheet>
  )
}
