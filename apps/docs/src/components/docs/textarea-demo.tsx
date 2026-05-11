'use client'

import { useState } from 'react'
import { Textarea, Input, Button, FormField, FormLabel } from '@tokiui/ui'

/* ================================================================
   1. BASIC
   ================================================================ */

export function TextareaBasicPreview() {
  return <Textarea placeholder="Write something…" style={{ maxWidth: 400 }} />
}

/* ================================================================
   2. WITH LABEL
   ================================================================ */

export function TextareaWithLabelPreview() {
  return (
    <div style={{ display: 'grid', gap: 6, width: '100%', maxWidth: 400 }}>
      <label htmlFor="ta-bio" style={{ fontSize: 13, fontWeight: 500, color: 'var(--foreground)' }}>
        Bio
      </label>
      <Textarea id="ta-bio" placeholder="Tell us about yourself." rows={3} />
    </div>
  )
}

/* ================================================================
   3. WITH DESCRIPTION
   ================================================================ */

export function TextareaDescriptionPreview() {
  return (
    <div style={{ display: 'grid', gap: 6, width: '100%', maxWidth: 400 }}>
      <label htmlFor="ta-desc" style={{ fontSize: 13, fontWeight: 500, color: 'var(--foreground)' }}>
        Project description
      </label>
      <Textarea id="ta-desc" placeholder="Describe your project…" rows={3} />
      <p style={{ fontSize: 12, color: 'var(--muted-foreground)', margin: 0 }}>
        This will appear on your public project page.
      </p>
    </div>
  )
}

/* ================================================================
   4. DISABLED
   ================================================================ */

export function TextareaDisabledPreview() {
  return (
    <div style={{ display: 'grid', gap: 6, width: '100%', maxWidth: 400 }}>
      <label htmlFor="ta-disabled" style={{ fontSize: 13, fontWeight: 500, color: 'var(--foreground)', opacity: 0.5 }}>
        Notes
      </label>
      <Textarea
        id="ta-disabled"
        disabled
        defaultValue="This field is read-only and cannot be edited."
        rows={3}
      />
    </div>
  )
}

/* ================================================================
   5. CHARACTER COUNT
   ================================================================ */

const MAX = 280

export function TextareaCharCountPreview() {
  const [value, setValue] = useState('')
  const remaining = MAX - value.length
  const nearLimit = remaining <= 20

  return (
    <div style={{ display: 'grid', gap: 6, width: '100%', maxWidth: 400 }}>
      <label htmlFor="ta-count" style={{ fontSize: 13, fontWeight: 500, color: 'var(--foreground)' }}>
        Post
      </label>
      <Textarea
        id="ta-count"
        placeholder="What's on your mind?"
        rows={4}
        maxLength={MAX}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <span style={{
          fontSize: 12,
          fontFamily: 'var(--font-mono)',
          color: nearLimit ? 'var(--destructive)' : 'var(--muted-foreground)',
          transition: 'color 0.2s',
        }}>
          {remaining}/{MAX}
        </span>
      </div>
    </div>
  )
}

/* ================================================================
   6. AUTO-RESIZE
   ================================================================ */

export function TextareaAutoResizePreview() {
  return (
    <div style={{ display: 'grid', gap: 6, width: '100%', maxWidth: 400 }}>
      <label htmlFor="ta-auto" style={{ fontSize: 13, fontWeight: 500, color: 'var(--foreground)' }}>
        Message
      </label>
      <Textarea
        id="ta-auto"
        placeholder="Start typing — the field grows with your content…"
        autoResize
        rows={2}
      />
      <p style={{ fontSize: 12, color: 'var(--muted-foreground)', margin: 0 }}>
        Expands automatically as you type.
      </p>
    </div>
  )
}

/* ================================================================
   7. SIZES
   ================================================================ */

export function TextareaSizesPreview() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%', maxWidth: 400 }}>
      <Textarea size="sm" placeholder="Small" rows={2} />
      <Textarea size="default" placeholder="Default" rows={2} />
      <Textarea size="lg" placeholder="Large" rows={2} />
    </div>
  )
}

/* ================================================================
   8. ERROR STATE
   ================================================================ */

export function TextareaErrorPreview() {
  return (
    <div style={{ display: 'grid', gap: 6, width: '100%', maxWidth: 400 }}>
      <label htmlFor="ta-error" style={{ fontSize: 13, fontWeight: 500, color: 'var(--foreground)' }}>
        Feedback <span style={{ color: 'var(--destructive)' }}>*</span>
      </label>
      <Textarea
        id="ta-error"
        error
        placeholder="Your feedback is required."
        rows={3}
      />
      <p style={{ fontSize: 12, color: 'var(--destructive)', margin: 0 }}>
        Feedback is required.
      </p>
    </div>
  )
}

/* ================================================================
   9. BUILT-IN COUNTER (showCount)
   ================================================================ */

export function TextareaShowCountPreview() {
  return (
    <div style={{ display: 'grid', gap: 6, width: '100%', maxWidth: 400 }}>
      <label htmlFor="ta-show" style={{ fontSize: 13, fontWeight: 500, color: 'var(--foreground)' }}>
        Bio
      </label>
      <Textarea
        id="ta-show"
        placeholder="Tell us about yourself."
        rows={3}
        showCount
        maxLength={160}
      />
    </div>
  )
}

/* ================================================================
   8. IN A FORM
   ================================================================ */

export function TextareaInFormPreview() {
  return (
    <div style={{ display: 'grid', gap: 16, width: '100%', maxWidth: 400 }}>
      <FormField>
        <FormLabel required>Subject</FormLabel>
        <Input placeholder="What is this regarding?" />
      </FormField>
      <FormField>
        <FormLabel required>Message</FormLabel>
        <Textarea placeholder="Write your message here…" rows={5} />
      </FormField>
      <Button type="submit">Send message</Button>
    </div>
  )
}
