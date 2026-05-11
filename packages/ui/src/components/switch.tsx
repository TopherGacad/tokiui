import * as React from 'react'
import * as SwitchPrimitive from '@radix-ui/react-switch'
import { cn } from '../lib/utils'

type SwitchSize  = 'sm' | 'default' | 'lg'
type SwitchColor = 'default' | 'success' | 'warning' | 'info' | 'destructive'

const sizes: Record<SwitchSize, { root: string; thumb: string; on: string }> = {
  sm:      { root: 'h-4 w-7',  thumb: 'h-3 w-3', on: 'data-[state=checked]:translate-x-3' },
  default: { root: 'h-5 w-9',  thumb: 'h-4 w-4', on: 'data-[state=checked]:translate-x-4' },
  lg:      { root: 'h-6 w-11', thumb: 'h-5 w-5', on: 'data-[state=checked]:translate-x-5' },
}

const colorMap: Record<SwitchColor, { checked: string; ring: string }> = {
  default:     { checked: 'data-[state=checked]:bg-primary',     ring: 'focus-visible:ring-ring'           },
  success:     { checked: 'data-[state=checked]:bg-success',     ring: 'focus-visible:ring-success/40'     },
  warning:     { checked: 'data-[state=checked]:bg-warning',     ring: 'focus-visible:ring-warning/40'     },
  info:        { checked: 'data-[state=checked]:bg-info',        ring: 'focus-visible:ring-info/40'        },
  destructive: { checked: 'data-[state=checked]:bg-destructive', ring: 'focus-visible:ring-destructive/40' },
}

export interface SwitchProps
  extends React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root> {
  size?: SwitchSize
  color?: SwitchColor
  checkedIcon?: React.ReactNode
  uncheckedIcon?: React.ReactNode
}

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  SwitchProps
>(({ className, size = 'default', color = 'default', checkedIcon, uncheckedIcon, ...props }, ref) => {
  const s = sizes[size]
  const c = colorMap[color]
  const hasIcons = !!(checkedIcon || uncheckedIcon)

  return (
    <SwitchPrimitive.Root
      ref={ref}
      className={cn(
        'peer inline-flex shrink-0 cursor-pointer items-center rounded-full',
        'border-2 border-transparent',
        'bg-foreground/20',
        'ring-offset-background',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'transition-colors duration-200',
        s.root, c.checked, c.ring,
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        className={cn(
          'pointer-events-none block rounded-full bg-white shadow-sm',
          'transition-transform duration-200',
          'data-[state=unchecked]:translate-x-0',
          s.thumb, s.on,
          hasIcons && 'group relative flex items-center justify-center overflow-hidden'
        )}
      >
        {uncheckedIcon && (
          <span className="absolute inset-0 flex items-center justify-center transition-opacity duration-200 group-data-[state=checked]:opacity-0 group-data-[state=unchecked]:opacity-100">
            {uncheckedIcon}
          </span>
        )}
        {checkedIcon && (
          <span className="absolute inset-0 flex items-center justify-center transition-opacity duration-200 group-data-[state=checked]:opacity-100 group-data-[state=unchecked]:opacity-0">
            {checkedIcon}
          </span>
        )}
      </SwitchPrimitive.Thumb>
    </SwitchPrimitive.Root>
  )
})
Switch.displayName = SwitchPrimitive.Root.displayName

/* ----- SwitchField composition helper ----- */
export interface SwitchFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string
  description?: string
}

const SwitchField = React.forwardRef<HTMLDivElement, SwitchFieldProps>(
  ({ className, label, description, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex items-center justify-between gap-4', className)}
      {...props}
    >
      <div className="space-y-0.5 min-w-0">
        <p className="text-sm font-medium text-foreground">{label}</p>
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
      </div>
      {children}
    </div>
  )
)
SwitchField.displayName = 'SwitchField'

export { Switch, SwitchField }
