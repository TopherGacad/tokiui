'use client'

import { useState } from 'react'
import {
  Select, SelectTrigger, SelectValue, SelectContent,
  SelectItem, SelectGroup, SelectLabel, SelectSeparator,
  FormField, FormLabel,
} from '@tokiui/ui'

/* ================================================================
   1. BASIC
   ================================================================ */

export function SelectBasicPreview() {
  return (
    <Select>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="banana">Banana</SelectItem>
        <SelectItem value="blueberry">Blueberry</SelectItem>
        <SelectItem value="mango">Mango</SelectItem>
        <SelectItem value="pineapple">Pineapple</SelectItem>
      </SelectContent>
    </Select>
  )
}

/* ================================================================
   2. GROUPED
   ================================================================ */

export function SelectGroupedPreview() {
  return (
    <Select>
      <SelectTrigger className="w-[220px]">
        <SelectValue placeholder="Select timezone" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>North America</SelectLabel>
          <SelectItem value="est">Eastern (EST)</SelectItem>
          <SelectItem value="cst">Central (CST)</SelectItem>
          <SelectItem value="mst">Mountain (MST)</SelectItem>
          <SelectItem value="pst">Pacific (PST)</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>Europe</SelectLabel>
          <SelectItem value="gmt">London (GMT)</SelectItem>
          <SelectItem value="cet">Paris (CET)</SelectItem>
          <SelectItem value="eet">Athens (EET)</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>Asia</SelectLabel>
          <SelectItem value="ist">India (IST)</SelectItem>
          <SelectItem value="cst-asia">China (CST)</SelectItem>
          <SelectItem value="jst">Tokyo (JST)</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

/* ================================================================
   3. WITH ICONS
   ================================================================ */

const ROLES = [
  {
    value: 'owner',
    label: 'Owner',
    desc: 'Full access',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
  },
  {
    value: 'admin',
    label: 'Admin',
    desc: 'Manage settings',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    value: 'editor',
    label: 'Editor',
    desc: 'Edit content',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
      </svg>
    ),
  },
  {
    value: 'viewer',
    label: 'Viewer',
    desc: 'Read only',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
]

export function SelectWithIconsPreview() {
  const [value, setValue] = useState('')
  const selected = ROLES.find((r) => r.value === value)

  return (
    <Select value={value} onValueChange={setValue}>
      <SelectTrigger className="w-[200px]">
        {selected ? (
          <div className="flex items-center gap-2 min-w-0 flex-1 text-sm text-foreground">
            <span className="text-muted-foreground shrink-0 flex">{selected.icon}</span>
            <span className="truncate">{selected.label}</span>
          </div>
        ) : (
          <SelectValue placeholder="Select role" />
        )}
      </SelectTrigger>
      <SelectContent>
        {ROLES.map((role) => (
          <SelectItem key={role.value} value={role.value}>
            <span className="flex items-center gap-2.5">
              <span className="text-muted-foreground">{role.icon}</span>
              <span>
                <span className="block font-medium">{role.label}</span>
                <span className="block text-xs text-muted-foreground">{role.desc}</span>
              </span>
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

/* ================================================================
   4. DISABLED
   ================================================================ */

export function SelectDisabledPreview() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start' }}>
      {/* Disabled trigger */}
      <Select disabled>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Disabled select" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="a">Option A</SelectItem>
        </SelectContent>
      </Select>

      {/* Disabled items */}
      <Select>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Select plan" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="free">Free</SelectItem>
          <SelectItem value="pro">Pro</SelectItem>
          <SelectItem value="enterprise" disabled>Enterprise (contact us)</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}

/* ================================================================
   5. CONTROLLED
   ================================================================ */

const STATUSES = ['Backlog', 'Todo', 'In Progress', 'In Review', 'Done', 'Cancelled']

export function SelectControlledPreview() {
  const [status, setStatus] = useState('todo')

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'flex-start' }}>
      <Select value={status} onValueChange={setStatus}>
        <SelectTrigger className="w-[200px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {STATUSES.map((s) => (
            <SelectItem key={s} value={s.toLowerCase().replace(/ /g, '-')}>
              {s}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <p className="text-sm text-muted-foreground">
        Current value: <code className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded">{status}</code>
      </p>
    </div>
  )
}

/* ================================================================
   6. SIZES
   ================================================================ */

export function SelectSizesPreview() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'flex-start' }}>
      {(['sm', 'default', 'lg'] as const).map((size) => (
        <Select key={size}>
          <SelectTrigger size={size} className="w-[180px]">
            <SelectValue placeholder={size === 'default' ? 'Default' : size === 'sm' ? 'Small' : 'Large'} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="a">Option A</SelectItem>
            <SelectItem value="b">Option B</SelectItem>
          </SelectContent>
        </Select>
      ))}
    </div>
  )
}

/* ================================================================
   SIZE + ERROR
   ================================================================ */

export function SelectErrorPreview() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 240 }}>
      <Select>
        <SelectTrigger error className="w-full">
          <SelectValue placeholder="Select a role" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="admin">Admin</SelectItem>
          <SelectItem value="member">Member</SelectItem>
          <SelectItem value="viewer">Viewer</SelectItem>
        </SelectContent>
      </Select>
      <p style={{ fontSize: 12, color: 'var(--destructive)', margin: 0 }}>
        Please select a role to continue.
      </p>
    </div>
  )
}

/* ================================================================
   CLEARABLE
   ================================================================ */

export function SelectClearablePreview() {
  const [value, setValue] = useState<string | undefined>('pro')

  return (
    <Select value={value} onValueChange={setValue}>
      <SelectTrigger
        className="w-[200px]"
        clearable
        onClear={() => setValue(undefined)}
      >
        <SelectValue placeholder="Select plan" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="free">Free</SelectItem>
        <SelectItem value="pro">Pro</SelectItem>
        <SelectItem value="enterprise">Enterprise</SelectItem>
      </SelectContent>
    </Select>
  )
}

/* ================================================================
   7. SCROLLABLE (many options)
   ================================================================ */

const COUNTRIES = [
  'Argentina','Australia','Brazil','Canada','China','Denmark',
  'Egypt','Finland','France','Germany','India','Indonesia',
  'Italy','Japan','Mexico','Netherlands','New Zealand','Nigeria',
  'Norway','Philippines','Poland','Portugal','Russia','Saudi Arabia',
  'South Africa','South Korea','Spain','Sweden','Thailand',
  'Turkey','Ukraine','United Kingdom','United States','Vietnam',
]

export function SelectScrollablePreview() {
  return (
    <Select>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Select country" />
      </SelectTrigger>
      <SelectContent>
        {COUNTRIES.map((c) => (
          <SelectItem key={c} value={c.toLowerCase().replace(/ /g, '-')}>
            {c}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

/* ================================================================
   8. IN A FORM
   ================================================================ */

export function SelectInFormPreview() {
  return (
    <div style={{ display: 'grid', gap: 14, width: '100%', maxWidth: 320 }}>
      <FormField>
        <FormLabel>Email frequency</FormLabel>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Choose frequency" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="realtime">Real-time</SelectItem>
            <SelectItem value="daily">Daily digest</SelectItem>
            <SelectItem value="weekly">Weekly summary</SelectItem>
            <SelectItem value="never">Never</SelectItem>
          </SelectContent>
        </Select>
      </FormField>
      <FormField>
        <FormLabel required>Language</FormLabel>
        <Select defaultValue="en">
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="en">English</SelectItem>
            <SelectItem value="es">Español</SelectItem>
            <SelectItem value="fr">Français</SelectItem>
            <SelectItem value="de">Deutsch</SelectItem>
            <SelectItem value="ja">日本語</SelectItem>
          </SelectContent>
        </Select>
      </FormField>
    </div>
  )
}
