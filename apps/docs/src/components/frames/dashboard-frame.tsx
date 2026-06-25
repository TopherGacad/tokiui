'use client'

import { useEffect, useState } from 'react'
import {
  SidebarProvider, Sidebar, SidebarTrigger, SidebarHeader, SidebarContent, SidebarFooter,
  SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarMenuBadge,
  SidebarInset,
  Card, Badge, Button, Avatar, Input, Progress,
  Tabs, TabsList, TabsTrigger,
  Select, SelectTrigger, SelectValue, SelectContent, SelectItem,
  Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationPrevious, PaginationNext, PaginationEllipsis,
} from '@tokiui/ui'
import { useMediaQuery } from '@tokiui/ui/client'
import type { ProgressColor } from '@tokiui/ui'
import { Sparkline, AreaChart, DonutChart, RadialRing } from './charts'

/* ----- Icons ----- */
const ic = 'size-4 shrink-0'
const Grid = () => <svg className={ic} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>
const Chart = () => <svg className={ic} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 3v18h18"/><path d="M7 14l3-3 3 3 5-6"/></svg>
const Users = () => <svg className={ic} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/></svg>
const Box = () => <svg className={ic} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 8 12 3 3 8l9 5 9-5Z"/><path d="M3 8v8l9 5 9-5V8"/></svg>
const Gear = () => <svg className={ic} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z"/></svg>
const Bell = () => <svg className={ic} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
const Dollar = () => <svg className={ic} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="12" y1="2" x2="12" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
const Download = () => <svg className={ic} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 3v12m0 0 4-4m-4 4-4-4M5 21h14"/></svg>
const ArrowUp = () => <svg className="size-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
const ArrowDown = () => <svg className="size-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 5v14M5 12l7 7 7-7"/></svg>

/* ----- Data ----- */
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const SERIES = {
  revenue: { total: '$48,250', delta: '+12.5%', up: true, data: [28, 31, 29, 37, 35, 41, 39, 47, 45, 51, 48, 58], compare: [24, 26, 28, 30, 29, 33, 34, 36, 37, 40, 41, 45] },
  orders:  { total: '1,429',   delta: '+4.2%',  up: true, data: [12, 14, 13, 16, 15, 18, 17, 19, 18, 21, 20, 23], compare: [11, 12, 13, 14, 14, 15, 16, 16, 17, 18, 18, 20] },
  users:   { total: '8,210',   delta: '+9.1%',  up: true, data: [40, 42, 44, 43, 48, 50, 52, 55, 57, 60, 63, 68], compare: [38, 39, 40, 41, 43, 45, 46, 48, 49, 51, 53, 56] },
}
type Metric = keyof typeof SERIES

type Tone = 'success' | 'warning' | 'destructive'
type KPI = { key: string; label: string; value: string; delta: string; up: boolean; spark: number[]; color: string; icon: React.ReactNode }

const KPIS: KPI[] = [
  { key: 'rev',  label: 'Revenue',      value: '$48,250', delta: '12.5%', up: true,  spark: [20, 24, 22, 30, 28, 36, 40], color: 'var(--primary)', icon: <Dollar /> },
  { key: 'ord',  label: 'Orders',       value: '1,429',   delta: '4.2%',  up: true,  spark: [12, 14, 13, 16, 18, 17, 21], color: 'var(--info)',    icon: <Box /> },
  { key: 'usr',  label: 'Active users', value: '8,210',   delta: '9.1%',  up: true,  spark: [40, 44, 43, 50, 55, 60, 68], color: 'var(--success)', icon: <Users /> },
  { key: 'conv', label: 'Conversion',   value: '3.84%',   delta: '0.4%',  up: false, spark: [42, 41, 43, 40, 38, 39, 37], color: 'var(--warning)', icon: <Chart /> },
]

const CHANNELS = [
  { label: 'Direct',         value: 42, amount: '$20,265', color: 'var(--primary)' },
  { label: 'Organic search', value: 28, amount: '$13,510', color: 'var(--info)' },
  { label: 'Referral',       value: 18, amount: '$8,685',  color: 'var(--warning)' },
  { label: 'Social',         value: 12, amount: '$5,790',  color: 'var(--success)' },
]

const TX: { name: string; email: string; status: string; tone: Tone; method: string; amount: string; date: string }[] = [
  { name: 'Olivia Martin',   email: 'olivia@example.com',   status: 'Paid',     tone: 'success',     method: 'Visa •• 4291',       amount: '$1,200.00', date: 'Jun 24' },
  { name: 'Jackson Lee',     email: 'jackson@example.com',  status: 'Pending',  tone: 'warning',     method: 'PayPal',             amount: '$640.00',   date: 'Jun 23' },
  { name: 'Isabella Nguyen', email: 'isabella@example.com', status: 'Paid',     tone: 'success',     method: 'Mastercard •• 8820', amount: '$2,310.00', date: 'Jun 23' },
  { name: 'William Kim',     email: 'william@example.com',  status: 'Refunded', tone: 'destructive', method: 'Visa •• 1043',       amount: '$180.00',   date: 'Jun 22' },
  { name: 'Sofia Davis',     email: 'sofia@example.com',    status: 'Paid',     tone: 'success',     method: 'Amex •• 0007',       amount: '$95.00',    date: 'Jun 22' },
]

const PRODUCTS: { name: string; amount: string; pct: number; color: ProgressColor }[] = [
  { name: 'Pro plan',   amount: '$18,200', pct: 64, color: 'default' },
  { name: 'Team plan',  amount: '$9,400',  pct: 38, color: 'info' },
  { name: 'Enterprise', amount: '$6,100',  pct: 24, color: 'success' },
  { name: 'Add-ons',    amount: '$3,250',  pct: 14, color: 'warning' },
]

const initials = (n: string) => n.split(' ').map((w) => w[0]).slice(0, 2).join('')

export function DashboardFrame() {
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const [open, setOpen] = useState(true)
  useEffect(() => { setOpen(isDesktop) }, [isDesktop])

  const [metric, setMetric] = useState<Metric>('revenue')
  const series = SERIES[metric]

  return (
    <SidebarProvider open={open} onOpenChange={setOpen} className="h-dvh bg-background">
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2 px-1 py-1.5">
            <span className="flex size-7 shrink-0 items-center justify-center rounded-md bg-primary font-mono text-xs font-bold text-primary-foreground">tu</span>
            <span className="truncate text-sm font-medium text-foreground group-data-[state=collapsed]/sidebar:hidden">Acme Inc.</span>
          </div>
        </SidebarHeader>
        <SidebarContent className="gap-4">
          <SidebarGroup className="gap-1.5">
            <SidebarGroupLabel>Overview</SidebarGroupLabel>
            <SidebarMenu className="gap-1">
              <SidebarMenuItem><SidebarMenuButton isActive tooltip="Dashboard"><Grid /><span>Dashboard</span></SidebarMenuButton></SidebarMenuItem>
              <SidebarMenuItem><SidebarMenuButton tooltip="Analytics"><Chart /><span>Analytics</span></SidebarMenuButton></SidebarMenuItem>
              <SidebarMenuItem><SidebarMenuButton tooltip="Orders"><Box /><span>Orders</span><SidebarMenuBadge>12</SidebarMenuBadge></SidebarMenuButton></SidebarMenuItem>
              <SidebarMenuItem><SidebarMenuButton tooltip="Customers"><Users /><span>Customers</span></SidebarMenuButton></SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
          <SidebarGroup className="gap-1.5">
            <SidebarGroupLabel>Workspace</SidebarGroupLabel>
            <SidebarMenu className="gap-1">
              <SidebarMenuItem><SidebarMenuButton tooltip="Settings"><Gear /><span>Settings</span></SidebarMenuButton></SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <div className="flex items-center gap-2 rounded-md px-1 py-1.5">
            <Avatar size="sm" color="auto" fallback="JD" />
            <div className="min-w-0 group-data-[state=collapsed]/sidebar:hidden">
              <p className="truncate text-sm font-medium text-foreground">Jane Doe</p>
              <p className="truncate text-xs text-muted-foreground">jane@example.com</p>
            </div>
          </div>
        </SidebarFooter>
      </Sidebar>

      <SidebarInset>
        {/* Topbar */}
        <header className="flex h-14 shrink-0 items-center gap-3 border-b border-border px-4">
          <SidebarTrigger />
          <h1 className="text-sm font-medium text-foreground">Dashboard</h1>
          <div className="ml-auto flex items-center gap-2">
            <Input placeholder="Search…" className="hidden h-9 w-44 lg:block" />
            <Button variant="ghost" color="neutral" size="icon" aria-label="Notifications"><Bell /></Button>
            <Avatar size="sm" color="auto" fallback="JD" />
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {/* Page header */}
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-xl font-medium tracking-tight text-foreground sm:text-2xl">Overview</h2>
              <p className="mt-1 text-sm text-muted-foreground">Performance summary for your workspace this month.</p>
            </div>
            <div className="flex items-center gap-2">
              <Select defaultValue="30d">
                <SelectTrigger className="h-9 w-[150px]"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                  <SelectItem value="90d">Last 90 days</SelectItem>
                  <SelectItem value="ytd">Year to date</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" color="neutral" className="h-9"><Download />Export</Button>
            </div>
          </div>

          {/* KPI cards */}
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {KPIS.map((k) => (
              <Card key={k.key} shadow="none" className="p-5">
                <div className="flex items-center justify-between">
                  <span className="flex size-9 items-center justify-center rounded-lg bg-muted text-muted-foreground">{k.icon}</span>
                  <Badge variant="soft" color={k.up ? 'success' : 'destructive'} size="sm" className="gap-0.5">
                    {k.up ? <ArrowUp /> : <ArrowDown />}{k.delta}
                  </Badge>
                </div>
                <p className="mt-4 text-sm text-muted-foreground">{k.label}</p>
                <div className="mt-1 flex items-end justify-between gap-2">
                  <span className="text-2xl font-semibold tracking-tight text-foreground">{k.value}</span>
                  <Sparkline data={k.spark} color={k.color} />
                </div>
              </Card>
            ))}
          </div>

          {/* Analytics row */}
          <div className="mt-4 grid gap-4 xl:grid-cols-3">
            {/* Revenue area chart */}
            <Card shadow="none" className="xl:col-span-2">
              <div className="flex flex-wrap items-start justify-between gap-3 p-5 pb-2">
                <div>
                  <h3 className="text-sm font-medium text-foreground">Revenue trend</h3>
                  <p className="mt-1 text-2xl font-semibold tracking-tight text-foreground">{series.total}</p>
                  <p className="mt-0.5 text-xs">
                    <span className={series.up ? 'text-success' : 'text-destructive'}>{series.delta}</span>
                    <span className="text-muted-foreground"> vs last period</span>
                  </p>
                </div>
                <Tabs value={metric} onValueChange={(v) => setMetric(v as Metric)}>
                  <TabsList variant="pills">
                    <TabsTrigger variant="pills" value="revenue">Revenue</TabsTrigger>
                    <TabsTrigger variant="pills" value="orders">Orders</TabsTrigger>
                    <TabsTrigger variant="pills" value="users">Users</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              <div className="px-5 pb-5">
                <AreaChart data={series.data} compare={series.compare} height={220} gradientId={`area-${metric}`} />
                <div className="mt-2 flex justify-between text-[10px] text-muted-foreground">
                  {MONTHS.map((m) => <span key={m}>{m}</span>)}
                </div>
                <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-primary" />This period</span>
                  <span className="flex items-center gap-1.5"><span className="h-[2px] w-3.5 rounded bg-muted-foreground" />Previous</span>
                </div>
              </div>
            </Card>

            {/* Channel donut */}
            <Card shadow="none" className="p-5">
              <h3 className="text-sm font-medium text-foreground">Traffic by channel</h3>
              <div className="mt-4 flex items-center justify-center">
                <div className="relative">
                  <DonutChart segments={CHANNELS.map((c) => ({ value: c.value, color: c.color }))} />
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-xl font-semibold tracking-tight text-foreground">$48.2k</span>
                    <span className="text-xs text-muted-foreground">total</span>
                  </div>
                </div>
              </div>
              <div className="mt-5 space-y-2.5">
                {CHANNELS.map((c) => (
                  <div key={c.label} className="flex items-center gap-2 text-sm">
                    <span className="size-2.5 shrink-0 rounded-full" style={{ background: c.color }} />
                    <span className="text-foreground">{c.label}</span>
                    <span className="ml-auto tabular-nums text-muted-foreground">{c.value}%</span>
                    <span className="w-16 text-right tabular-nums text-foreground">{c.amount}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Lower row */}
          <div className="mt-4 grid gap-4 xl:grid-cols-3">
            {/* Transactions */}
            <Card shadow="none" className="xl:col-span-2">
              <div className="flex flex-wrap items-center justify-between gap-3 p-5">
                <div>
                  <h3 className="text-sm font-medium text-foreground">Recent transactions</h3>
                  <p className="mt-0.5 text-xs text-muted-foreground">240 total this month</p>
                </div>
                <Button variant="outline" color="neutral" size="sm">View all</Button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-y border-border bg-muted/40 text-left text-[11px] uppercase tracking-wide text-muted-foreground">
                      <th className="px-5 py-2.5 font-medium">Customer</th>
                      <th className="px-3 py-2.5 font-medium">Status</th>
                      <th className="hidden px-3 py-2.5 font-medium sm:table-cell">Method</th>
                      <th className="px-3 py-2.5 text-right font-medium">Amount</th>
                      <th className="hidden px-5 py-2.5 text-right font-medium sm:table-cell">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {TX.map((t) => (
                      <tr key={t.email} className="border-b border-border transition-colors last:border-0 hover:bg-muted/50">
                        <td className="px-5 py-3">
                          <div className="flex items-center gap-3">
                            <Avatar size="sm" color="auto" fallback={initials(t.name)} />
                            <div className="min-w-0">
                              <p className="truncate font-medium text-foreground">{t.name}</p>
                              <p className="truncate text-xs text-muted-foreground">{t.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-3 py-3"><Badge variant="soft" color={t.tone} size="sm">{t.status}</Badge></td>
                        <td className="hidden whitespace-nowrap px-3 py-3 text-muted-foreground sm:table-cell">{t.method}</td>
                        <td className="whitespace-nowrap px-3 py-3 text-right font-medium tabular-nums text-foreground">{t.amount}</td>
                        <td className="hidden whitespace-nowrap px-5 py-3 text-right text-muted-foreground sm:table-cell">{t.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border p-4">
                <p className="text-xs text-muted-foreground">Showing 1–5 of 240</p>
                <Pagination className="mx-0 w-auto justify-end">
                  <PaginationContent>
                    <PaginationItem><PaginationPrevious href="#" /></PaginationItem>
                    <PaginationItem><PaginationLink href="#" isActive>1</PaginationLink></PaginationItem>
                    <PaginationItem><PaginationLink href="#">2</PaginationLink></PaginationItem>
                    <PaginationItem><PaginationLink href="#">3</PaginationLink></PaginationItem>
                    <PaginationItem><PaginationEllipsis /></PaginationItem>
                    <PaginationItem><PaginationNext href="#" /></PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            </Card>

            {/* Side panel */}
            <div className="grid gap-4">
              <Card shadow="none" className="p-5">
                <h3 className="text-sm font-medium text-foreground">Monthly target</h3>
                <div className="mt-3 flex items-center justify-center">
                  <RadialRing value={78} color="var(--primary)">
                    <span className="text-2xl font-semibold tracking-tight text-foreground">78%</span>
                    <span className="text-[11px] text-muted-foreground">reached</span>
                  </RadialRing>
                </div>
                <p className="mt-3 text-center text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">$48.2k</span> of $62k goal
                </p>
              </Card>

              <Card shadow="none" className="p-5">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-foreground">Top products</h3>
                  <Button variant="ghost" color="neutral" size="sm" className="h-7 text-xs">View all</Button>
                </div>
                <div className="mt-4 space-y-4">
                  {PRODUCTS.map((p) => (
                    <div key={p.name}>
                      <div className="mb-1.5 flex items-center justify-between text-sm">
                        <span className="text-foreground">{p.name}</span>
                        <span className="tabular-nums text-muted-foreground">{p.amount}</span>
                      </div>
                      <Progress value={p.pct} color={p.color} size="sm" />
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
