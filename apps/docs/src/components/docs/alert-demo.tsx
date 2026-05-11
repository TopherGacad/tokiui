'use client'

import { useState } from 'react'
import { Alert } from '@tokiui/ui'

/* ================================================================
   1. VARIANTS
   ================================================================ */

export function AlertVariantsPreview() {
  return (
    <div style={{ display: 'grid', gap: 10, width: '100%', maxWidth: 520 }}>
      <Alert variant="default" title="Heads up">
        You can add components to your app using the CLI.
      </Alert>
      <Alert variant="success" title="Deployment complete">
        Your changes are live on production.
      </Alert>
      <Alert variant="info" title="Update available">
        Version 2.4.0 is ready to install.
      </Alert>
      <Alert variant="warning" title="Session expiring">
        Your session will expire in 5 minutes. Save your work.
      </Alert>
      <Alert variant="destructive" title="Action required">
        Your payment method has expired. Update it to keep access.
      </Alert>
    </div>
  )
}

/* ================================================================
   2. TITLE ONLY (no body)
   ================================================================ */

export function AlertTitleOnlyPreview() {
  return (
    <div style={{ display: 'grid', gap: 10, width: '100%', maxWidth: 520 }}>
      <Alert title="Changes saved." variant="success" />
      <Alert title="Insufficient permissions." variant="destructive" />
    </div>
  )
}

/* ================================================================
   3. BODY ONLY (no title)
   ================================================================ */

export function AlertBodyOnlyPreview() {
  return (
    <div style={{ display: 'grid', gap: 10, width: '100%', maxWidth: 520 }}>
      <Alert variant="info">
        Your free trial ends in 3 days. Upgrade to keep access to all features.
      </Alert>
      <Alert variant="warning">
        Some of your API keys are nearing their rate limits.
      </Alert>
    </div>
  )
}

/* ================================================================
   4. DISMISSABLE
   ================================================================ */

export function AlertDismissPreview() {
  const [items, setItems] = useState([
    { id: 1, variant: 'success' as const, title: 'Deployment complete', body: 'Your changes are live on production.' },
    { id: 2, variant: 'warning' as const, title: 'Backup overdue', body: 'Your last backup was more than 7 days ago.' },
    { id: 3, variant: 'info' as const, title: 'Scheduled maintenance', body: 'Downtime is scheduled for Sunday at 02:00 UTC.' },
  ])

  return (
    <div style={{ display: 'grid', gap: 10, width: '100%', maxWidth: 520 }}>
      {items.length === 0 && (
        <p style={{ fontSize: 13, color: 'var(--muted-foreground)', textAlign: 'center', padding: '12px 0' }}>
          All alerts dismissed.
        </p>
      )}
      {items.map((item) => (
        <Alert
          key={item.id}
          variant={item.variant}
          title={item.title}
          onDismiss={() => setItems((prev) => prev.filter((i) => i.id !== item.id))}
        >
          {item.body}
        </Alert>
      ))}
    </div>
  )
}

/* ================================================================
   5. CUSTOM ICON
   ================================================================ */

function RocketIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
  )
}

export function AlertCustomIconPreview() {
  return (
    <div style={{ display: 'grid', gap: 10, width: '100%', maxWidth: 520 }}>
      <Alert variant="info" title="New feature available" icon={<RocketIcon />}>
        Command palette is now available. Press{' '}
        <kbd style={{ fontFamily: 'var(--font-mono)', fontSize: 11, background: 'var(--muted)', border: '1px solid var(--border)', borderRadius: 4, padding: '0 4px' }}>
          ⌘K
        </kbd>{' '}
        to open it.
      </Alert>
      <Alert variant="default" title="No icon" icon={null}>
        Pass <code style={{ fontFamily: 'var(--font-mono)', fontSize: 12 }}>icon={'{null}'}</code> to suppress the default icon entirely.
      </Alert>
    </div>
  )
}
