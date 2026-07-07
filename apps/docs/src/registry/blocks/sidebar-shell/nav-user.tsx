'use client'

// The footer identity block. Labels hide automatically when the sidebar
// collapses to its icon rail (via the parent's data-state group).
export function NavUser({
  name = 'Olivia Martin',
  email = 'olivia@example.com',
  initials = 'OM',
}: {
  name?: string
  email?: string
  initials?: string
}) {
  return (
    <div className="flex items-center gap-2.5 rounded-md p-1.5 transition-colors hover:bg-muted">
      <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/15 text-xs font-semibold text-primary">
        {initials}
      </span>
      <div className="flex min-w-0 flex-col group-data-[state=collapsed]/sidebar:hidden">
        <span className="truncate text-[13px] font-medium text-foreground">{name}</span>
        <span className="truncate text-xs text-muted-foreground">{email}</span>
      </div>
    </div>
  )
}
