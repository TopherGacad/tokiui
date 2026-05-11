'use client'

import { useState } from 'react'
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
  Button,
} from '@tokiui/ui'

/* ================================================================
   1. BASIC
   ================================================================ */

export function BasicAlertDialogPreview() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Leave page</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Leave page?</AlertDialogTitle>
          <AlertDialogDescription>
            You have unsaved changes. If you leave now, your progress will be lost.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Stay</AlertDialogCancel>
          <AlertDialogAction>Leave</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

/* ================================================================
   2. DESTRUCTIVE
   ================================================================ */

export function DestructiveAlertDialogPreview() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button color="destructive">Delete account</Button>
      </AlertDialogTrigger>
      <AlertDialogContent level="destructive">
        <AlertDialogHeader>
          <AlertDialogTitle>Delete account?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete your account and remove all your data from our servers. This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction color="destructive">
            Delete account
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

/* ================================================================
   3. WITH ICON
   ================================================================ */

function WarningIcon() {
  return (
    <div style={{
      width: 40, height: 40, borderRadius: '50%',
      background: 'color-mix(in oklch, var(--destructive) 12%, var(--background))',
      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
    }}>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--destructive)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    </div>
  )
}

export function WithIconAlertDialogPreview() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" color="destructive">Remove member</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
            <WarningIcon />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <AlertDialogTitle>Remove member?</AlertDialogTitle>
              <AlertDialogDescription>
                This member will immediately lose access to all projects and resources in this workspace.
              </AlertDialogDescription>
            </div>
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction color="destructive">
            Remove
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

/* ================================================================
   4. WITH INPUT CONFIRMATION
   ================================================================ */

export function WithInputAlertDialogPreview() {
  const [value, setValue] = useState('')
  const confirmed = value === 'DELETE'

  return (
    <AlertDialog onOpenChange={() => setValue('')}>
      <AlertDialogTrigger asChild>
        <Button color="destructive" variant="outline">Delete repository</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete repository</AlertDialogTitle>
          <AlertDialogDescription>
            This action is irreversible. Type <strong style={{ color: 'var(--foreground)' }}>DELETE</strong> to confirm.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Type DELETE to confirm"
          style={{
            height: 36, padding: '0 12px', borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border)', background: 'var(--input)',
            color: 'var(--foreground)', fontSize: 14, outline: 'none',
            fontFamily: 'inherit', width: '100%', boxSizing: 'border-box',
          }}
          onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--ring)')}
          onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
        />
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setValue('')}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            color="destructive"
            disabled={!confirmed}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

/* ================================================================
   5. LOADING STATE
   ================================================================ */

export function AlertDialogLoadingPreview() {
  const [loading, setLoading] = useState(false)

  async function handleDelete() {
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1800))
    setLoading(false)
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button color="destructive">Delete project</Button>
      </AlertDialogTrigger>
      <AlertDialogContent level="destructive">
        <AlertDialogHeader>
          <AlertDialogTitle>Delete project?</AlertDialogTitle>
          <AlertDialogDescription>
            All data will be permanently removed. This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
          <AlertDialogAction color="destructive" loading={loading} onClick={handleDelete}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

/* ================================================================
   6. NEUTRAL / INFO
   ================================================================ */

export function InfoAlertDialogPreview() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Publish changes</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Ready to publish?</AlertDialogTitle>
          <AlertDialogDescription>
            Your changes will go live immediately and be visible to all users. Make sure you have reviewed everything before proceeding.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Review again</AlertDialogCancel>
          <AlertDialogAction>Publish now</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

/* ================================================================
   PROPS TABLE
   ================================================================ */

export function AlertDialogPropsTable() {
  const rows = [
    ['AlertDialogContent', 'level', "'default' | 'destructive' | 'warning' | 'info'", "'default'", 'Adds a colored top border to signal severity'],
    ['AlertDialogContent', 'className', 'string', '—', 'Merged with the panel class list'],
    ['AlertDialogAction', 'color', "'default' | 'destructive' | 'warning' | 'info' | 'success'", "'default'", 'Button color — use destructive for delete/remove actions'],
    ['AlertDialogAction', 'loading', 'boolean', '—', 'Shows a spinner and disables the button while in flight'],
    ['AlertDialogAction', 'className', 'string', '—', 'Additional class names'],
    ['AlertDialogCancel', 'className', 'string', '—', 'Additional class names'],
    ['AlertDialog (root)', 'open', 'boolean', '—', 'Controlled open state'],
    ['AlertDialog (root)', 'onOpenChange', '(open: boolean) => void', '—', 'Called when open state changes'],
    ['AlertDialog (root)', 'defaultOpen', 'boolean', 'false', 'Uncontrolled initial open state'],
  ]
  return (
    <table>
      <thead>
        <tr>
          <th>Component</th>
          <th>Prop</th>
          <th>Type</th>
          <th>Default</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {rows.map(([comp, prop, type, def, desc]) => (
          <tr key={`${comp}-${prop}`}>
            <td><code>{comp}</code></td>
            <td><code>{prop}</code></td>
            <td><code>{type}</code></td>
            <td><code>{def}</code></td>
            <td>{desc}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
