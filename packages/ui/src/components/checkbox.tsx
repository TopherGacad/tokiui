'use client'

import * as React from 'react'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../lib/utils'

type CheckboxSize  = 'sm' | 'default' | 'lg'
type CheckboxColor = 'default' | 'success' | 'warning' | 'info' | 'destructive'

type CheckboxGroupContextValue = {
  size:  CheckboxSize
  color: CheckboxColor
  error: boolean
}

const CheckboxGroupContext = React.createContext<CheckboxGroupContextValue>({
  size:  'default',
  color: 'default',
  error: false,
})

const checkboxVariants = cva(
  [
    'peer shrink-0 rounded-[4px]',
    'border bg-background ring-offset-background',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    'disabled:cursor-not-allowed disabled:opacity-50',
    'transition-colors duration-150',
  ],
  {
    variants: {
      size: {
        sm:      'h-3.5 w-3.5 rounded-[3px]',
        default: 'h-4 w-4 rounded-[4px]',
        lg:      'h-5 w-5 rounded-[5px]',
      },
      color: {
        default:     'data-[state=checked]:bg-primary     data-[state=checked]:border-primary     data-[state=checked]:text-primary-foreground     data-[state=indeterminate]:bg-primary     data-[state=indeterminate]:border-primary     data-[state=indeterminate]:text-primary-foreground     focus-visible:ring-ring',
        success:     'data-[state=checked]:bg-success     data-[state=checked]:border-success     data-[state=checked]:text-success-foreground     data-[state=indeterminate]:bg-success     data-[state=indeterminate]:border-success     data-[state=indeterminate]:text-success-foreground     focus-visible:ring-success/40',
        warning:     'data-[state=checked]:bg-warning     data-[state=checked]:border-warning     data-[state=checked]:text-warning-foreground     data-[state=indeterminate]:bg-warning     data-[state=indeterminate]:border-warning     data-[state=indeterminate]:text-warning-foreground     focus-visible:ring-warning/40',
        info:        'data-[state=checked]:bg-info        data-[state=checked]:border-info        data-[state=checked]:text-info-foreground        data-[state=indeterminate]:bg-info        data-[state=indeterminate]:border-info        data-[state=indeterminate]:text-info-foreground        focus-visible:ring-info/40',
        destructive: 'data-[state=checked]:bg-destructive data-[state=checked]:border-destructive data-[state=checked]:text-destructive-foreground data-[state=indeterminate]:bg-destructive data-[state=indeterminate]:border-destructive data-[state=indeterminate]:text-destructive-foreground focus-visible:ring-destructive/40',
      },
    },
    defaultVariants: {
      size:  'default',
      color: 'default',
    },
  }
)

const iconSize = {
  sm:      { check: [9, 7]   as [number, number], dash: [7, 1.5] as [number, number] },
  default: { check: [10, 8]  as [number, number], dash: [8, 2]   as [number, number] },
  lg:      { check: [12, 10] as [number, number], dash: [10, 2.5] as [number, number] },
}

// ── CheckboxGroup ─────────────────────────────────────────────────────────────

export interface CheckboxGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  size?:        CheckboxSize
  color?:       CheckboxColor
  error?:       boolean
  orientation?: 'vertical' | 'horizontal'
}

const CheckboxGroup = React.forwardRef<HTMLDivElement, CheckboxGroupProps>(
  ({ className, size = 'default', color = 'default', error = false, orientation = 'vertical', ...props }, ref) => (
    <CheckboxGroupContext.Provider value={{ size, color, error }}>
      <div
        ref={ref}
        className={cn(
          orientation === 'horizontal'
            ? 'flex flex-row flex-wrap gap-x-6 gap-y-2'
            : 'grid gap-2',
          className
        )}
        {...props}
      />
    </CheckboxGroupContext.Provider>
  )
)
CheckboxGroup.displayName = 'CheckboxGroup'

// ── Checkbox ──────────────────────────────────────────────────────────────────

export interface CheckboxProps
  extends Omit<React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>, 'color'>,
    VariantProps<typeof checkboxVariants> {
  error?: boolean
}

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(({ className, size: sizeProp, color: colorProp, error: errorProp, ...props }, ref) => {
  const ctx   = React.useContext(CheckboxGroupContext)
  const size  = sizeProp  ?? ctx.size
  const color = colorProp ?? ctx.color
  const error = errorProp ?? ctx.error
  const icons = iconSize[size ?? 'default']

  return (
    <CheckboxPrimitive.Root
      ref={ref}
      className={cn(
        checkboxVariants({ size, color }),
        error
          ? 'border-destructive focus-visible:ring-destructive/40'
          : 'border-foreground/25',
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator className="flex items-center justify-center text-current">
        {props.checked === 'indeterminate' ? (
          <svg
            width={icons.dash[0]} height={icons.dash[1]}
            viewBox={`0 0 ${icons.dash[0]} ${icons.dash[1]}`}
            fill="currentColor" aria-hidden="true"
          >
            <rect width={icons.dash[0]} height={icons.dash[1]} rx={icons.dash[1] / 2} />
          </svg>
        ) : (
          <svg
            width={icons.check[0]} height={icons.check[1]}
            viewBox={`0 0 ${icons.check[0]} ${icons.check[1]}`}
            fill="none" stroke="currentColor" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
          >
            <polyline points={`1,${icons.check[1] * 0.5} ${icons.check[0] * 0.35},${icons.check[1] - 1} ${icons.check[0] - 1},1`} />
          </svg>
        )}
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
})
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox, CheckboxGroup }
