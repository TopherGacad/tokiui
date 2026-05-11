'use client'

import { useState } from 'react'
import { Switch } from '@tokiui/ui'

/* ----- Shared row wrapper ----- */
function SwitchRow({
  id, label, description, disabled, defaultChecked, checked, onCheckedChange,
}: {
  id: string
  label: string
  description?: string
  disabled?: boolean
  defaultChecked?: boolean
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
}) {
  return (
    <div style={{ display: 'flex', alignItems: description ? 'flex-start' : 'center', justifyContent: 'space-between', gap: 16 }}>
      <div>
        <label
          htmlFor={id}
          style={{
            fontSize: 14, fontWeight: 500, color: 'var(--foreground)',
            cursor: disabled ? 'not-allowed' : 'pointer',
            opacity: disabled ? 0.5 : 1, lineHeight: 1.4, display: 'block',
          }}
        >
          {label}
        </label>
        {description && (
          <p style={{ fontSize: 13, color: 'var(--muted-foreground)', margin: 0, lineHeight: 1.5, marginTop: 1 }}>
            {description}
          </p>
        )}
      </div>
      <Switch
        id={id}
        disabled={disabled}
        defaultChecked={defaultChecked}
        checked={checked}
        onCheckedChange={onCheckedChange}
        style={{ marginTop: description ? 2 : 0 }}
      />
    </div>
  )
}

/* ================================================================
   1. WITH LABEL
   ================================================================ */

export function SwitchWithLabelPreview() {
  return (
    <div style={{ width: '100%', maxWidth: 320 }}>
      <SwitchRow id="airplane" label="Airplane mode" />
    </div>
  )
}

/* ================================================================
   2. WITH DESCRIPTION
   ================================================================ */

export function SwitchDescriptionPreview() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '100%', maxWidth: 360 }}>
      <SwitchRow
        id="sw-notifications"
        label="Push notifications"
        description="Receive alerts for messages and activity."
        defaultChecked
      />
      <SwitchRow
        id="sw-marketing"
        label="Marketing emails"
        description="Occasional emails about new features and offers."
      />
      <SwitchRow
        id="sw-analytics"
        label="Usage analytics"
        description="Help us improve by sharing anonymous usage data."
        defaultChecked
      />
    </div>
  )
}

/* ================================================================
   3. DISABLED
   ================================================================ */

export function SwitchDisabledPreview() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%', maxWidth: 320 }}>
      <SwitchRow id="sw-dis-off" label="Disabled off" disabled />
      <SwitchRow id="sw-dis-on"  label="Disabled on"  disabled defaultChecked />
    </div>
  )
}

/* ================================================================
   4. CONTROLLED
   ================================================================ */

export function SwitchControlledPreview() {
  const [enabled, setEnabled] = useState(false)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start', width: '100%', maxWidth: 320 }}>
      <SwitchRow
        id="sw-controlled"
        label="Enable feature flag"
        checked={enabled}
        onCheckedChange={setEnabled}
      />
      <p style={{ fontSize: 13, color: 'var(--muted-foreground)', margin: 0 }}>
        State:{' '}
        <code style={{ fontFamily: 'var(--font-mono)', fontSize: 12, background: 'var(--muted)', padding: '1px 6px', borderRadius: 4 }}>
          {String(enabled)}
        </code>
      </p>
    </div>
  )
}

/* ================================================================
   5. SETTINGS PANEL
   ================================================================ */

/* ================================================================
   6. WITH ICONS
   ================================================================ */

const SunIcon = ({ size = 12 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
  </svg>
)

const MoonIcon = ({ size = 12 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
)

export function SwitchIconsPreview() {
  const [outside, setOutside] = useState(false)
  const [inside, setInside] = useState(false)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '100%', maxWidth: 320 }}>
      {/* Icons outside — sun/moon on each side */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <label htmlFor="sw-outside" style={{ fontSize: 14, fontWeight: 500, color: 'var(--foreground)' }}>
          Appearance
        </label>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ color: !outside ? 'var(--foreground)' : 'var(--muted-foreground)', transition: 'color 0.2s' }}>
            <SunIcon />
          </span>
          <Switch id="sw-outside" checked={outside} onCheckedChange={setOutside} />
          <span style={{ color: outside ? 'var(--foreground)' : 'var(--muted-foreground)', transition: 'color 0.2s' }}>
            <MoonIcon />
          </span>
        </div>
      </div>

      {/* Icons inside thumb */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <label htmlFor="sw-inside" style={{ fontSize: 14, fontWeight: 500, color: 'var(--foreground)', cursor: 'pointer' }}>
          Appearance
        </label>
        <Switch
          id="sw-inside"
          size="lg"
          checked={inside}
          onCheckedChange={setInside}
          uncheckedIcon={<span style={{ color: 'oklch(0.72 0.18 75)' }}><SunIcon size={11} /></span>}
          checkedIcon={<span style={{ color: 'oklch(0.55 0.14 265)' }}><MoonIcon size={11} /></span>}
        />
      </div>
    </div>
  )
}

/* ================================================================
   8. SIZES
   ================================================================ */

export function SwitchSizesPreview() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {(['sm', 'default', 'lg'] as const).map((size) => (
        <div key={size} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Switch size={size} defaultChecked />
          <span style={{ fontSize: 13, color: 'var(--muted-foreground)', fontFamily: 'var(--font-mono)' }}>
            {size}
          </span>
        </div>
      ))}
    </div>
  )
}

/* ================================================================
   8. CUSTOM COLOR
   ================================================================ */

const COLOR_VARIANTS = [
  {
    label: 'Success',
    id: 'sw-success',
    className: 'data-[state=checked]:bg-[oklch(0.65_0.19_145)]',
    defaultChecked: true,
  },
  {
    label: 'Warning',
    id: 'sw-warning',
    className: 'data-[state=checked]:bg-[oklch(0.72_0.18_75)]',
    defaultChecked: true,
  },
  {
    label: 'Danger',
    id: 'sw-danger',
    className: 'data-[state=checked]:bg-[oklch(0.63_0.22_29)]',
    defaultChecked: true,
  },
  {
    label: 'Rose',
    id: 'sw-rose',
    className: 'data-[state=checked]:bg-[oklch(0.65_0.21_10)]',
    defaultChecked: true,
  },
]

export function SwitchCustomColorPreview() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {COLOR_VARIANTS.map((v) => (
        <div key={v.id} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Switch
            id={v.id}
            className={v.className}
            defaultChecked={v.defaultChecked}
          />
          <label
            htmlFor={v.id}
            style={{ fontSize: 14, fontWeight: 500, color: 'var(--foreground)', cursor: 'pointer' }}
          >
            {v.label}
          </label>
        </div>
      ))}
    </div>
  )
}

/* ================================================================
   9. SETTINGS PANEL
   ================================================================ */

const SETTINGS = [
  { id: 'set-collab',     label: 'Live collaboration',   description: 'See teammates\' cursors and edits in real time.',    defaultChecked: true  },
  { id: 'set-suggest',   label: 'Smart suggestions',    description: 'Get AI-powered suggestions while editing.',           defaultChecked: true  },
  { id: 'set-receipts',  label: 'Read receipts',        description: 'Show when others have read your messages.',           defaultChecked: false },
  { id: 'set-previews',  label: 'Rich link previews',   description: 'Unfurl URLs into rich cards in comments.',            defaultChecked: false },
]

export function SwitchSettingsPreview() {
  return (
    <div
      style={{
        width: '100%', maxWidth: 400,
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius)',
        overflow: 'hidden',
      }}
    >
      {SETTINGS.map((s, i) => (
        <div
          key={s.id}
          style={{
            padding: '14px 16px',
            borderBottom: i < SETTINGS.length - 1 ? '1px solid var(--border)' : undefined,
            background: 'var(--background)',
          }}
        >
          <SwitchRow
            id={s.id}
            label={s.label}
            description={s.description}
            defaultChecked={s.defaultChecked}
          />
        </div>
      ))}
    </div>
  )
}
