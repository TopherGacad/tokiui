'use client'

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, CardImage, Button, Badge } from '@tokiui/ui'

/* ── Default ─────────────────────────────────────────────────────────────── */

export function CardDefaultPreview() {
  return (
    <Card style={{ width: 320 }}>
      <CardHeader>
        <CardTitle>Project Alpha</CardTitle>
        <CardDescription>Deploy your new project in one click.</CardDescription>
      </CardHeader>
      <CardContent>
        <p style={{ fontSize: 14, color: 'var(--muted-foreground)', margin: 0 }}>
          Your project is ready to be deployed. This will make it publicly accessible.
        </p>
      </CardContent>
      <CardFooter>
        <Button size="sm">Deploy</Button>
        <Button size="sm" variant="outline" color="neutral">Cancel</Button>
      </CardFooter>
    </Card>
  )
}

/* ── Shadow ──────────────────────────────────────────────────────────────── */

export function CardShadowPreview() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'flex-start' }}>
      {(['none', 'sm', 'md', 'lg'] as const).map((s) => (
        <Card key={s} shadow={s} style={{ width: 160 }}>
          <CardContent style={{ paddingTop: 24 }}>
            <p style={{ fontSize: 13, fontWeight: 500, color: 'var(--foreground)', margin: 0 }}>
              shadow="{s}"
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

/* ── Status border ───────────────────────────────────────────────────────── */

export function CardStatusPreview() {
  const statuses = [
    { status: 'success',     label: 'Deployment succeeded', desc: 'All services are running.' },
    { status: 'warning',     label: 'High memory usage',    desc: 'At 82% — consider scaling.' },
    { status: 'info',        label: 'Maintenance window',   desc: 'Scheduled for Sunday 2 AM.' },
    { status: 'destructive', label: 'Build failed',         desc: 'Check the error logs.' },
  ] as const

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%', maxWidth: 360 }}>
      {statuses.map(({ status, label, desc }) => (
        <Card key={status} status={status}>
          <CardContent style={{ paddingTop: 16, paddingBottom: 16 }}>
            <p style={{ fontSize: 14, fontWeight: 600, margin: '0 0 2px', color: 'var(--foreground)' }}>{label}</p>
            <p style={{ fontSize: 13, color: 'var(--muted-foreground)', margin: 0 }}>{desc}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

/* ── Interactive ─────────────────────────────────────────────────────────── */

const INTEGRATIONS = [
  { name: 'GitHub',   desc: 'Source control',    color: 'var(--foreground)' },
  { name: 'Vercel',   desc: 'Deployment',        color: 'var(--foreground)' },
  { name: 'Supabase', desc: 'Database & auth',   color: 'var(--success)'   },
]

export function CardInteractivePreview() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
      {INTEGRATIONS.map((i) => (
        <Card key={i.name} interactive style={{ width: 160, cursor: 'pointer' }}>
          <CardContent style={{ paddingTop: 20, paddingBottom: 20 }}>
            <p style={{ fontSize: 14, fontWeight: 600, margin: '0 0 2px', color: 'var(--foreground)' }}>{i.name}</p>
            <p style={{ fontSize: 12, color: 'var(--muted-foreground)', margin: 0 }}>{i.desc}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

/* ── CardImage ───────────────────────────────────────────────────────────── */

export function CardImagePreview() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
      <Card style={{ width: 280 }}>
        <CardImage
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=560&q=80"
          alt="Mountain landscape"
          aspectRatio="16/9"
        />
        <CardHeader>
          <CardTitle>Mountain Trail</CardTitle>
          <CardDescription>A scenic route through alpine terrain.</CardDescription>
        </CardHeader>
        <CardFooter>
          <Badge variant="soft" color="success" dot>Open</Badge>
        </CardFooter>
      </Card>
    </div>
  )
}
