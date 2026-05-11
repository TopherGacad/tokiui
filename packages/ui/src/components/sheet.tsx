import * as React from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { cn } from '../lib/utils'

type SheetSide = 'top' | 'right' | 'bottom' | 'left'
type SheetSize = 'sm' | 'default' | 'lg' | 'xl' | 'full'

const sideStyles: Record<SheetSide, string> = {
  right:  'inset-y-0 right-0 h-full w-3/4 border-l data-[state=open]:animate-[sheet-in-right_280ms_ease] data-[state=closed]:animate-[sheet-out-right_200ms_ease]',
  left:   'inset-y-0 left-0 h-full w-3/4 border-r data-[state=open]:animate-[sheet-in-left_280ms_ease] data-[state=closed]:animate-[sheet-out-left_200ms_ease]',
  top:    'inset-x-0 top-0 w-full border-b data-[state=open]:animate-[sheet-in-top_280ms_ease] data-[state=closed]:animate-[sheet-out-top_200ms_ease]',
  bottom: 'inset-x-0 bottom-0 w-full border-t data-[state=open]:animate-[sheet-in-bottom_280ms_ease] data-[state=closed]:animate-[sheet-out-bottom_200ms_ease]',
}

const lateralSizeMap: Record<SheetSize, string> = {
  sm:      'max-w-xs',
  default: 'max-w-sm',
  lg:      'max-w-lg',
  xl:      'max-w-2xl',
  full:    'max-w-full',
}

const Sheet = DialogPrimitive.Root
const SheetTrigger = DialogPrimitive.Trigger
const SheetClose = DialogPrimitive.Close
const SheetPortal = DialogPrimitive.Portal

const SheetOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      'fixed inset-0 z-50 bg-black/50 backdrop-blur-sm',
      'data-[state=open]:animate-[fade-in_200ms_ease]',
      'data-[state=closed]:animate-[fade-out_150ms_ease]',
      className
    )}
    {...props}
  />
))
SheetOverlay.displayName = 'SheetOverlay'

export interface SheetContentProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {
  side?: SheetSide
  size?: SheetSize
}

const SheetContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  SheetContentProps
>(({ className, side = 'right', size = 'default', children, ...props }, ref) => {
  const isLateral = side === 'left' || side === 'right'
  return (
    <SheetPortal>
      <SheetOverlay />
      <DialogPrimitive.Content
        ref={ref}
        className={cn(
          'fixed z-50 bg-background shadow-xl',
          'focus:outline-none',
          sideStyles[side],
          isLateral && lateralSizeMap[size],
          className
        )}
        {...props}
      >
        {children}
        <DialogPrimitive.Close
          className={cn(
            'absolute right-4 top-4',
            'rounded-md p-1 text-muted-foreground',
            'hover:bg-muted hover:text-foreground',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
            'transition-colors duration-150',
          )}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </SheetPortal>
  )
})
SheetContent.displayName = 'SheetContent'

const SheetHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex flex-col gap-1.5 border-b px-6 py-4', className)} {...props} />
)
SheetHeader.displayName = 'SheetHeader'

const SheetFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex items-center justify-end gap-2 border-t px-6 py-4', className)} {...props} />
)
SheetFooter.displayName = 'SheetFooter'

const SheetTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn('text-base font-semibold text-foreground', className)}
    {...props}
  />
))
SheetTitle.displayName = 'SheetTitle'

const SheetDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
))
SheetDescription.displayName = 'SheetDescription'

const SheetBody = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex-1 overflow-y-auto px-6 py-4', className)} {...props} />
)
SheetBody.displayName = 'SheetBody'

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
  SheetBody,
}
