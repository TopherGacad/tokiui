'use client'

import { useState } from 'react'
import type { ReactNode } from 'react'
import { Combobox, type ComboboxOption } from '@tokiui/ui'

const FRAMEWORKS: ComboboxOption[] = [
  { value: 'next', label: 'Next.js' },
  { value: 'remix', label: 'Remix' },
  { value: 'astro', label: 'Astro' },
  { value: 'vite', label: 'Vite' },
  { value: 'nuxt', label: 'Nuxt' },
  { value: 'svelte', label: 'SvelteKit' },
  { value: 'solid', label: 'SolidStart' },
  { value: 'gatsby', label: 'Gatsby', disabled: true },
]

function Frame({ children }: { children: ReactNode }) {
  return <div style={{ width: '100%', maxWidth: 280 }}>{children}</div>
}

export function ComboboxPreview() {
  return (
    <Frame>
      <Combobox options={FRAMEWORKS} placeholder="Select framework…" searchPlaceholder="Search framework…" />
    </Frame>
  )
}

export function ComboboxSizesPreview() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%', maxWidth: 280 }}>
      <Combobox size="sm" options={FRAMEWORKS} placeholder="Small" />
      <Combobox size="default" options={FRAMEWORKS} placeholder="Default" />
      <Combobox size="lg" options={FRAMEWORKS} placeholder="Large" />
    </div>
  )
}

export function ComboboxClearablePreview() {
  return (
    <Frame>
      <Combobox clearable options={FRAMEWORKS} defaultValue="next" />
    </Frame>
  )
}

export function ComboboxControlledPreview() {
  const [value, setValue] = useState('astro')
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%', maxWidth: 280 }}>
      <Combobox options={FRAMEWORKS} value={value} onValueChange={setValue} />
      <p style={{ fontSize: 13, color: 'var(--muted-foreground)', margin: 0 }}>
        Selected: <code>{value || '—'}</code>
      </p>
    </div>
  )
}

export function ComboboxStatesPreview() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%', maxWidth: 280 }}>
      <Combobox error options={FRAMEWORKS} placeholder="Error state" />
      <Combobox disabled options={FRAMEWORKS} placeholder="Disabled" />
    </div>
  )
}

/* ----- Props table ----- */
const PROPS = [
  { name: 'options', type: 'ComboboxOption[]', desc: 'Items to choose from — { value, label, disabled? }.' },
  { name: 'value', type: 'string', desc: 'Controlled selected value.' },
  { name: 'defaultValue', type: 'string', desc: 'Uncontrolled initial value.' },
  { name: 'onValueChange', type: '(value: string) => void', desc: 'Fires on select; receives "" when cleared.' },
  { name: 'placeholder', type: 'string', def: '"Select…"', desc: 'Trigger text when nothing is selected.' },
  { name: 'searchPlaceholder', type: 'string', def: '"Search…"', desc: 'Placeholder for the search input.' },
  { name: 'emptyText', type: 'string', def: '"No results found."', desc: 'Shown when no option matches the query.' },
  { name: 'size', type: '"sm" | "default" | "lg"', def: '"default"', desc: 'Trigger height and text size.' },
  { name: 'clearable', type: 'boolean', def: 'false', desc: 'Show a clear button once a value is selected.' },
  { name: 'error', type: 'boolean', def: 'false', desc: 'Destructive border + focus ring.' },
  { name: 'disabled', type: 'boolean', def: 'false', desc: 'Disables the trigger.' },
  { name: 'name', type: 'string', desc: 'Renders a hidden input for native form submission.' },
] as const

export function ComboboxPropsTable() {
  return (
    <div className="props">
      {PROPS.map((p) => (
        <div className="props__row" key={p.name}>
          <div className="props__l">
            <span className="props__name">{p.name}</span>
            <span className="props__type">{p.type}</span>
          </div>
          <div className="props__r">
            <span className="props__desc">{p.desc}</span>
            {'def' in p && p.def !== undefined && (
              <span className="props__def">default <span className="props__chip">{p.def}</span></span>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
