'use client'

import * as React from 'react'
import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import { cn } from '../lib/utils'

const TooltipProvider = TooltipPrimitive.Provider

const tooltipSizeMap = {
  sm:      { text: 'text-[11px]', px: 'px-2',   py: 'py-1'   },
  default: { text: 'text-xs',     px: 'px-2.5', py: 'py-1.5' },
}

/* ----- Root with optional closeDelay ----- */
export interface TooltipProps
  extends React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Root> {
  closeDelay?: number
}

function Tooltip({
  children,
  open: openProp,
  onOpenChange: onOpenChangeProp,
  closeDelay,
  ...props
}: TooltipProps) {
  const [open, setOpen] = React.useState(openProp ?? false)
  const closeTimer = React.useRef<ReturnType<typeof setTimeout>>(undefined)

  const handleOpenChange = React.useCallback(
    (next: boolean) => {
      clearTimeout(closeTimer.current)
      if (!next && closeDelay) {
        closeTimer.current = setTimeout(() => {
          setOpen(false)
          onOpenChangeProp?.(false)
        }, closeDelay)
      } else {
        setOpen(next)
        onOpenChangeProp?.(next)
      }
    },
    [closeDelay, onOpenChangeProp]
  )

  React.useEffect(() => () => clearTimeout(closeTimer.current), [])

  if (!closeDelay) {
    return (
      <TooltipPrimitive.Root open={openProp} onOpenChange={onOpenChangeProp} {...props}>
        {children}
      </TooltipPrimitive.Root>
    )
  }

  return (
    <TooltipPrimitive.Root open={open} onOpenChange={handleOpenChange} {...props}>
      {children}
    </TooltipPrimitive.Root>
  )
}
Tooltip.displayName = 'Tooltip'

const TooltipTrigger = TooltipPrimitive.Trigger

/* ----- Content with size and arrow ----- */
export interface TooltipContentProps
  extends React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content> {
  size?: 'sm' | 'default'
  arrow?: boolean
}

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  TooltipContentProps
>(({ className, sideOffset = 6, size = 'default', arrow, children, ...props }, ref) => {
  const s = tooltipSizeMap[size]
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        ref={ref}
        sideOffset={sideOffset}
        className={cn(
          'z-50 max-w-xs rounded-md',
          'bg-[var(--tooltip-bg)] text-[var(--tooltip-fg)]',
          'font-medium leading-snug',
          '[&_*]:text-inherit',
          'shadow-md',
          'data-[state=delayed-open]:animate-[fade-in_120ms_ease]',
          'data-[state=closed]:animate-[fade-out_100ms_ease]',
          'select-none',
          s.text, s.px, s.py,
          className
        )}
        {...props}
      >
        {children}
        {arrow && (
          <TooltipPrimitive.Arrow className="fill-[var(--tooltip-bg)]" />
        )}
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  )
})
TooltipContent.displayName = TooltipPrimitive.Content.displayName

export { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent }
