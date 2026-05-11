import * as React from 'react'
import * as TabsPrimitive from '@radix-ui/react-tabs'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../lib/utils'

const Tabs = TabsPrimitive.Root

// ── TabsList ──────────────────────────────────────────────────────────────────

const tabsListVariants = cva(
  'inline-flex items-center text-muted-foreground',
  {
    variants: {
      variant: {
        pills: 'rounded-lg bg-muted p-1 gap-0',
        line:  'border-b border-border gap-0',
        card:  'gap-0',
      },
    },
    defaultVariants: { variant: 'pills' },
  }
)

interface TabsListProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>,
    VariantProps<typeof tabsListVariants> {}

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  TabsListProps
>(({ className, variant = 'pills', ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    data-variant={variant}
    className={cn(tabsListVariants({ variant }), className)}
    {...props}
  />
))
TabsList.displayName = TabsPrimitive.List.displayName

// ── TabsTrigger ───────────────────────────────────────────────────────────────

const tabsTriggerVariants = cva(
  [
    'inline-flex cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap',
    'text-sm font-medium',
    'ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0',
    'disabled:pointer-events-none disabled:opacity-50 transition-all duration-150',
  ],
  {
    variants: {
      variant: {
        pills: [
          'rounded-md px-3 py-1.5',
          'data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm',
          'hover:text-foreground',
        ],
        line: [
          'rounded-none px-4 py-2.5 border-b-2 border-transparent -mb-px',
          'data-[state=active]:border-foreground data-[state=active]:text-foreground',
          'hover:text-foreground',
        ],
        card: [
          'rounded-t-md rounded-b-none px-4 py-2 border border-transparent border-b-0',
          'data-[state=active]:border-border data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:-mb-px',
          'hover:text-foreground',
        ],
      },
    },
    defaultVariants: { variant: 'pills' },
  }
)

interface TabsTriggerProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>,
    VariantProps<typeof tabsTriggerVariants> {
  icon?: React.ReactNode
  badge?: React.ReactNode
}

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  TabsTriggerProps
>(({ className, variant = 'pills', icon, badge, children, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(tabsTriggerVariants({ variant }), className)}
    {...props}
  >
    {icon && <span className="size-4 shrink-0" aria-hidden="true">{icon}</span>}
    {children}
    {badge && <span className="ml-0.5">{badge}</span>}
  </TabsPrimitive.Trigger>
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

// ── TabsContent ───────────────────────────────────────────────────────────────

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      'mt-2 ring-offset-background',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      className
    )}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }
export type { TabsListProps, TabsTriggerProps }
