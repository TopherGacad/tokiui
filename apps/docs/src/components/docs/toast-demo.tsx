'use client'

import { toast } from '@tokiui/ui'
import { Button } from '@tokiui/ui'

/* ================================================================
   1. SIMPLE
   ================================================================ */

export function ToastSimplePreview() {
  return (
    <Button variant="outline" onClick={() => toast('Event has been created.')}>
      Show toast
    </Button>
  )
}

/* ================================================================
   2. TYPES
   ================================================================ */

export function ToastTypesPreview() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
      <Button onClick={() => toast.success('Changes saved successfully.')}>
        Success
      </Button>
      <Button color="destructive" onClick={() => toast.error('Something went wrong. Please try again.')}>
        Error
      </Button>
      <Button variant="outline" onClick={() => toast.info('A new version is available.')}>
        Info
      </Button>
      <Button variant="outline" color="neutral" onClick={() => toast.warning('Your session will expire in 5 minutes.')}>
        Warning
      </Button>
    </div>
  )
}

/* ================================================================
   3. WITH ACTION (UNDO)
   ================================================================ */

export function ToastWithActionPreview() {
  return (
    <Button
      variant="outline"
      onClick={() =>
        toast('Message moved to trash.', {
          action: {
            label: 'Undo',
            onClick: () => toast.success('Message restored.'),
          },
        })
      }
    >
      Move to trash
    </Button>
  )
}

/* ================================================================
   4. WITH TITLE + DESCRIPTION
   ================================================================ */

export function ToastDescriptionPreview() {
  return (
    <Button
      variant="outline"
      onClick={() =>
        toast('Deployment complete', {
          description: 'Your changes are live on production.',
        })
      }
    >
      Deploy
    </Button>
  )
}

/* ================================================================
   5. PROMISE (AUTOMATION)
   ================================================================ */

function fakeUpload(): Promise<{ name: string }> {
  return new Promise((resolve, reject) =>
    setTimeout(() => (Math.random() > 0.2 ? resolve({ name: 'report.pdf' }) : reject()), 2000)
  )
}

export function ToastPromisePreview() {
  return (
    <Button
      onClick={() =>
        toast.promise(fakeUpload(), {
          loading: 'Uploading file…',
          success: (data) => `${data.name} uploaded successfully.`,
          error: 'Upload failed. Please try again.',
        })
      }
    >
      Upload file
    </Button>
  )
}

/* ================================================================
   6. POSITIONING
   ================================================================ */

type Position =
  | 'top-left' | 'top-center' | 'top-right'
  | 'bottom-left' | 'bottom-center' | 'bottom-right'

const POSITIONS: Position[] = [
  'top-left', 'top-center', 'top-right',
  'bottom-left', 'bottom-center', 'bottom-right',
]

export function ToastPositionPreview() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, maxWidth: 420 }}>
      {POSITIONS.map((pos) => (
        <Button
          key={pos}
          variant="outline"
          color="neutral"
          style={{ fontSize: 12 }}
          onClick={() => toast(`Position: ${pos}`, { position: pos })}
        >
          {pos}
        </Button>
      ))}
    </div>
  )
}

/* ================================================================
   7. DURATION
   ================================================================ */

export function ToastDurationPreview() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
      <Button variant="outline" onClick={() => toast('Dismisses in 2 seconds.', { duration: 2000 })}>
        2 seconds
      </Button>
      <Button variant="outline" onClick={() => toast('Dismisses in 8 seconds.', { duration: 8000 })}>
        8 seconds
      </Button>
      <Button variant="outline" onClick={() => toast('Stays until dismissed.', { duration: Infinity })}>
        Persistent
      </Button>
    </div>
  )
}

/* ================================================================
   8. CUSTOM CONTENT
   ================================================================ */

export function ToastCustomPreview() {
  return (
    <Button
      variant="outline"
      onClick={() =>
        toast.custom(() => (
          <div style={{
            display: 'flex', alignItems: 'center', gap: 12,
            background: 'var(--card)', border: '1px solid var(--border)',
            borderRadius: 'var(--radius-md)', padding: '12px 16px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
            minWidth: 280,
          }}>
            <div style={{
              width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
              background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <span style={{ color: 'var(--primary-foreground)', fontSize: 16 }}>🎉</span>
            </div>
            <div>
              <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--foreground)', margin: 0 }}>
                You reached Level 5!
              </p>
              <p style={{ fontSize: 12, color: 'var(--muted-foreground)', margin: 0, marginTop: 2 }}>
                Keep going to unlock new features.
              </p>
            </div>
          </div>
        ))
      }
    >
      Custom toast
    </Button>
  )
}
