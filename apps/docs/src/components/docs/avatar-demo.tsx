'use client'

import { Avatar, AvatarGroup } from '@tokiui/ui'

/* ================================================================
   1. SIZES
   ================================================================ */

export function AvatarSizesPreview() {
  return (
    <div className="flex items-end gap-4">
      <Avatar size="sm"      fallback="SM" />
      <Avatar size="default" fallback="MD" />
      <Avatar size="lg"      fallback="LG" />
      <Avatar size="xl"      fallback="XL" />
    </div>
  )
}

/* ================================================================
   2. WITH IMAGE
   ================================================================ */

export function AvatarImagePreview() {
  return (
    <div className="flex items-end gap-4">
      <Avatar src="/profile_1.jpg" alt="Profile photo" size="sm" />
      <Avatar src="/profile_1.jpg" alt="Profile photo" size="default" />
      <Avatar src="/profile_1.jpg" alt="Profile photo" size="lg" />
      <Avatar src="/profile_1.jpg" alt="Profile photo" size="xl" />
    </div>
  )
}

/* ================================================================
   3. FALLBACK STATES
   ================================================================ */

export function AvatarFallbackPreview() {
  return (
    <div className="flex items-center gap-4">
      <Avatar fallback="JD" size="default" />
      <Avatar fallback="A"  size="default" />
      <Avatar                size="default" />
    </div>
  )
}

/* ================================================================
   4. COLORS
   ================================================================ */

export function AvatarColorsPreview() {
  const colors = [
    { color: 'default', label: 'Default', fallback: 'Df' },
    { color: 'primary', label: 'Primary', fallback: 'Pr' },
    { color: 'green',   label: 'Green',   fallback: 'Gr' },
    { color: 'amber',   label: 'Amber',   fallback: 'Am' },
    { color: 'sky',     label: 'Sky',     fallback: 'Sk' },
    { color: 'red',     label: 'Red',     fallback: 'Re' },
    { color: 'slate',   label: 'Slate',   fallback: 'Sl' },
  ] as const

  return (
    <div className="flex flex-wrap gap-6">
      {colors.map(({ color, label, fallback }) => (
        <div key={color} className="flex flex-col items-center gap-2">
          <Avatar color={color} fallback={fallback} />
          <span className="text-xs text-muted-foreground">{label}</span>
        </div>
      ))}
    </div>
  )
}

/* ================================================================
   5. AUTO COLOR
   ================================================================ */

export function AvatarAutoColorPreview() {
  const names = [
    'Morgan Lee',
    'Sam Torres',
    'Riley Chen',
    'Jordan Park',
    'Casey Wright',
    'Quinn Adams',
  ]

  return (
    <div className="flex flex-col gap-3">
      {names.map((name) => {
        const initials = name.split(' ').map(n => n[0]).join('')
        return (
          <div key={name} className="flex items-center gap-3">
            <Avatar color="auto" fallback={initials} size="default" />
            <span className="text-sm">{name}</span>
          </div>
        )
      })}
    </div>
  )
}

/* ================================================================
   6. STATUS
   ================================================================ */

export function AvatarStatusPreview() {
  const statuses = [
    { status: 'online',  label: 'Online' },
    { status: 'offline', label: 'Offline' },
    { status: 'busy',    label: 'Busy' },
    { status: 'away',    label: 'Away' },
  ] as const

  return (
    <div className="flex gap-8">
      {statuses.map(({ status, label }) => (
        <div key={status} className="flex flex-col items-center gap-2">
          <Avatar status={status} fallback={label[0]} color="primary" />
          <span className="text-xs text-muted-foreground">{label}</span>
        </div>
      ))}
    </div>
  )
}

/* ================================================================
   7. GROUP
   ================================================================ */

export function AvatarGroupPreview() {
  return (
    <div className="flex flex-col gap-6">
      <AvatarGroup size="default">
        <Avatar color="auto" fallback="JD" />
        <Avatar color="auto" fallback="AR" />
        <Avatar color="auto" fallback="MK" />
        <Avatar color="auto" fallback="TS" />
      </AvatarGroup>

      <AvatarGroup size="default" max={3}>
        <Avatar color="auto" fallback="JD" />
        <Avatar color="auto" fallback="AR" />
        <Avatar color="auto" fallback="MK" />
        <Avatar color="auto" fallback="TS" />
        <Avatar color="auto" fallback="PL" />
      </AvatarGroup>
    </div>
  )
}

/* ================================================================
   8. TEAM LIST
   ================================================================ */

export function AvatarTeamPreview() {
  const team = [
    { name: 'Morgan Lee',   role: 'Product Manager',   status: 'online'  },
    { name: 'Sam Torres',   role: 'Frontend Engineer', status: 'busy'    },
    { name: 'Riley Chen',   role: 'UX Designer',       status: 'away'    },
    { name: 'Jordan Park',  role: 'Backend Engineer',  status: 'offline' },
    { name: 'Casey Wright', role: 'QA Engineer',       status: 'online'  },
  ] as const

  const statusColor: Record<string, string> = {
    online:  'text-success',
    busy:    'text-destructive',
    away:    'text-warning',
    offline: 'text-muted-foreground',
  }

  return (
    <div className="w-full max-w-sm rounded-xl border border-border bg-background p-4 dark:bg-[oklch(0.26_0.005_95)] dark:border-white/10">
      <h3 className="text-sm font-semibold mb-3">Team members</h3>
      <div className="flex flex-col divide-y divide-border dark:divide-white/10">
        {team.map(({ name, role, status }) => {
          const initials = name.split(' ').map(n => n[0]).join('')
          return (
            <div key={name} className="flex items-center gap-3 py-2.5">
              <Avatar color="auto" fallback={initials} status={status} size="default" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{name}</p>
                <p className="text-xs text-muted-foreground truncate">{role}</p>
              </div>
              <span className={`text-xs font-medium capitalize ${statusColor[status]}`}>
                {status}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

/* ================================================================
   9. IN CONTEXT (comment thread)
   ================================================================ */

export function AvatarContextPreview() {
  return (
    <div className="flex flex-col gap-4 w-full max-w-sm">
      {[
        { initials: 'JD', name: 'Jamie Doe',   time: '2m ago',  msg: 'This looks great, nice work everyone.' },
        { initials: 'AR', name: 'Alex Rivera', time: '5m ago',  msg: 'Left some comments on the design file.' },
        { initials: 'MK', name: 'Morgan Kim',  time: '12m ago', msg: 'Approved — ready to ship.' },
      ].map(({ initials, name, time, msg }) => (
        <div key={initials} className="flex gap-3">
          <Avatar color="auto" fallback={initials} size="default" className="shrink-0 mt-0.5" />
          <div className="flex-1 min-w-0">
            <div className="flex items-baseline gap-2">
              <span className="text-sm font-medium">{name}</span>
              <span className="text-xs text-muted-foreground">{time}</span>
            </div>
            <p className="text-sm text-muted-foreground mt-0.5">{msg}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
