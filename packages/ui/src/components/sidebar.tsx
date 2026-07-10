'use client'

import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import { cn } from '../lib/utils'

// ── Constants ─────────────────────────────────────────────────────

const SIDEBAR_WIDTH          = '240px'
const SIDEBAR_WIDTH_COLLAPSED = '56px'

// ── Context ───────────────────────────────────────────────────────

interface SidebarCtx {
  open: boolean
  setOpen: (v: boolean) => void
  toggle: () => void
}

const SidebarContext = React.createContext<SidebarCtx>({
  open: true,
  setOpen: () => {},
  toggle: () => {},
})

export function useSidebar() {
  return React.useContext(SidebarContext)
}

// ── SidebarProvider ───────────────────────────────────────────────

export interface SidebarProviderProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function SidebarProvider({
  defaultOpen = true,
  open: openProp,
  onOpenChange,
  className,
  style,
  children,
  ...props
}: SidebarProviderProps) {
  const [openState, setOpenState] = React.useState(defaultOpen)
  const open = openProp ?? openState

  const setOpen = React.useCallback(
    (v: boolean) => {
      setOpenState(v)
      onOpenChange?.(v)
    },
    [onOpenChange],
  )

  const toggle = React.useCallback(() => setOpen(!open), [open, setOpen])

  return (
    <TooltipPrimitive.Provider delayDuration={0}>
      <SidebarContext.Provider value={{ open, setOpen, toggle }}>
        <div
          style={{
            ['--sidebar-width' as string]: SIDEBAR_WIDTH,
            ['--sidebar-width-collapsed' as string]: SIDEBAR_WIDTH_COLLAPSED,
            ...style,
          }}
          className={cn('flex w-full', className)}
          {...props}
        >
          {children}
        </div>
      </SidebarContext.Provider>
    </TooltipPrimitive.Provider>
  )
}

// ── Sidebar ───────────────────────────────────────────────────────

export interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  side?: 'left' | 'right'
}

const Sidebar = React.forwardRef<HTMLElement, SidebarProps>(
  ({ side = 'left', className, children, ...props }, ref) => {
    const { open } = useSidebar()

    return (
      <aside
        ref={ref}
        data-state={open ? 'expanded' : 'collapsed'}
        data-side={side}
        className={cn(
          'group/sidebar relative flex flex-col shrink-0',
          'border-r border-border bg-card',
          'transition-[width] duration-200 ease-in-out overflow-hidden',
          open
            ? 'w-[var(--sidebar-width)]'
            : 'w-[var(--sidebar-width-collapsed)]',
          className,
        )}
        {...props}
      >
        {children}
      </aside>
    )
  },
)
Sidebar.displayName = 'Sidebar'

// ── SidebarTrigger ────────────────────────────────────────────────

export interface SidebarTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const SidebarTrigger = React.forwardRef<HTMLButtonElement, SidebarTriggerProps>(
  ({ className, onClick, ...props }, ref) => {
    const { toggle, open } = useSidebar()

    return (
      <button
        ref={ref}
        type="button"
        aria-label={open ? 'Collapse sidebar' : 'Expand sidebar'}
        onClick={(e) => { toggle(); onClick?.(e) }}
        className={cn(
          'inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md',
          'text-muted-foreground transition-colors duration-150',
          'hover:bg-muted hover:text-foreground',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
          className,
        )}
        {...props}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-4"
          aria-hidden="true"
        >
          <rect width="18" height="18" x="3" y="3" rx="2" />
          <path d="M9 3v18" />
        </svg>
      </button>
    )
  },
)
SidebarTrigger.displayName = 'SidebarTrigger'

// ── SidebarHeader ─────────────────────────────────────────────────

export interface SidebarHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

const SidebarHeader = React.forwardRef<HTMLDivElement, SidebarHeaderProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex shrink-0 flex-col gap-2 p-2', className)}
      {...props}
    />
  ),
)
SidebarHeader.displayName = 'SidebarHeader'

// ── SidebarContent ────────────────────────────────────────────────

export interface SidebarContentProps extends React.HTMLAttributes<HTMLDivElement> {}

const SidebarContent = React.forwardRef<HTMLDivElement, SidebarContentProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex flex-1 flex-col gap-2 overflow-y-auto overflow-x-hidden p-2',
        'scrollbar-thin',
        className,
      )}
      {...props}
    />
  ),
)
SidebarContent.displayName = 'SidebarContent'

// ── SidebarFooter ─────────────────────────────────────────────────

export interface SidebarFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

const SidebarFooter = React.forwardRef<HTMLDivElement, SidebarFooterProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex shrink-0 flex-col gap-2 p-2', className)}
      {...props}
    />
  ),
)
SidebarFooter.displayName = 'SidebarFooter'

// ── SidebarSeparator ──────────────────────────────────────────────

export interface SidebarSeparatorProps extends React.HTMLAttributes<HTMLHRElement> {}

const SidebarSeparator = React.forwardRef<HTMLHRElement, SidebarSeparatorProps>(
  ({ className, ...props }, ref) => (
    <hr ref={ref} className={cn('mx-2 border-border', className)} {...props} />
  ),
)
SidebarSeparator.displayName = 'SidebarSeparator'

// ── SidebarGroup ──────────────────────────────────────────────────

export interface SidebarGroupProps extends React.HTMLAttributes<HTMLDivElement> {}

const SidebarGroup = React.forwardRef<HTMLDivElement, SidebarGroupProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex flex-col gap-0.5', className)} {...props} />
  ),
)
SidebarGroup.displayName = 'SidebarGroup'

// ── SidebarGroupLabel ─────────────────────────────────────────────

export interface SidebarGroupLabelProps extends React.HTMLAttributes<HTMLParagraphElement> {}

const SidebarGroupLabel = React.forwardRef<HTMLParagraphElement, SidebarGroupLabelProps>(
  ({ className, ...props }, ref) => {
    const { open } = useSidebar()
    return (
      <p
        ref={ref}
        className={cn(
          'text-[11px] font-semibold uppercase tracking-widest text-muted-foreground',
          'overflow-hidden whitespace-nowrap transition-all duration-200',
          open ? 'px-2 py-1 max-h-8 opacity-100' : 'max-h-0 px-2 py-0 opacity-0',
          className,
        )}
        {...props}
      />
    )
  },
)
SidebarGroupLabel.displayName = 'SidebarGroupLabel'

// ── SidebarMenu ───────────────────────────────────────────────────

export interface SidebarMenuProps extends React.HTMLAttributes<HTMLUListElement> {}

const SidebarMenu = React.forwardRef<HTMLUListElement, SidebarMenuProps>(
  ({ className, ...props }, ref) => (
    <ul ref={ref} className={cn('flex flex-col gap-0.5 list-none m-0 p-0', className)} {...props} />
  ),
)
SidebarMenu.displayName = 'SidebarMenu'

// ── SidebarMenuItem ───────────────────────────────────────────────

export interface SidebarMenuItemProps extends React.HTMLAttributes<HTMLLIElement> {}

const SidebarMenuItem = React.forwardRef<HTMLLIElement, SidebarMenuItemProps>(
  ({ className, ...props }, ref) => (
    <li ref={ref} className={cn('relative', className)} {...props} />
  ),
)
SidebarMenuItem.displayName = 'SidebarMenuItem'

// ── SidebarMenuButton ─────────────────────────────────────────────

export interface SidebarMenuButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
  isActive?: boolean
  tooltip?: string
}

const SidebarMenuButton = React.forwardRef<HTMLButtonElement, SidebarMenuButtonProps>(
  ({ asChild, isActive, tooltip, className, children, ...props }, ref) => {
    const { open } = useSidebar()
    const Comp = asChild ? Slot : 'button'

    const button = (
      <Comp
        ref={ref}
        data-active={isActive || undefined}
        className={cn(
          'flex w-full items-center gap-2.5 rounded-md px-2 py-2 text-sm font-medium',
          'cursor-pointer select-none transition-colors duration-150',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
          'overflow-hidden whitespace-nowrap',
          isActive
            ? 'bg-primary/10 text-primary'
            : 'text-muted-foreground hover:bg-muted hover:text-foreground',
          // Collapsed (icon-rail) mode: shrink to a centered square and hide
          // every child except the leading icon so labels don't get clipped.
          !open && 'justify-center gap-0 px-0 [&>*:not(:first-child)]:hidden',
          className,
        )}
        {...props}
      >
        {children}
      </Comp>
    )

    if (!open && tooltip) {
      return (
        <TooltipPrimitive.Root>
          <TooltipPrimitive.Trigger asChild>{button}</TooltipPrimitive.Trigger>
          <TooltipPrimitive.Portal>
            <TooltipPrimitive.Content
              side="right"
              sideOffset={8}
              className={cn(
                'z-50 rounded-md px-2.5 py-1.5 text-xs font-medium shadow-md',
                'bg-[var(--tooltip-bg)] text-[var(--tooltip-fg)]',
                'animate-[popover-in_0.15s_ease]',
              )}
            >
              {tooltip}
            </TooltipPrimitive.Content>
          </TooltipPrimitive.Portal>
        </TooltipPrimitive.Root>
      )
    }

    return button
  },
)
SidebarMenuButton.displayName = 'SidebarMenuButton'

// ── SidebarMenuBadge ──────────────────────────────────────────────

export interface SidebarMenuBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {}

const SidebarMenuBadge = React.forwardRef<HTMLSpanElement, SidebarMenuBadgeProps>(
  ({ className, ...props }, ref) => {
    const { open } = useSidebar()
    return (
      <span
        ref={ref}
        className={cn(
          'ml-auto inline-flex h-5 min-w-5 items-center justify-center rounded-full',
          'bg-muted px-1.5 text-[11px] font-semibold tabular-nums text-muted-foreground',
          'transition-all duration-200',
          open ? 'max-w-[3rem] opacity-100' : 'max-w-0 opacity-0 overflow-hidden px-0',
          className,
        )}
        {...props}
      />
    )
  },
)
SidebarMenuBadge.displayName = 'SidebarMenuBadge'

// ── SidebarMenuSub ────────────────────────────────────────────────
// Nested sub-menu: an indented list with a vertical guide line. Hidden
// in the collapsed icon rail, where there's no room for nested labels.

export interface SidebarMenuSubProps extends React.HTMLAttributes<HTMLUListElement> {}

const SidebarMenuSub = React.forwardRef<HTMLUListElement, SidebarMenuSubProps>(
  ({ className, ...props }, ref) => {
    const { open } = useSidebar()
    return (
      <ul
        ref={ref}
        className={cn(
          'm-0 ml-[18px] flex min-w-0 list-none flex-col gap-0.5 border-l border-border py-0.5 pl-2.5',
          !open && 'hidden',
          className,
        )}
        {...props}
      />
    )
  },
)
SidebarMenuSub.displayName = 'SidebarMenuSub'

// ── SidebarMenuSubItem ────────────────────────────────────────────

export interface SidebarMenuSubItemProps extends React.HTMLAttributes<HTMLLIElement> {}

const SidebarMenuSubItem = React.forwardRef<HTMLLIElement, SidebarMenuSubItemProps>(
  ({ className, ...props }, ref) => (
    <li ref={ref} className={cn('relative', className)} {...props} />
  ),
)
SidebarMenuSubItem.displayName = 'SidebarMenuSubItem'

// ── SidebarMenuSubButton ──────────────────────────────────────────

export interface SidebarMenuSubButtonProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  asChild?: boolean
  isActive?: boolean
}

const SidebarMenuSubButton = React.forwardRef<HTMLAnchorElement, SidebarMenuSubButtonProps>(
  ({ asChild, isActive, className, ...props }, ref) => {
    const Comp = asChild ? Slot : 'a'
    return (
      <Comp
        ref={ref}
        data-active={isActive || undefined}
        className={cn(
          'flex min-w-0 items-center gap-2 rounded-md px-2 py-1.5 text-[13px] no-underline',
          'cursor-pointer select-none overflow-hidden whitespace-nowrap transition-colors duration-150',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
          isActive
            ? 'font-medium text-primary'
            : 'text-muted-foreground hover:bg-muted hover:text-foreground',
          className,
        )}
        {...props}
      />
    )
  },
)
SidebarMenuSubButton.displayName = 'SidebarMenuSubButton'

// ── SidebarInset ──────────────────────────────────────────────────
// The main content area that sits beside the sidebar

export interface SidebarInsetProps extends React.HTMLAttributes<HTMLDivElement> {}

const SidebarInset = React.forwardRef<HTMLDivElement, SidebarInsetProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('relative flex flex-1 flex-col overflow-hidden', className)}
      {...props}
    />
  ),
)
SidebarInset.displayName = 'SidebarInset'

export {
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
}
