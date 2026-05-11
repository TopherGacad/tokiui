'use client'

import { useState } from 'react'
import { Input, FormField, FormLabel, FormMessage } from '@tokiui/ui'

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ width: '100%', height: '100%' }}>
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ width: '100%', height: '100%' }}>
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  )
}

export function InputDefaultPreview() {
  return <Input placeholder="Email address" style={{ maxWidth: 360 }} />
}

export function InputSizesPreview() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, maxWidth: 360, width: '100%' }}>
      <Input size="sm" placeholder="Small" />
      <Input size="default" placeholder="Default" />
      <Input size="lg" placeholder="Large" />
    </div>
  )
}

export function InputStartIconPreview() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, maxWidth: 360, width: '100%' }}>
      <Input startIcon={<SearchIcon />} placeholder="Search…" />
      <Input startIcon={<MailIcon />} placeholder="Email address" type="email" />
    </div>
  )
}

export function InputErrorPreview() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 360, width: '100%' }}>
      <FormField>
        <FormLabel required>Email</FormLabel>
        <Input error placeholder="you@example.com" type="email" defaultValue="not-an-email" />
        <FormMessage>Enter a valid email address.</FormMessage>
      </FormField>
      <FormField>
        <FormLabel required>Username</FormLabel>
        <Input error placeholder="username" />
        <FormMessage>Username is required.</FormMessage>
      </FormField>
    </div>
  )
}

export function InputClearablePreview() {
  const [value, setValue] = useState('Hello world')

  return (
    <Input
      style={{ maxWidth: 360 }}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onClear={() => setValue('')}
      clearable
      placeholder="Type something…"
    />
  )
}

export function InputPasswordPreview() {
  return (
    <Input
      type="password"
      style={{ maxWidth: 360 }}
      defaultValue="supersecret"
      placeholder="Password"
    />
  )
}

export function InputDisabledPreview() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, maxWidth: 360, width: '100%' }}>
      <Input disabled placeholder="Disabled input" />
      <Input disabled defaultValue="Read-only value" />
    </div>
  )
}

export function InputWithFormPreview() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 360, width: '100%' }}>
      <FormField>
        <FormLabel required>Email</FormLabel>
        <Input type="email" placeholder="you@example.com" startIcon={<MailIcon />} />
      </FormField>
      <FormField>
        <FormLabel required>Password</FormLabel>
        <Input type="password" placeholder="Enter your password" />
      </FormField>
    </div>
  )
}
