'use client'

import * as React from 'react'
import {
  SidebarProvider,
  Sidebar,
  SidebarTrigger,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarSeparator,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuBadge,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarInset,
} from '@tokiui/ui'
import { cn } from '@tokiui/ui'

/* ================================================================
   Shared icons
   ================================================================ */

function Icon({ d, ...p }: { d: string } & React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true" className="size-4 shrink-0" {...p}>
      <path d={d} />
    </svg>
  )
}

const Icons = {
  home:       () => <Icon d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />,
  inbox:      () => <Icon d="M22 12h-6l-2 3h-4l-2-3H2" />,
  calendar:   () => <Icon d="M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" />,
  files:      () => <Icon d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6" />,
  chart:      () => <Icon d="M3 3v18h18M7 16l4-4 4 4 4-6" />,
  users:      () => <Icon d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />,
  settings:   () => <Icon d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2zM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />,
  help:       () => <Icon d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01" />,
  tag:        () => <Icon d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z M7 7h.01" />,
  layers:     () => <Icon d="M12 2 2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />,
  bell:       () => <Icon d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0" />,
}

/* ================================================================
   1. BASIC — collapsible sidebar with groups
   ================================================================ */

const NAV_MAIN = [
  { label: 'Dashboard',    icon: Icons.home,     active: true,  badge: undefined },
  { label: 'Inbox',        icon: Icons.inbox,    active: false, badge: '12'      },
  { label: 'Calendar',     icon: Icons.calendar, active: false, badge: undefined },
  { label: 'Files',        icon: Icons.files,    active: false, badge: undefined },
]

const NAV_ANALYTICS = [
  { label: 'Overview',     icon: Icons.chart,    active: false },
  { label: 'Reports',      icon: Icons.layers,   active: false },
  { label: 'Audience',     icon: Icons.users,    active: false },
]

const NAV_BOTTOM = [
  { label: 'Settings',     icon: Icons.settings  },
  { label: 'Help',         icon: Icons.help      },
]

export function SidebarBasicPreview() {
  const [active, setActive] = React.useState('Dashboard')

  return (
    <div className="h-[420px] w-full overflow-hidden rounded-xl border border-border">
      <SidebarProvider defaultOpen style={{ height: '100%' }}>
        <Sidebar>
          <SidebarHeader>
            <SidebarMenuButton tooltip="tokiui" className="h-10 gap-3 font-semibold text-foreground hover:bg-transparent">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-primary-foreground text-xs font-bold shrink-0">
                T
              </div>
              <span className="truncate">tokiui</span>
            </SidebarMenuButton>
          </SidebarHeader>

          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Main</SidebarGroupLabel>
              <SidebarMenu>
                {NAV_MAIN.map(({ label, icon: NavIcon, badge }) => (
                  <SidebarMenuItem key={label}>
                    <SidebarMenuButton
                      tooltip={label}
                      isActive={active === label}
                      onClick={() => setActive(label)}
                    >
                      <NavIcon />
                      <span className="truncate">{label}</span>
                      {badge && <SidebarMenuBadge>{badge}</SidebarMenuBadge>}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel>Analytics</SidebarGroupLabel>
              <SidebarMenu>
                {NAV_ANALYTICS.map(({ label, icon: NavIcon }) => (
                  <SidebarMenuItem key={label}>
                    <SidebarMenuButton
                      tooltip={label}
                      isActive={active === label}
                      onClick={() => setActive(label)}
                    >
                      <NavIcon />
                      <span className="truncate">{label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>

          <SidebarSeparator />

          <SidebarFooter>
            <SidebarMenu>
              {NAV_BOTTOM.map(({ label, icon: NavIcon }) => (
                <SidebarMenuItem key={label}>
                  <SidebarMenuButton tooltip={label} onClick={() => setActive(label)} isActive={active === label}>
                    <NavIcon />
                    <span className="truncate">{label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>

        <SidebarInset>
          {/* Topbar */}
          <header className="flex h-12 shrink-0 items-center gap-3 border-b border-border px-4">
            <SidebarTrigger />
            <span className="text-sm font-medium text-foreground">{active}</span>
          </header>
          {/* Content placeholder */}
          <div className="flex flex-1 flex-col gap-3 p-4">
            <div className="grid grid-cols-3 gap-3">
              {['Total users', 'Revenue', 'Active now'].map((label, i) => (
                <div key={label} className="rounded-lg border border-border bg-card p-3">
                  <p className="text-xs text-muted-foreground">{label}</p>
                  <p className="mt-1 text-lg font-semibold">
                    {['24.5k', '$18.2k', '342'][i]}
                  </p>
                </div>
              ))}
            </div>
            <div className="flex-1 rounded-lg border border-border bg-card" />
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  )
}

/* ================================================================
   2. WITH USER FOOTER
   ================================================================ */

const NAV_WORKSPACE = [
  { label: 'Projects',    icon: Icons.layers,   badge: '4'  },
  { label: 'Team',        icon: Icons.users,    badge: undefined },
  { label: 'Billing',     icon: Icons.tag,      badge: undefined },
  { label: 'Notifications', icon: Icons.bell,   badge: '3'  },
]

export function SidebarUserPreview() {
  const [active, setActive] = React.useState('Projects')

  return (
    <div className="h-[420px] w-full overflow-hidden rounded-xl border border-border">
      <SidebarProvider defaultOpen style={{ height: '100%' }}>
        <Sidebar>
          <SidebarHeader>
            <SidebarMenuButton tooltip="Acme Inc" className="h-10 gap-3 font-semibold text-foreground hover:bg-transparent">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-border bg-muted text-xs font-bold">
                A
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-sm font-semibold">Acme Inc</span>
                <span className="text-xs text-muted-foreground">Pro plan</span>
              </div>
            </SidebarMenuButton>
          </SidebarHeader>

          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Workspace</SidebarGroupLabel>
              <SidebarMenu>
                {NAV_WORKSPACE.map(({ label, icon: NavIcon, badge }) => (
                  <SidebarMenuItem key={label}>
                    <SidebarMenuButton
                      tooltip={label}
                      isActive={active === label}
                      onClick={() => setActive(label)}
                    >
                      <NavIcon />
                      <span className="truncate">{label}</span>
                      {badge && <SidebarMenuBadge>{badge}</SidebarMenuBadge>}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>

          <SidebarSeparator />

          <SidebarFooter>
            <SidebarMenuButton tooltip="User settings" className="h-auto py-2 gap-3 text-foreground hover:bg-muted">
              {/* Avatar */}
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-semibold">
                JD
              </div>
              <div className="flex flex-col leading-none min-w-0">
                <span className="text-sm font-medium truncate">Jane Doe</span>
                <span className="text-xs text-muted-foreground truncate">jane@example.com</span>
              </div>
            </SidebarMenuButton>
          </SidebarFooter>
        </Sidebar>

        <SidebarInset>
          <header className="flex h-12 shrink-0 items-center gap-3 border-b border-border px-4">
            <SidebarTrigger />
            <span className="text-sm font-medium">{active}</span>
          </header>
          <div className="flex flex-1 flex-col gap-3 p-4">
            <div className="h-32 rounded-lg border border-border bg-card" />
            <div className="grid grid-cols-2 gap-3 flex-1">
              <div className="rounded-lg border border-border bg-card" />
              <div className="rounded-lg border border-border bg-card" />
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  )
}

/* ================================================================
   3. ICON RAIL — starts collapsed
   ================================================================ */

const NAV_RAIL = [
  { label: 'Home',      icon: Icons.home,     active: true  },
  { label: 'Analytics', icon: Icons.chart,    active: false },
  { label: 'Users',     icon: Icons.users,    active: false },
  { label: 'Files',     icon: Icons.files,    active: false },
  { label: 'Calendar',  icon: Icons.calendar, active: false },
]

export function SidebarIconRailPreview() {
  const [active, setActive] = React.useState('Home')

  return (
    <div className="h-[360px] w-full overflow-hidden rounded-xl border border-border">
      <SidebarProvider defaultOpen={false} style={{ height: '100%' }}>
        <Sidebar>
          <SidebarHeader>
            <SidebarMenuButton tooltip="tokiui" className="h-10 justify-center font-bold text-primary hover:bg-transparent">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-primary-foreground text-xs font-bold shrink-0">
                T
              </div>
            </SidebarMenuButton>
          </SidebarHeader>

          <SidebarContent>
            <SidebarMenu>
              {NAV_RAIL.map(({ label, icon: NavIcon }) => (
                <SidebarMenuItem key={label}>
                  <SidebarMenuButton
                    tooltip={label}
                    isActive={active === label}
                    onClick={() => setActive(label)}
                  >
                    <NavIcon />
                    <span className="truncate">{label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>

          <SidebarFooter>
            <SidebarMenuButton tooltip="Settings">
              <Icons.settings />
              <span className="truncate">Settings</span>
            </SidebarMenuButton>
          </SidebarFooter>
        </Sidebar>

        <SidebarInset>
          <header className="flex h-12 shrink-0 items-center gap-3 border-b border-border px-4">
            <SidebarTrigger />
            <span className="text-sm font-medium">{active}</span>
            <span className="ml-auto text-xs text-muted-foreground">Expand the sidebar →</span>
          </header>
          <div className="flex flex-1 flex-col gap-3 p-4">
            <div className="grid grid-cols-4 gap-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="rounded-lg border border-border bg-card p-3 space-y-2">
                  <div className="h-2 w-16 rounded bg-muted" />
                  <div className="h-5 w-10 rounded bg-muted" />
                </div>
              ))}
            </div>
            <div className="flex-1 rounded-lg border border-border bg-card" />
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  )
}

/* ================================================================
   4. GROUPS & COLLAPSIBLE SUB-MENUS
   ================================================================ */

function ChevronRight({ open }: { open: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true"
      className={cn(
        'size-4 shrink-0 ml-auto text-muted-foreground/70 transition-transform duration-200',
        open && 'rotate-90',
      )}
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  )
}

/** A nav item with a collapsible nested sub-menu, built from the SidebarMenuSub primitives. */
function CollapsibleNavItem({
  icon: NavIcon,
  label,
  items,
  active,
  onSelect,
}: {
  icon: React.ComponentType
  label: string
  items: string[]
  active: string
  onSelect: (value: string) => void
}) {
  const [open, setOpen] = React.useState(() => items.includes(active))

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        tooltip={label}
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        <NavIcon />
        <span className="truncate">{label}</span>
        <ChevronRight open={open} />
      </SidebarMenuButton>

      {/* SidebarMenuSub draws the indented, guide-lined list and hides itself
          automatically when the rail collapses to icon mode. */}
      {open && (
        <SidebarMenuSub>
          {items.map((sub) => (
            <SidebarMenuSubItem key={sub}>
              <SidebarMenuSubButton asChild isActive={active === sub}>
                <button type="button" onClick={() => onSelect(sub)}>
                  {sub}
                </button>
              </SidebarMenuSubButton>
            </SidebarMenuSubItem>
          ))}
        </SidebarMenuSub>
      )}
    </SidebarMenuItem>
  )
}

const SUBMENU_PLATFORM = [
  { icon: Icons.layers, label: 'Playground', items: ['History', 'Starred', 'Settings'] },
  { icon: Icons.chart,  label: 'Models',     items: ['Genesis', 'Explorer', 'Quantum'] },
]

const SUBMENU_PROJECTS = [
  { label: 'Design Engineering', icon: Icons.tag      },
  { label: 'Sales & Marketing',  icon: Icons.users    },
  { label: 'Travel',             icon: Icons.calendar },
]

export function SidebarSubmenuPreview() {
  const [active, setActive] = React.useState('Starred')

  return (
    <div className="h-[460px] w-full overflow-hidden rounded-xl border border-border">
      <SidebarProvider defaultOpen style={{ height: '100%' }}>
        <Sidebar>
          <SidebarHeader>
            <SidebarMenuButton tooltip="Acme Inc" className="h-10 gap-3 font-semibold text-foreground hover:bg-transparent">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground text-xs font-bold">
                A
              </div>
              <span className="truncate">Acme Inc</span>
            </SidebarMenuButton>
          </SidebarHeader>

          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Platform</SidebarGroupLabel>
              <SidebarMenu>
                {SUBMENU_PLATFORM.map(({ icon, label, items }) => (
                  <CollapsibleNavItem
                    key={label}
                    icon={icon}
                    label={label}
                    items={items}
                    active={active}
                    onSelect={setActive}
                  />
                ))}
                <SidebarMenuItem>
                  <SidebarMenuButton
                    tooltip="Documentation"
                    isActive={active === 'Documentation'}
                    onClick={() => setActive('Documentation')}
                  >
                    <Icons.files />
                    <span className="truncate">Documentation</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel>Projects</SidebarGroupLabel>
              <SidebarMenu>
                {SUBMENU_PROJECTS.map(({ label, icon: NavIcon }) => (
                  <SidebarMenuItem key={label}>
                    <SidebarMenuButton
                      tooltip={label}
                      isActive={active === label}
                      onClick={() => setActive(label)}
                    >
                      <NavIcon />
                      <span className="truncate">{label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>

          <SidebarSeparator />

          <SidebarFooter>
            <SidebarMenuButton tooltip="User settings" className="h-auto py-2 gap-3 text-foreground hover:bg-muted">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-semibold">
                JD
              </div>
              <div className="flex flex-col leading-none min-w-0">
                <span className="text-sm font-medium truncate">Jane Doe</span>
                <span className="text-xs text-muted-foreground truncate">jane@example.com</span>
              </div>
            </SidebarMenuButton>
          </SidebarFooter>
        </Sidebar>

        <SidebarInset>
          <header className="flex h-12 shrink-0 items-center gap-3 border-b border-border px-4">
            <SidebarTrigger />
            <span className="text-sm font-medium text-foreground">{active}</span>
          </header>
          <div className="flex flex-1 flex-col gap-3 p-4">
            <div className="h-28 rounded-lg border border-border bg-card" />
            <div className="grid flex-1 grid-cols-3 gap-3">
              <div className="rounded-lg border border-border bg-card" />
              <div className="rounded-lg border border-border bg-card" />
              <div className="rounded-lg border border-border bg-card" />
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  )
}
