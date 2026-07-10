'use client'

import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarSeparator,
} from '@tokiui/ui'
import { NavMain } from './nav-main'
import { NavSecondary } from './nav-secondary'
import { NavUser } from './nav-user'
import { Logo } from './icons'

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2.5 px-1 py-1.5">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Logo />
          </span>
          <div className="flex min-w-0 flex-col group-data-[state=collapsed]/sidebar:hidden">
            <span className="truncate text-sm font-semibold text-foreground">Acme Inc.</span>
            <span className="truncate text-xs text-muted-foreground">Pro workspace</span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <NavMain active="Overview" />
        <SidebarSeparator />
        <NavSecondary />
      </SidebarContent>

      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  )
}
