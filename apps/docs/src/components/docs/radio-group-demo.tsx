'use client'

import { useState } from 'react'
import { RadioGroup, RadioGroupItem } from '@tokiui/ui'

/* ----- Shared row wrapper ----- */
function RadioRow({
  id, value, label, description, disabled,
}: {
  id: string
  value: string
  label: string
  description?: string
  disabled?: boolean
}) {
  return (
    <div style={{ display: 'flex', gap: 10, alignItems: description ? 'flex-start' : 'center' }}>
      <RadioGroupItem
        id={id}
        value={value}
        disabled={disabled}
        style={{ marginTop: description ? 2 : 0 }}
      />
      <div>
        <label
          htmlFor={id}
          style={{
            fontSize: 14, fontWeight: 500, color: 'var(--foreground)',
            cursor: disabled ? 'not-allowed' : 'pointer',
            opacity: disabled ? 0.5 : 1, lineHeight: 1.4,
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
    </div>
  )
}

/* ================================================================
   1. WITH LABEL
   ================================================================ */

export function RadioGroupWithLabelPreview() {
  return (
    <RadioGroup defaultValue="free">
      <RadioRow id="plan-free"       value="free"       label="Free"       />
      <RadioRow id="plan-pro"        value="pro"        label="Pro"        />
      <RadioRow id="plan-enterprise" value="enterprise" label="Enterprise" />
    </RadioGroup>
  )
}

/* ================================================================
   2. WITH DESCRIPTION
   ================================================================ */

export function RadioGroupDescriptionPreview() {
  return (
    <RadioGroup defaultValue="kanban">
      <RadioRow
        id="view-table"
        value="table"
        label="Table"
        description="Rows and columns for structured, sortable data."
      />
      <RadioRow
        id="view-kanban"
        value="kanban"
        label="Kanban"
        description="Cards grouped by status for visual workflows."
      />
      <RadioRow
        id="view-timeline"
        value="timeline"
        label="Timeline"
        description="Tasks mapped across a date range."
      />
    </RadioGroup>
  )
}

/* ================================================================
   3. HORIZONTAL
   ================================================================ */

export function RadioGroupHorizontalPreview() {
  return (
    <RadioGroup defaultValue="system" style={{ display: 'flex', gap: 20 }}>
      {(['Light', 'Dark', 'System'] as const).map((theme) => (
        <div key={theme} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <RadioGroupItem id={`theme-${theme.toLowerCase()}`} value={theme.toLowerCase()} />
          <label
            htmlFor={`theme-${theme.toLowerCase()}`}
            style={{ fontSize: 14, fontWeight: 500, color: 'var(--foreground)', cursor: 'pointer' }}
          >
            {theme}
          </label>
        </div>
      ))}
    </RadioGroup>
  )
}

/* ================================================================
   4. DISABLED
   ================================================================ */

export function RadioGroupDisabledPreview() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Whole group disabled */}
      <RadioGroup defaultValue="monthly" disabled>
        <RadioRow id="dis-monthly" value="monthly" label="Monthly billing"  disabled />
        <RadioRow id="dis-annual"  value="annual"  label="Annual billing"   disabled />
      </RadioGroup>

      {/* Individual item disabled */}
      <RadioGroup defaultValue="card">
        <RadioRow id="pay-card"    value="card"    label="Credit card"   />
        <RadioRow id="pay-paypal"  value="paypal"  label="PayPal"        />
        <RadioRow id="pay-crypto"  value="crypto"  label="Crypto (coming soon)" disabled />
      </RadioGroup>
    </div>
  )
}

/* ================================================================
   5. CARD STYLE
   ================================================================ */

const PLANS = [
  { value: 'starter',    label: 'Starter',    price: '$0',   desc: 'For personal projects'   },
  { value: 'pro',        label: 'Pro',        price: '$12',  desc: 'For growing teams'        },
  { value: 'enterprise', label: 'Enterprise', price: '$49',  desc: 'Unlimited everything'     },
]

export function RadioGroupCardPreview() {
  const [value, setValue] = useState('pro')

  return (
    <RadioGroup
      value={value}
      onValueChange={setValue}
      style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '100%', maxWidth: 320 }}
    >
      {PLANS.map((plan) => {
        const selected = value === plan.value
        return (
          <label
            key={plan.value}
            htmlFor={`plan-card-${plan.value}`}
            style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '12px 14px', borderRadius: 'var(--radius-sm)',
              border: `1px solid ${selected ? 'var(--primary)' : 'var(--border)'}`,
              background: selected
                ? 'color-mix(in oklch, var(--primary) 6%, var(--background))'
                : 'var(--background)',
              cursor: 'pointer', transition: 'all 0.15s',
            }}
          >
            <RadioGroupItem id={`plan-card-${plan.value}`} value={plan.value} />
            <span style={{ flex: 1 }}>
              <span style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--foreground)' }}>{plan.label}</span>
                <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--primary)' }}>{plan.price}<span style={{ fontSize: 12, fontWeight: 400, color: 'var(--muted-foreground)' }}>/mo</span></span>
              </span>
              <span style={{ display: 'block', fontSize: 12, color: 'var(--muted-foreground)', marginTop: 1 }}>{plan.desc}</span>
            </span>
          </label>
        )
      })}
    </RadioGroup>
  )
}

/* ================================================================
   6. SIZES
   ================================================================ */

export function RadioGroupSizesPreview() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {(['sm', 'default', 'lg'] as const).map((size) => (
        <RadioGroup key={size} defaultValue="a" size={size} style={{ flexDirection: 'row', gap: 16 }}>
          <RadioRow id={`sz-${size}-a`} value="a" label={`${size} — Option A`} />
          <RadioRow id={`sz-${size}-b`} value="b" label={`${size} — Option B`} />
        </RadioGroup>
      ))}
    </div>
  )
}

/* ================================================================
   7. COLORS
   ================================================================ */

export function RadioGroupColorsPreview() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {(['default', 'success', 'warning', 'info', 'destructive'] as const).map((color) => (
        <RadioGroup key={color} defaultValue="on" color={color} style={{ flexDirection: 'row', gap: 16 }}>
          <RadioRow id={`col-${color}-on`}  value="on"  label={color} />
          <RadioRow id={`col-${color}-off`} value="off" label="Off"   />
        </RadioGroup>
      ))}
    </div>
  )
}

/* ================================================================
   8. ERROR
   ================================================================ */

export function RadioGroupErrorPreview() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <RadioGroup error>
        <RadioRow id="err-agree" value="agree" label="I agree to the terms" />
        <RadioRow id="err-deny"  value="deny"  label="I do not agree"       />
      </RadioGroup>
      <p style={{ fontSize: 12, color: 'var(--destructive)', margin: 0 }}>
        You must make a selection to continue.
      </p>
    </div>
  )
}

/* ================================================================
   9. CONTROLLED
   ================================================================ */

export function RadioGroupControlledPreview() {
  const [value, setValue] = useState('email')

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start' }}>
      <RadioGroup value={value} onValueChange={setValue}>
        <RadioRow id="notify-email" value="email" label="Email"            />
        <RadioRow id="notify-sms"   value="sms"   label="SMS"              />
        <RadioRow id="notify-push"  value="push"  label="Push notification" />
      </RadioGroup>
      <p style={{ fontSize: 13, color: 'var(--muted-foreground)', margin: 0 }}>
        Selected:{' '}
        <code style={{ fontFamily: 'var(--font-mono)', fontSize: 12, background: 'var(--muted)', padding: '1px 6px', borderRadius: 4 }}>
          {value}
        </code>
      </p>
    </div>
  )
}
