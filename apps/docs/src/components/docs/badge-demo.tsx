'use client'

import { useState } from 'react'
import { Badge, Avatar } from '@tokiui/ui'

export function BadgeVariantsPreview() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      <Badge variant="solid">Solid</Badge>
      <Badge variant="soft">Soft</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  )
}

export function BadgeSolidColorsPreview() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      <Badge variant="solid" color="default">Default</Badge>
      <Badge variant="solid" color="secondary">Secondary</Badge>
      <Badge variant="solid" color="success">Success</Badge>
      <Badge variant="solid" color="warning">Warning</Badge>
      <Badge variant="solid" color="info">Info</Badge>
      <Badge variant="solid" color="destructive">Destructive</Badge>
    </div>
  )
}

export function BadgeSoftColorsPreview() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      <Badge variant="soft" color="default">Default</Badge>
      <Badge variant="soft" color="secondary">Secondary</Badge>
      <Badge variant="soft" color="success">Success</Badge>
      <Badge variant="soft" color="warning">Warning</Badge>
      <Badge variant="soft" color="info">Info</Badge>
      <Badge variant="soft" color="destructive">Destructive</Badge>
    </div>
  )
}

export function BadgeOutlineColorsPreview() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      <Badge variant="outline" color="default">Default</Badge>
      <Badge variant="outline" color="secondary">Secondary</Badge>
      <Badge variant="outline" color="success">Success</Badge>
      <Badge variant="outline" color="warning">Warning</Badge>
      <Badge variant="outline" color="info">Info</Badge>
      <Badge variant="outline" color="destructive">Destructive</Badge>
    </div>
  )
}

export function BadgeSizesPreview() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 8 }}>
      <Badge size="sm">Small</Badge>
      <Badge size="md">Medium</Badge>
      <Badge size="lg">Large</Badge>
    </div>
  )
}

export function BadgeDotPreview() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      <Badge variant="soft" color="success" dot>Active</Badge>
      <Badge variant="soft" color="warning" dot>Pending</Badge>
      <Badge variant="soft" color="destructive" dot>Offline</Badge>
      <Badge variant="soft" color="info" dot>Syncing</Badge>
    </div>
  )
}

export function BadgeDismissPreview() {
  const initial = ['Design', 'React', 'TypeScript', 'Tailwind']
  const [tags, setTags] = useState(initial)

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
      {tags.map((tag) => (
        <Badge
          key={tag}
          variant="soft"
          onDismiss={() => setTags((prev) => prev.filter((t) => t !== tag))}
        >
          {tag}
        </Badge>
      ))}
      {tags.length === 0 && (
        <button
          onClick={() => setTags(initial)}
          style={{ fontSize: 13, color: 'var(--muted-foreground)', cursor: 'pointer', border: 'none', background: 'none', padding: 0 }}
        >
          Reset
        </button>
      )}
    </div>
  )
}

/* ================================================================
   REAL-WORLD EXAMPLES
   ================================================================ */

export function BadgeAnnouncementPreview() {
  return (
    <div className="flex flex-col items-center gap-4">
      <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-[13px] text-muted-foreground shadow-sm">
        <Badge variant="solid" color="default" size="sm">New</Badge>
        Avatar and Spinner are now available
      </span>
      <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-[13px] text-muted-foreground shadow-sm">
        <Badge variant="outline" color="secondary" size="sm" className="font-mono">v0.3.0</Badge>
        See what changed in this release
      </span>
      <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-[13px] text-muted-foreground shadow-sm">
        <Badge variant="soft" color="warning" size="sm">Beta</Badge>
        Playground is in early access
      </span>
    </div>
  )
}

export function BadgeStatusTablePreview() {
  const issues = [
    { id: '48', title: 'Add Accordion component',      label: 'Feature', status: 'open',   statusColor: 'success'   },
    { id: '47', title: 'Fix dark mode separator',      label: 'Bug',     status: 'merged', statusColor: 'info'      },
    { id: '46', title: 'Update installation docs',     label: 'Docs',    status: 'merged', statusColor: 'info'      },
    { id: '45', title: 'Remove framer-motion dep',     label: 'Chore',   status: 'draft',  statusColor: 'secondary' },
  ] as const

  return (
    <div className="w-full max-w-lg rounded-xl border border-border dark:border-white/10 overflow-hidden">
      <div className="bg-muted/40 dark:bg-white/5 px-4 py-2 border-b border-border dark:border-white/10">
        <span className="text-xs font-medium text-muted-foreground">tokiui / pull requests</span>
      </div>
      <div className="divide-y divide-border dark:divide-white/10">
        {issues.map(({ id, title, label, status, statusColor }) => (
          <div key={id} className="flex items-center gap-3 px-4 py-3">
            <span className="text-xs text-muted-foreground font-mono shrink-0 w-8">#{id}</span>
            <span className="flex-1 text-sm font-medium truncate">{title}</span>
            <Badge variant="outline" color="secondary" size="sm">{label}</Badge>
            <Badge variant="soft" color={statusColor} size="sm" dot>{status}</Badge>
          </div>
        ))}
      </div>
    </div>
  )
}

export function BadgeUserRolesPreview() {
  const members = [
    { name: 'Morgan Lee',   role: 'Admin',  variant: 'solid',   color: 'default'   },
    { name: 'Sam Torres',   role: 'Editor', variant: 'soft',    color: 'default'   },
    { name: 'Riley Chen',   role: 'Editor', variant: 'soft',    color: 'default'   },
    { name: 'Jordan Park',  role: 'Viewer', variant: 'outline', color: 'secondary' },
    { name: 'Casey Wright', role: 'Viewer', variant: 'outline', color: 'secondary' },
  ] as const

  return (
    <div className="w-full max-w-sm rounded-xl border border-border dark:border-white/10 overflow-hidden">
      <div className="bg-muted/40 dark:bg-white/5 px-4 py-2 border-b border-border dark:border-white/10">
        <span className="text-xs font-medium text-muted-foreground">Team members</span>
      </div>
      <div className="divide-y divide-border dark:divide-white/10">
        {members.map(({ name, role, variant, color }) => {
          const initials = name.split(' ').map(n => n[0]).join('')
          return (
            <div key={name} className="flex items-center gap-3 px-4 py-2.5">
              <Avatar color="auto" fallback={initials} size="sm" />
              <span className="flex-1 text-sm">{name}</span>
              <Badge variant={variant} color={color} size="sm">{role}</Badge>
            </div>
          )
        })}
      </div>
    </div>
  )
}
