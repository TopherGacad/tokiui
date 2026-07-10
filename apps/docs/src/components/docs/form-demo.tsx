'use client'

import { Input, FormField, FormLabel, FormHelperText, FormMessage, FormError, Button } from '@tokiui/ui'

export function FormFieldPreview() {
  return (
    <div style={{ maxWidth: 380, width: '100%' }}>
      <FormField>
        <FormLabel>Workspace name</FormLabel>
        <Input placeholder="Acme Inc." />
        <FormHelperText>Visible to everyone on your team.</FormHelperText>
      </FormField>
    </div>
  )
}

export function FormRequiredPreview() {
  return (
    <div style={{ maxWidth: 380, width: '100%' }}>
      <FormField>
        <FormLabel required>Email</FormLabel>
        <Input type="email" placeholder="you@example.com" />
      </FormField>
    </div>
  )
}

export function FormMessagePreview() {
  return (
    <div style={{ maxWidth: 380, width: '100%' }}>
      <FormField>
        <FormLabel required>Email</FormLabel>
        <Input error type="email" defaultValue="not-an-email" />
        <FormMessage>Enter a valid email address.</FormMessage>
      </FormField>
    </div>
  )
}

export function FormErrorPreview() {
  return (
    <div style={{ maxWidth: 440, width: '100%' }}>
      <FormError title="Couldn't save changes">
        Your session expired. Sign in again and retry.
      </FormError>
    </div>
  )
}

export function FormCompletePreview() {
  return (
    <form
      style={{ maxWidth: 400, width: '100%', display: 'flex', flexDirection: 'column', gap: 16 }}
      onSubmit={(e) => e.preventDefault()}
    >
      <FormField>
        <FormLabel required>Full name</FormLabel>
        <Input placeholder="Your full name" />
      </FormField>
      <FormField>
        <FormLabel required>Email</FormLabel>
        <Input type="email" placeholder="you@example.com" />
        <FormHelperText>We&apos;ll only use this for account notifications.</FormHelperText>
      </FormField>
      <FormField>
        <FormLabel required>Password</FormLabel>
        <Input type="password" error defaultValue="short" />
        <FormMessage>Must be at least 8 characters.</FormMessage>
      </FormField>
      <Button type="submit">Create account</Button>
    </form>
  )
}
