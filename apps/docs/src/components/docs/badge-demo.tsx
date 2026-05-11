'use client'

import { useState } from 'react'
import { Badge } from '@tokiui/ui'

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
