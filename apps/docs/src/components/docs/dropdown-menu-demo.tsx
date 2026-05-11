'use client'

import { useState } from 'react'
import React from 'react'
import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent,
  DropdownMenuGroup, DropdownMenuRadioGroup,
  DropdownMenuItem, DropdownMenuCheckboxItem, DropdownMenuRadioItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut,
  DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuSubContent,
} from '@tokiui/ui'

/* ----- Shared trigger button ----- */
const Trigger = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement> & { children?: React.ReactNode }>(
  ({ children = 'Open menu', ...props }, ref) => (
    <button
      ref={ref}
      {...props}
      style={{
        height: 36, padding: '0 14px', borderRadius: 8,
        border: '1px solid var(--border)', background: 'var(--background)',
        fontSize: 14, fontWeight: 500, color: 'var(--foreground)',
        cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6,
        ...props.style,
      }}
    >
      {children}
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="6 9 12 15 18 9" />
      </svg>
    </button>
  )
)

/* ================================================================
   1. BASIC
   ================================================================ */

export function DropdownMenuBasicPreview() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild><Trigger /></DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuItem>Help</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Sign out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

/* ================================================================
   2. WITH ICONS
   ================================================================ */

const UserIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
  </svg>
)
const SettingsIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="3" /><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14" />
  </svg>
)
const BellIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
)
const HelpIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
)
const LogOutIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" />
  </svg>
)

export function DropdownMenuIconsPreview() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild><Trigger /></DropdownMenuTrigger>
      <DropdownMenuContent className="w-48">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem><UserIcon />Profile</DropdownMenuItem>
          <DropdownMenuItem><SettingsIcon />Settings</DropdownMenuItem>
          <DropdownMenuItem><BellIcon />Notifications</DropdownMenuItem>
          <DropdownMenuItem><HelpIcon />Help</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-destructive focus:text-destructive focus:bg-destructive/10">
          <LogOutIcon />Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

/* ================================================================
   3. WITH SHORTCUTS
   ================================================================ */

export function DropdownMenuShortcutsPreview() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild><Trigger /></DropdownMenuTrigger>
      <DropdownMenuContent className="w-52">
        <DropdownMenuGroup>
          <DropdownMenuItem><UserIcon />Profile<DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut></DropdownMenuItem>
          <DropdownMenuItem><SettingsIcon />Settings<DropdownMenuShortcut>⌘,</DropdownMenuShortcut></DropdownMenuItem>
          <DropdownMenuItem><BellIcon />Notifications<DropdownMenuShortcut>⌘N</DropdownMenuShortcut></DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem disabled><HelpIcon />API Keys<DropdownMenuShortcut>⌘K</DropdownMenuShortcut></DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-destructive focus:text-destructive focus:bg-destructive/10">
          <LogOutIcon />Sign out<DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

/* ================================================================
   4. CHECKBOX ITEMS
   ================================================================ */

export function DropdownMenuCheckboxPreview() {
  const [cols, setCols] = useState({ assignee: true, dueDate: true, priority: false, labels: false })

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild><Trigger>Columns</Trigger></DropdownMenuTrigger>
      <DropdownMenuContent className="w-48">
        <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem checked={cols.assignee}  onCheckedChange={(v) => setCols(p => ({ ...p, assignee: v }))}>Assignee</DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem checked={cols.dueDate}   onCheckedChange={(v) => setCols(p => ({ ...p, dueDate: v }))}>Due date</DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem checked={cols.priority}  onCheckedChange={(v) => setCols(p => ({ ...p, priority: v }))}>Priority</DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem checked={cols.labels}    onCheckedChange={(v) => setCols(p => ({ ...p, labels: v }))}>Labels</DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

/* ================================================================
   5. RADIO GROUP
   ================================================================ */

export function DropdownMenuRadioPreview() {
  const [position, setPosition] = useState('bottom')

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild><Trigger>Panel position</Trigger></DropdownMenuTrigger>
      <DropdownMenuContent className="w-44">
        <DropdownMenuLabel>Position</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
          <DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="right">Right</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="bottom">Bottom</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="left">Left</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

/* ================================================================
   6. WITH SUBMENU
   ================================================================ */

const ShareIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
  </svg>
)
const TrashIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14H6L5 6" /><path d="M10 11v6M14 11v6" /><path d="M9 6V4h6v2" />
  </svg>
)
const UsersIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
)
const KeyIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
  </svg>
)
const PlusIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
  </svg>
)
const CheckIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

export function DropdownMenuSubmenuPreview() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild><Trigger>More options</Trigger></DropdownMenuTrigger>
      <DropdownMenuContent className="w-52">
        <DropdownMenuItem><UserIcon />View profile</DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger><ShareIcon />Share</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem>Copy link</DropdownMenuItem>
            <DropdownMenuItem>Email</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Twitter / X</DropdownMenuItem>
            <DropdownMenuItem>LinkedIn</DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-destructive focus:text-destructive focus:bg-destructive/10">
          <TrashIcon />Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

/* ================================================================
   7. AVATAR DROPDOWN
   ================================================================ */

const AvatarTrigger = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  (props, ref) => (
    <button
      ref={ref}
      {...props}
      style={{
        width: 36, height: 36, borderRadius: '50%',
        background: 'var(--primary)', color: 'var(--primary-foreground)',
        border: 'none', cursor: 'pointer',
        fontSize: 13, fontWeight: 600,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      SC
    </button>
  )
)

export function DropdownMenuAvatarPreview() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild><AvatarTrigger /></DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <div style={{ padding: '10px 12px 8px' }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--foreground)', margin: 0 }}>sc</p>
          <p style={{ fontSize: 12, color: 'var(--muted-foreground)', margin: '1px 0 0' }}>sc@company.com</p>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem><UserIcon />View profile</DropdownMenuItem>
          <DropdownMenuItem><SettingsIcon />Preferences</DropdownMenuItem>
          <DropdownMenuItem><KeyIcon />API keys<DropdownMenuShortcut>⌘K</DropdownMenuShortcut></DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem><UsersIcon />Invite members</DropdownMenuItem>
          <DropdownMenuItem><HelpIcon />Documentation</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-destructive focus:text-destructive focus:bg-destructive/10">
          <LogOutIcon />Sign out<DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

/* ================================================================
   8. COMPLEX DROPDOWN
   ================================================================ */

const REPOS = [
  { id: 'tokiui',        name: 'tokiui',         role: 'Owner'  },
  { id: 'design-system', name: 'design-system',  role: 'Admin'  },
  { id: 'docs-site',     name: 'docs-site',       role: 'Member' },
]

export function DropdownMenuComplexPreview() {
  const [repo, setRepo] = useState('tokiui')
  const current = REPOS.find(r => r.id === repo)!

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Trigger>{current.name}</Trigger>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64">
        <div style={{ padding: '10px 12px 8px', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
            background: 'var(--primary)', color: 'var(--primary-foreground)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 12, fontWeight: 700,
          }}>SC</div>
          <div>
            <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--foreground)', margin: 0 }}>sc</p>
            <p style={{ fontSize: 11, color: 'var(--muted-foreground)', margin: 0 }}>sc@company.com</p>
          </div>
        </div>
        <DropdownMenuSeparator />

        <DropdownMenuLabel>Repositories</DropdownMenuLabel>
        {REPOS.map((r) => (
          <DropdownMenuItem
            key={r.id}
            onSelect={() => setRepo(r.id)}
            style={{ justifyContent: 'space-between' }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{
                width: 22, height: 22, borderRadius: 6,
                background: r.id === 'tokiui' ? 'color-mix(in oklch, var(--primary) 15%, var(--background))' : 'var(--muted)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 10, fontWeight: 700, color: 'var(--foreground)', flexShrink: 0,
                fontFamily: 'var(--font-mono)',
              }}>
                {r.name[0]}
              </span>
              <span>
                <span style={{ display: 'block', fontSize: 13, fontWeight: 500, color: 'var(--foreground)', fontFamily: 'var(--font-mono)' }}>{r.name}</span>
                <span style={{ display: 'block', fontSize: 11, color: 'var(--muted-foreground)' }}>{r.role}</span>
              </span>
            </span>
            {repo === r.id && <CheckIcon />}
          </DropdownMenuItem>
        ))}
        <DropdownMenuItem>
          <PlusIcon />New repository
        </DropdownMenuItem>
        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem><SettingsIcon />Repository settings<DropdownMenuShortcut>⌘,</DropdownMenuShortcut></DropdownMenuItem>
          <DropdownMenuItem><UsersIcon />Manage collaborators</DropdownMenuItem>
          <DropdownMenuItem><KeyIcon />Deploy keys</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-destructive focus:text-destructive focus:bg-destructive/10">
          <LogOutIcon />Sign out<DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
