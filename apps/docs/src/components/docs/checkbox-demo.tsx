'use client'

import { useState } from 'react'
import { Checkbox, CheckboxGroup } from '@tokiui/ui'

/* ----- Shared label wrapper ----- */
function CheckRow({
  id, label, description, ...props
}: {
  id: string
  label: string
  description?: string
} & React.ComponentProps<typeof Checkbox>) {
  return (
    <div style={{ display: 'flex', gap: 10, alignItems: description ? 'flex-start' : 'center' }}>
      <Checkbox id={id} {...props} style={{ marginTop: description ? 2 : 0 }} />
      <div>
        <label
          htmlFor={id}
          style={{
            fontSize: 14, fontWeight: 500, color: 'var(--foreground)',
            cursor: props.disabled ? 'not-allowed' : 'pointer',
            opacity: props.disabled ? 0.5 : 1, lineHeight: 1.4,
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

export function CheckboxWithLabelPreview() {
  return (
    <CheckRow
      id="terms"
      label="Accept terms and conditions"
    />
  )
}

/* ================================================================
   3. WITH DESCRIPTION
   ================================================================ */

export function CheckboxDescriptionPreview() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <CheckRow
        id="marketing"
        label="Marketing emails"
        description="Receive emails about new products, features, and promotions."
        defaultChecked
      />
      <CheckRow
        id="security"
        label="Security alerts"
        description="Get notified about unusual activity on your account."
        defaultChecked
      />
      <CheckRow
        id="updates"
        label="Product updates"
        description="Weekly digest of platform changes and release notes."
      />
    </div>
  )
}

/* ================================================================
   4. INDETERMINATE
   ================================================================ */

const PERMISSIONS = ['Read files', 'Write files', 'Delete files']

export function CheckboxIndeterminatePreview() {
  const [checked, setChecked] = useState<boolean[]>([true, false, false])

  const allChecked = checked.every(Boolean)
  const someChecked = checked.some(Boolean)
  const parentState = allChecked ? true : someChecked ? 'indeterminate' : false

  function toggleAll() {
    setChecked(checked.fill(!allChecked).slice())
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {/* Parent */}
      <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
        <Checkbox
          id="all-perms"
          checked={parentState}
          onCheckedChange={toggleAll}
        />
        <label htmlFor="all-perms" style={{ fontSize: 14, fontWeight: 600, color: 'var(--foreground)', cursor: 'pointer' }}>
          File permissions
        </label>
      </div>
      {/* Children */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, paddingLeft: 26 }}>
        {PERMISSIONS.map((perm, i) => (
          <div key={perm} style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <Checkbox
              id={`perm-${i}`}
              checked={checked[i]}
              onCheckedChange={(val) =>
                setChecked(checked.map((c, idx) => (idx === i ? !!val : c)))
              }
            />
            <label htmlFor={`perm-${i}`} style={{ fontSize: 14, color: 'var(--foreground)', cursor: 'pointer' }}>
              {perm}
            </label>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ================================================================
   5. DISABLED
   ================================================================ */

export function CheckboxDisabledPreview() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <CheckRow id="dis-unchecked" label="Disabled unchecked" disabled />
      <CheckRow id="dis-checked" label="Disabled checked" disabled defaultChecked />
    </div>
  )
}

/* ================================================================
   6. CONTROLLED
   ================================================================ */

export function CheckboxControlledPreview() {
  const [checked, setChecked] = useState(false)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start' }}>
      <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
        <Checkbox
          id="controlled"
          checked={checked}
          onCheckedChange={(val) => setChecked(!!val)}
        />
        <label htmlFor="controlled" style={{ fontSize: 14, fontWeight: 500, color: 'var(--foreground)', cursor: 'pointer' }}>
          Enable dark mode
        </label>
      </div>
      <p style={{ fontSize: 13, color: 'var(--muted-foreground)', margin: 0 }}>
        State: <code style={{ fontFamily: 'var(--font-mono)', fontSize: 12, background: 'var(--muted)', padding: '1px 6px', borderRadius: 4 }}>{String(checked)}</code>
      </p>
    </div>
  )
}

/* ================================================================
   7. SIZES
   ================================================================ */

export function CheckboxSizesPreview() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <CheckRow id="sz-sm"  label="Small"   size="sm" />
      <CheckRow id="sz-md"  label="Default" defaultChecked />
      <CheckRow id="sz-lg"  label="Large"   size="lg" defaultChecked />
    </div>
  )
}

/* ================================================================
   8. COLORS
   ================================================================ */

export function CheckboxColorsPreview() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <CheckRow id="col-default"     label="Default"     color="default"     defaultChecked />
      <CheckRow id="col-success"     label="Success"     color="success"     defaultChecked />
      <CheckRow id="col-warning"     label="Warning"     color="warning"     defaultChecked />
      <CheckRow id="col-info"        label="Info"        color="info"        defaultChecked />
      <CheckRow id="col-error"       label="Error"       color="error"       defaultChecked />
    </div>
  )
}

/* ================================================================
   9. ERROR STATE
   ================================================================ */

export function CheckboxErrorPreview() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <CheckRow id="err-1" label="Accept terms and conditions" error />
      <p style={{ fontSize: 12, color: 'var(--destructive)', margin: 0 }}>
        You must accept the terms to continue.
      </p>
    </div>
  )
}

/* ================================================================
   10. CHECKBOX GROUP (component)
   ================================================================ */

export function CheckboxGroupComponentPreview() {
  return (
    <CheckboxGroup color="success">
      <CheckRow id="cg-1" label="Receive marketing emails" defaultChecked />
      <CheckRow id="cg-2" label="Security alerts" defaultChecked />
      <CheckRow id="cg-3" label="Product updates" />
    </CheckboxGroup>
  )
}

/* ================================================================
   11. CHECKBOX GROUP (card style)
   ================================================================ */

const FRAMEWORKS = [
  { id: 'next',    label: 'Next.js',    desc: 'React framework'     },
  { id: 'nuxt',    label: 'Nuxt',       desc: 'Vue framework'       },
  { id: 'astro',   label: 'Astro',      desc: 'Content sites'       },
  { id: 'remix',   label: 'Remix',      desc: 'Full-stack React'    },
  { id: 'svelte',  label: 'SvelteKit',  desc: 'Svelte framework'    },
]

export function CheckboxGroupPreview() {
  const [selected, setSelected] = useState<string[]>(['next'])

  function toggle(id: string) {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4, width: '100%', maxWidth: 320 }}>
      <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--foreground)', margin: '0 0 10px' }}>
        Which frameworks do you use?
      </p>
      {FRAMEWORKS.map((fw) => (
        <label
          key={fw.id}
          style={{
            display: 'flex', alignItems: 'center', gap: 10,
            padding: '10px 12px', borderRadius: 'var(--radius-sm)',
            border: `1px solid ${selected.includes(fw.id) ? 'var(--primary)' : 'var(--border)'}`,
            background: selected.includes(fw.id) ? 'color-mix(in oklch, var(--primary) 6%, var(--background))' : 'var(--background)',
            cursor: 'pointer', transition: 'all 0.15s',
          }}
        >
          <Checkbox
            id={`fw-${fw.id}`}
            checked={selected.includes(fw.id)}
            onCheckedChange={() => toggle(fw.id)}
          />
          <span>
            <span style={{ display: 'block', fontSize: 14, fontWeight: 500, color: 'var(--foreground)' }}>
              {fw.label}
            </span>
            <span style={{ display: 'block', fontSize: 12, color: 'var(--muted-foreground)' }}>
              {fw.desc}
            </span>
          </span>
        </label>
      ))}
    </div>
  )
}
