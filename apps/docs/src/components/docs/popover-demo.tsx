'use client'

import { useState } from 'react'
import {
  Popover, PopoverTrigger, PopoverContent,
  Button,
} from '@tokiui/ui'

/* ----- Shared input style ----- */
const inputStyle: React.CSSProperties = {
  height: 34, padding: '0 10px', borderRadius: 'var(--radius-sm)',
  border: '1px solid var(--border)', background: 'var(--input)',
  color: 'var(--foreground)', fontSize: 13, outline: 'none',
  fontFamily: 'inherit', width: '100%', boxSizing: 'border-box',
}

/* ================================================================
   1. BASIC
   ================================================================ */

export function PopoverBasicPreview() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Open popover</Button>
      </PopoverTrigger>
      <PopoverContent>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--foreground)' }}>Dimensions</p>
          <p style={{ fontSize: 13, color: 'var(--muted-foreground)', lineHeight: 1.5 }}>
            Set the dimensions for the layer. This will affect how it appears on all breakpoints.
          </p>
        </div>
      </PopoverContent>
    </Popover>
  )
}

/* ================================================================
   2. FORM IN POPOVER
   ================================================================ */

export function PopoverFormPreview() {
  const [open, setOpen] = useState(false)
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline">Rename</Button>
      </PopoverTrigger>
      <PopoverContent style={{ width: 260 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--foreground)', marginBottom: 2 }}>
            Rename file
          </p>
          <div style={{ display: 'grid', gap: 5 }}>
            <label style={{ fontSize: 12, fontWeight: 500, color: 'var(--foreground)' }} htmlFor="pop-name">Name</label>
            <input id="pop-name" defaultValue="components.tsx" style={inputStyle}
              onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--ring)')}
              onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
            />
          </div>
          <Button style={{ width: '100%' }} onClick={() => setOpen(false)}>Rename</Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}

/* ================================================================
   3. COLOR PICKER
   ================================================================ */

const COLORS = [
  '#ef4444','#f97316','#eab308','#22c55e',
  '#06b6d4','#3b82f6','#8b5cf6','#ec4899',
  '#64748b','#1e293b','#ffffff','#000000',
]

export function PopoverColorPickerPreview() {
  const [color, setColor] = useState('#3b82f6')
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" color="neutral">
          <span style={{
            display: 'inline-block', width: 14, height: 14,
            borderRadius: 3, background: color,
            border: '1px solid var(--border)', flexShrink: 0,
          }} />
          Pick color
        </Button>
      </PopoverTrigger>
      <PopoverContent style={{ width: 'auto' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <p style={{ fontSize: 12, fontWeight: 500, color: 'var(--muted-foreground)' }}>Color</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 6 }}>
            {COLORS.map((c) => (
              <button
                key={c}
                title={c}
                onClick={() => setColor(c)}
                style={{
                  width: 24, height: 24, borderRadius: 4,
                  background: c, cursor: 'pointer', padding: 0,
                  border: color === c ? '2px solid var(--ring)' : '1px solid var(--border)',
                  outline: 'none',
                }}
              />
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{
              display: 'inline-block', width: 20, height: 20,
              borderRadius: 3, background: color, border: '1px solid var(--border)', flexShrink: 0,
            }} />
            <span style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: 'var(--foreground)' }}>{color}</span>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

/* ================================================================
   4. OPTION LIST (CHECKLIST)
   ================================================================ */

const COLUMNS = ['Status', 'Priority', 'Assignee', 'Due date', 'Labels', 'Estimate']

export function PopoverChecklistPreview() {
  const [visible, setVisible] = useState<string[]>(['Status', 'Priority', 'Assignee'])

  function toggle(col: string) {
    setVisible((v) => v.includes(col) ? v.filter((c) => c !== col) : [...v, col])
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" color="neutral">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
          Columns
        </Button>
      </PopoverTrigger>
      <PopoverContent style={{ width: 200, padding: '8px 0' }}>
        <p style={{ fontSize: 11, fontWeight: 600, color: 'var(--muted-foreground)', padding: '4px 12px 8px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          Toggle columns
        </p>
        {COLUMNS.map((col) => {
          const checked = visible.includes(col)
          return (
            <button
              key={col}
              onClick={() => toggle(col)}
              style={{
                display: 'flex', alignItems: 'center', gap: 8,
                width: '100%', padding: '6px 12px',
                background: 'transparent', border: 'none',
                cursor: 'pointer', fontFamily: 'inherit',
                fontSize: 13, color: 'var(--foreground)', textAlign: 'left',
                transition: 'background 0.1s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--muted)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
            >
              <span style={{
                width: 15, height: 15, borderRadius: 3, flexShrink: 0,
                border: `1.5px solid ${checked ? 'var(--primary)' : 'var(--border)'}`,
                background: checked ? 'var(--primary)' : 'transparent',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {checked && (
                  <svg width="9" height="9" viewBox="0 0 12 12" fill="none" stroke="var(--primary-foreground)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="2,6 5,9 10,3" />
                  </svg>
                )}
              </span>
              {col}
            </button>
          )
        })}
      </PopoverContent>
    </Popover>
  )
}

/* ================================================================
   5. POSITIONING
   ================================================================ */

export function PopoverSidesPreview() {
  const sides = ['top', 'right', 'bottom', 'left'] as const
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, auto)', gap: 8, justifyContent: 'center' }}>
      {sides.map((side) => (
        <Popover key={side}>
          <PopoverTrigger asChild>
            <Button variant="outline" color="neutral" style={{ width: 110, fontSize: 13 }}>
              {side.charAt(0).toUpperCase() + side.slice(1)}
            </Button>
          </PopoverTrigger>
          <PopoverContent side={side} style={{ padding: '8px 12px' }}>
            <p style={{ fontSize: 13, color: 'var(--foreground)' }}>Opens on {side}</p>
          </PopoverContent>
        </Popover>
      ))}
    </div>
  )
}

/* ================================================================
   6. NOTIFICATION SETTINGS
   ================================================================ */

type SortSetting = 'newest' | 'oldest' | 'alpha'

export function PopoverSettingsPreview() {
  const [setting, setSetting] = useState<SortSetting>('newest')

  const options: { value: SortSetting; label: string; desc: string }[] = [
    { value: 'newest', label: 'Newest first',  desc: 'Most recently created at the top' },
    { value: 'oldest', label: 'Oldest first',  desc: 'Earliest created at the top'      },
    { value: 'alpha',  label: 'Alphabetical',  desc: 'A–Z by name'                      },
  ]

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" color="neutral">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="3" y1="6" x2="21" y2="6"/><line x1="6" y1="12" x2="18" y2="12"/><line x1="9" y1="18" x2="15" y2="18"/></svg>
          Sort
        </Button>
      </PopoverTrigger>
      <PopoverContent style={{ width: 260, padding: '8px 0' }}>
        <p style={{ fontSize: 11, fontWeight: 600, color: 'var(--muted-foreground)', padding: '4px 12px 8px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          Sort by
        </p>
        {options.map((opt) => (
          <button
            key={opt.value}
            onClick={() => setSetting(opt.value)}
            style={{
              display: 'flex', alignItems: 'flex-start', gap: 10,
              width: '100%', padding: '8px 12px',
              background: setting === opt.value ? 'var(--muted)' : 'transparent',
              border: 'none', cursor: 'pointer',
              fontFamily: 'inherit', textAlign: 'left',
              transition: 'background 0.1s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--muted)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = setting === opt.value ? 'var(--muted)' : 'transparent')}
          >
            <span style={{
              width: 16, height: 16, borderRadius: '50%', flexShrink: 0, marginTop: 1,
              border: `1.5px solid ${setting === opt.value ? 'var(--primary)' : 'var(--border)'}`,
              background: setting === opt.value ? 'var(--primary)' : 'transparent',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              {setting === opt.value && (
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--primary-foreground)' }} />
              )}
            </span>
            <span>
              <span style={{ display: 'block', fontSize: 13, fontWeight: 500, color: 'var(--foreground)' }}>{opt.label}</span>
              <span style={{ display: 'block', fontSize: 12, color: 'var(--muted-foreground)', marginTop: 1 }}>{opt.desc}</span>
            </span>
          </button>
        ))}
      </PopoverContent>
    </Popover>
  )
}
