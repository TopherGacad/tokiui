import {
  SidebarProvider, Sidebar, SidebarTrigger, SidebarHeader, SidebarContent, SidebarFooter,
  SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarMenuBadge,
  SidebarInset,
  Card, Badge, Button, Avatar, Input,
} from '@tokiui/ui'

export const metadata = { title: 'Dashboard' }

/* ----- Inline icons ----- */
const ic = 'size-4 shrink-0'
const Grid = () => <svg className={ic} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>
const Chart = () => <svg className={ic} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M3 3v18h18"/><path d="M7 14l3-3 3 3 5-6"/></svg>
const Users = () => <svg className={ic} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/></svg>
const Box = () => <svg className={ic} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 8 12 3 3 8l9 5 9-5Z"/><path d="M3 8v8l9 5 9-5V8"/></svg>
const Gear = () => <svg className={ic} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z"/></svg>
const Bell = () => <svg className={ic} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>

const STATS = [
  { label: 'Revenue', value: '$48,250', delta: '+12.5%', tone: 'success' as const },
  { label: 'Orders', value: '1,429', delta: '+4.2%', tone: 'success' as const },
  { label: 'Customers', value: '892', delta: '-1.8%', tone: 'destructive' as const },
  { label: 'Churn', value: '2.4%', delta: '-0.6%', tone: 'success' as const },
]

const ORDERS = [
  { id: '#1042', customer: 'Acme Inc.', status: 'Paid', tone: 'success' as const, amount: '$1,200.00', date: 'Jun 24' },
  { id: '#1041', customer: 'Globex', status: 'Pending', tone: 'warning' as const, amount: '$640.00', date: 'Jun 23' },
  { id: '#1040', customer: 'Initech', status: 'Paid', tone: 'success' as const, amount: '$2,310.00', date: 'Jun 23' },
  { id: '#1039', customer: 'Umbrella Co.', status: 'Refunded', tone: 'destructive' as const, amount: '$180.00', date: 'Jun 22' },
  { id: '#1038', customer: 'Soylent', status: 'Paid', tone: 'success' as const, amount: '$95.00', date: 'Jun 22' },
]

const ACTIVITY = [
  { who: 'AC', what: 'Acme Inc. upgraded to Pro', when: '2m ago' },
  { who: 'GL', what: 'Globex placed order #1041', when: '1h ago' },
  { who: 'IN', what: 'Initech invited 3 teammates', when: '3h ago' },
  { who: 'SY', what: 'Soylent updated billing details', when: '5h ago' },
]

export default function DashboardExample() {
  return (
    <div className="mx-auto max-w-[1100px] px-6 py-10">
      <div className="overflow-hidden rounded-xl border border-border shadow-sm">
        <SidebarProvider className="h-[680px] bg-background">
          <Sidebar>
            <SidebarHeader>
              <div className="flex items-center gap-2 px-1 py-1.5">
                <span className="flex size-7 shrink-0 items-center justify-center rounded-md bg-primary font-mono text-xs font-bold text-primary-foreground">tu</span>
                <span className="truncate text-sm font-semibold text-foreground group-data-[state=collapsed]/sidebar:hidden">Acme Inc.</span>
              </div>
            </SidebarHeader>

            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupLabel>Overview</SidebarGroupLabel>
                <SidebarMenu>
                  <SidebarMenuItem><SidebarMenuButton isActive tooltip="Dashboard"><Grid /><span>Dashboard</span></SidebarMenuButton></SidebarMenuItem>
                  <SidebarMenuItem><SidebarMenuButton tooltip="Analytics"><Chart /><span>Analytics</span></SidebarMenuButton></SidebarMenuItem>
                  <SidebarMenuItem><SidebarMenuButton tooltip="Orders"><Box /><span>Orders</span><SidebarMenuBadge>12</SidebarMenuBadge></SidebarMenuButton></SidebarMenuItem>
                  <SidebarMenuItem><SidebarMenuButton tooltip="Customers"><Users /><span>Customers</span></SidebarMenuButton></SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroup>
              <SidebarGroup>
                <SidebarGroupLabel>Workspace</SidebarGroupLabel>
                <SidebarMenu>
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
              <h1 className="text-sm font-semibold text-foreground">Dashboard</h1>
              <div className="ml-auto flex items-center gap-2">
                <Input placeholder="Search…" className="hidden h-9 w-48 sm:block" />
                <Button variant="ghost" color="neutral" size="icon" aria-label="Notifications"><Bell /></Button>
                <Avatar size="sm" color="auto" fallback="JD" />
              </div>
            </header>

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto p-6">
              {/* Stat cards */}
              <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                {STATS.map((s) => (
                  <Card key={s.label} shadow="none" className="p-4">
                    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{s.label}</p>
                    <div className="mt-2 flex items-baseline justify-between gap-2">
                      <span className="text-2xl font-semibold tracking-tight text-foreground">{s.value}</span>
                      <Badge variant="soft" color={s.tone} size="sm">{s.delta}</Badge>
                    </div>
                  </Card>
                ))}
              </div>

              <div className="mt-6 grid gap-4 lg:grid-cols-3">
                {/* Orders table (hand-rolled — tokiui has no Data Table yet) */}
                <Card shadow="none" className="lg:col-span-2">
                  <div className="flex items-center justify-between border-b border-border p-4">
                    <h2 className="text-sm font-semibold text-foreground">Recent orders</h2>
                    <Button variant="ghost" color="neutral" size="sm">View all</Button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted-foreground">
                          <th className="px-4 py-2 font-medium">Order</th>
                          <th className="px-4 py-2 font-medium">Customer</th>
                          <th className="px-4 py-2 font-medium">Status</th>
                          <th className="px-4 py-2 text-right font-medium">Amount</th>
                          <th className="px-4 py-2 text-right font-medium">Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {ORDERS.map((o) => (
                          <tr key={o.id} className="border-b border-border last:border-0">
                            <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{o.id}</td>
                            <td className="px-4 py-3 font-medium text-foreground">{o.customer}</td>
                            <td className="px-4 py-3"><Badge variant="soft" color={o.tone} size="sm">{o.status}</Badge></td>
                            <td className="px-4 py-3 text-right tabular-nums text-foreground">{o.amount}</td>
                            <td className="px-4 py-3 text-right text-muted-foreground">{o.date}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Card>

                {/* Activity */}
                <Card shadow="none">
                  <div className="border-b border-border p-4">
                    <h2 className="text-sm font-semibold text-foreground">Activity</h2>
                  </div>
                  <ul className="divide-y divide-border">
                    {ACTIVITY.map((a, i) => (
                      <li key={i} className="flex items-center gap-3 p-4">
                        <Avatar size="sm" color="auto" fallback={a.who} />
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm text-foreground">{a.what}</p>
                          <p className="text-xs text-muted-foreground">{a.when}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>
            </div>
          </SidebarInset>
        </SidebarProvider>
      </div>
    </div>
  )
}
