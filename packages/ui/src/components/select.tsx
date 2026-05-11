import * as React from 'react'
import * as SelectPrimitive from '@radix-ui/react-select'
import { cn } from '../lib/utils'

const Select = SelectPrimitive.Root
const SelectGroup = SelectPrimitive.Group
const SelectValue = SelectPrimitive.Value

/* ----- Icons ----- */
function ChevronDown({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className} style={style} aria-hidden="true">
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}

function ChevronUp({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className} style={style} aria-hidden="true">
      <path d="m18 15-6-6-6 6" />
    </svg>
  )
}

function Check({ className }: { className?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <polyline points="20 6 9 12 4 16" />
    </svg>
  )
}

function XIcon() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  )
}

/* ----- Size map ----- */
const triggerSizeMap = {
  sm:      { height: 'h-8',  text: 'text-xs',   px: 'px-2.5', pxClear: 'pl-2.5 pr-10', iconSize: 12, xPos: 'right-6'  },
  default: { height: 'h-10', text: 'text-sm',   px: 'px-3',   pxClear: 'pl-3 pr-12',   iconSize: 14, xPos: 'right-7'  },
  lg:      { height: 'h-11', text: 'text-base', px: 'px-4',   pxClear: 'pl-4 pr-14',   iconSize: 16, xPos: 'right-9'  },
}

/* ----- Trigger ----- */
export interface SelectTriggerProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> {
  size?: 'sm' | 'default' | 'lg'
  error?: boolean
  clearable?: boolean
  onClear?: () => void
}

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  SelectTriggerProps
>(({ className, children, size = 'default', error, clearable, onClear, disabled, ...props }, ref) => {
  const s = triggerSizeMap[size]

  const triggerEl = (
    <SelectPrimitive.Trigger
      ref={ref}
      disabled={disabled}
      className={cn(
        'flex w-full items-center justify-between gap-2',
        s.height, s.text,
        clearable ? s.pxClear : s.px,
        'rounded-md border bg-input',
        'ring-offset-background',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'data-[placeholder]:text-muted-foreground',
        '[&>span]:line-clamp-1',
        error
          ? 'border-destructive focus-visible:ring-destructive/40 focus-visible:ring-offset-0'
          : 'border-border focus-visible:ring-ring',
        className
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDown
          className="shrink-0 text-muted-foreground"
          style={{ width: s.iconSize, height: s.iconSize }}
        />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )

  if (!clearable) return triggerEl

  return (
    <div className="relative w-full">
      {triggerEl}
      <button
        type="button"
        tabIndex={-1}
        disabled={disabled}
        onClick={(e) => { e.stopPropagation(); onClear?.() }}
        aria-label="Clear selection"
        style={{ width: s.iconSize - 2, height: s.iconSize - 2 }}
        className={cn(
          'absolute top-1/2 -translate-y-1/2',
          s.xPos,
          'flex items-center justify-center',
          'text-muted-foreground hover:text-foreground transition-colors cursor-pointer',
          'disabled:pointer-events-none disabled:opacity-50',
        )}
      >
        <XIcon />
      </button>
    </div>
  )
})
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName

/* ----- Scroll buttons ----- */
const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn('flex cursor-default items-center justify-center py-1', className)}
    {...props}
  >
    <ChevronUp style={{ width: 14, height: 14 }} />
  </SelectPrimitive.ScrollUpButton>
))
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName

const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn('flex cursor-default items-center justify-center py-1', className)}
    {...props}
  >
    <ChevronDown style={{ width: 14, height: 14 }} />
  </SelectPrimitive.ScrollDownButton>
))
SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName

/* ----- Content ----- */
const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = 'popper', ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        'relative z-50 max-h-72 min-w-[8rem] overflow-hidden',
        'rounded-xl border border-border bg-card shadow-xl',
        'data-[state=open]:animate-[popover-in_150ms_cubic-bezier(0.16,1,0.3,1)]',
        'data-[state=closed]:animate-[fade-out_100ms_ease]',
        position === 'popper' && 'w-[var(--radix-select-trigger-width)] translate-y-1',
        className
      )}
      position={position}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          'p-1',
          position === 'popper' && 'h-[var(--radix-select-content-available-height)]'
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
))
SelectContent.displayName = SelectPrimitive.Content.displayName

/* ----- Label ----- */
const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn(
      'px-2 py-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground',
      className
    )}
    {...props}
  />
))
SelectLabel.displayName = SelectPrimitive.Label.displayName

/* ----- Item ----- */
const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      'relative flex w-full cursor-default select-none items-center',
      'rounded-lg py-2 pl-2 pr-8 text-sm text-foreground outline-none',
      'focus:bg-muted focus:text-foreground',
      'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      className
    )}
    {...props}
  >
    <span className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check />
      </SelectPrimitive.ItemIndicator>
    </span>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
))
SelectItem.displayName = SelectPrimitive.Item.displayName

/* ----- Separator ----- */
const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn('-mx-1 my-1 h-px bg-border', className)}
    {...props}
  />
))
SelectSeparator.displayName = SelectPrimitive.Separator.displayName

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
}
