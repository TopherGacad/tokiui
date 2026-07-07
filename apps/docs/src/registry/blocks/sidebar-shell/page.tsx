'use client'

import { SidebarProvider, SidebarInset, SidebarTrigger } from '@tokiui/ui'
import { AppSidebar } from './app-sidebar'
import { Search, Bell } from './icons'

export default function Page() {
  return (
    <SidebarProvider className="h-dvh bg-background">
      <AppSidebar />
      <SidebarInset className="min-w-0">
        <header className="flex h-14 shrink-0 items-center gap-3 border-b border-border px-4">
          <SidebarTrigger />
          <div className="h-5 w-px bg-border" />
          <nav aria-label="Breadcrumb" className="flex min-w-0 items-center gap-2 text-sm text-muted-foreground">
            <span className="hidden sm:inline">Acme Inc.</span>
            <span aria-hidden="true" className="hidden sm:inline">/</span>
            <span className="truncate font-medium text-foreground">Overview</span>
          </nav>
          <div className="ml-auto flex items-center gap-1">
            <button type="button" aria-label="Search" className="flex size-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
              <Search />
            </button>
            <button type="button" aria-label="Notifications" className="flex size-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
              <Bell />
            </button>
          </div>
        </header>

        <div className="min-w-0 flex-1 overflow-y-auto p-6">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">Overview</h1>
          <p className="mt-1 max-w-prose text-sm text-muted-foreground">
            A prebuilt sidebar composed from tokiui primitives — collapse it to an icon rail with the
            toggle, expand the nested Projects group, and it retints with your theme automatically.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { label: 'Active projects', value: '12', delta: '+3 this month' },
              { label: 'Open tasks', value: '48', delta: '9 due today' },
              { label: 'Team members', value: '7', delta: '2 invited' },
            ].map((c) => (
              <div key={c.label} className="rounded-xl border border-border bg-card p-5 shadow-sm">
                <div className="text-[13px] text-muted-foreground">{c.label}</div>
                <div className="mt-1.5 text-2xl font-semibold tracking-tight text-foreground">{c.value}</div>
                <div className="mt-1 text-xs text-muted-foreground">{c.delta}</div>
              </div>
            ))}
          </div>

          <div className="mt-4 flex min-h-[220px] items-center justify-center rounded-xl border border-dashed border-border bg-muted/30 text-sm text-muted-foreground">
            Your page content goes here
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
