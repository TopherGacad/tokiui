'use client'

import * as React from 'react'
import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu'
import { cn } from '../lib/utils'

// ── NavigationMenu ────────────────────────────────────────────────

export interface NavigationMenuProps
  extends React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Root> {}

const NavigationMenu = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Root>,
  NavigationMenuProps
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Root
    ref={ref}
    className={cn('relative z-10 flex max-w-max flex-1 items-center justify-center', className)}
    {...props}
  >
    {children}
    <NavigationMenuViewport />
  </NavigationMenuPrimitive.Root>
))
NavigationMenu.displayName = 'NavigationMenu'

// ── NavigationMenuList ────────────────────────────────────────────

export interface NavigationMenuListProps
  extends React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.List> {}

const NavigationMenuList = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.List>,
  NavigationMenuListProps
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.List
    ref={ref}
    className={cn('group flex flex-1 list-none items-center justify-center gap-1', className)}
    {...props}
  />
))
NavigationMenuList.displayName = 'NavigationMenuList'

// ── NavigationMenuItem ────────────────────────────────────────────

const NavigationMenuItem = NavigationMenuPrimitive.Item
NavigationMenuItem.displayName = 'NavigationMenuItem'

// ── NavigationMenuTrigger ─────────────────────────────────────────

export interface NavigationMenuTriggerProps
  extends React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Trigger> {}

const NavigationMenuTrigger = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Trigger>,
  NavigationMenuTriggerProps
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Trigger
    ref={ref}
    className={cn(
      'group inline-flex h-9 w-max cursor-pointer select-none items-center justify-center gap-1 rounded-md px-3 py-2',
      'text-sm font-medium text-muted-foreground transition-colors duration-150',
      'hover:bg-muted hover:text-foreground',
      'data-[state=open]:bg-muted data-[state=open]:text-foreground',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1',
      'disabled:pointer-events-none disabled:opacity-50',
      className,
    )}
    {...props}
  >
    {children}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="relative top-px size-3.5 shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-180"
      aria-hidden="true"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  </NavigationMenuPrimitive.Trigger>
))
NavigationMenuTrigger.displayName = 'NavigationMenuTrigger'

// ── NavigationMenuContent ─────────────────────────────────────────

export interface NavigationMenuContentProps
  extends React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Content> {}

const NavigationMenuContent = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Content>,
  NavigationMenuContentProps
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Content
    ref={ref}
    className={cn(
      'left-0 top-0 w-full md:absolute md:w-auto',
      'data-[motion=from-start]:animate-[nav-content-from-left_0.2s_ease]',
      'data-[motion=from-end]:animate-[nav-content-from-right_0.2s_ease]',
      'data-[motion=to-start]:animate-[nav-content-to-left_0.15s_ease]',
      'data-[motion=to-end]:animate-[nav-content-to-right_0.15s_ease]',
      className,
    )}
    {...props}
  />
))
NavigationMenuContent.displayName = 'NavigationMenuContent'

// ── NavigationMenuLink ────────────────────────────────────────────

export interface NavigationMenuLinkProps
  extends React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Link> {}

const NavigationMenuLink = NavigationMenuPrimitive.Link
NavigationMenuLink.displayName = 'NavigationMenuLink'

// ── NavigationMenuViewport ────────────────────────────────────────

export interface NavigationMenuViewportProps
  extends React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Viewport> {}

const NavigationMenuViewport = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Viewport>,
  NavigationMenuViewportProps
>(({ className, ...props }, ref) => (
  <div className="absolute left-0 top-full z-50 flex justify-center">
    <NavigationMenuPrimitive.Viewport
      ref={ref}
      className={cn(
        'relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-xl border border-border bg-popover shadow-md',
        'origin-top-center transition-[width,height] duration-200',
        'data-[state=open]:animate-[nav-viewport-in_0.2s_ease]',
        'data-[state=closed]:animate-[nav-viewport-out_0.15s_ease]',
        'md:w-[var(--radix-navigation-menu-viewport-width)]',
        className,
      )}
      {...props}
    />
  </div>
))
NavigationMenuViewport.displayName = 'NavigationMenuViewport'

// ── NavigationMenuIndicator ───────────────────────────────────────

export interface NavigationMenuIndicatorProps
  extends React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Indicator> {}

const NavigationMenuIndicator = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Indicator>,
  NavigationMenuIndicatorProps
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Indicator
    ref={ref}
    className={cn(
      'top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden',
      'data-[state=visible]:animate-[fade-in_0.15s_ease]',
      'data-[state=hidden]:animate-[fade-out_0.15s_ease]',
      className,
    )}
    {...props}
  >
    <div className="relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm bg-border shadow-md" />
  </NavigationMenuPrimitive.Indicator>
))
NavigationMenuIndicator.displayName = 'NavigationMenuIndicator'

export {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
  NavigationMenuViewport,
  NavigationMenuIndicator,
}
