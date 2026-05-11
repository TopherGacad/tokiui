import * as React from 'react'
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'
import { cva } from 'class-variance-authority'
import { cn } from '../lib/utils'

type RadioSize  = 'sm' | 'default' | 'lg'
type RadioColor = 'default' | 'success' | 'warning' | 'info' | 'destructive'

type RadioGroupContextValue = {
  size:  RadioSize
  color: RadioColor
  error: boolean
}

const RadioGroupContext = React.createContext<RadioGroupContextValue>({
  size:  'default',
  color: 'default',
  error: false,
})

export interface RadioGroupProps
  extends Omit<React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>, 'color'> {
  size?:  RadioSize
  color?: RadioColor
  error?: boolean
}

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  RadioGroupProps
>(({ className, orientation = 'vertical', size = 'default', color = 'default', error = false, ...props }, ref) => (
  <RadioGroupContext.Provider value={{ size, color, error }}>
    <RadioGroupPrimitive.Root
      ref={ref}
      orientation={orientation}
      className={cn(
        orientation === 'horizontal'
          ? 'flex flex-row flex-wrap gap-x-6 gap-y-2'
          : 'grid gap-2',
        className
      )}
      {...props}
    />
  </RadioGroupContext.Provider>
))
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName

const radioItemVariants = cva(
  [
    'shrink-0 rounded-full',
    'border bg-background ring-offset-background',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    'disabled:cursor-not-allowed disabled:opacity-50',
    'transition-colors duration-150',
  ],
  {
    variants: {
      size: {
        sm:      'h-3.5 w-3.5',
        default: 'h-4 w-4',
        lg:      'h-5 w-5',
      },
      color: {
        default:     'data-[state=checked]:bg-primary     data-[state=checked]:border-primary     focus-visible:ring-ring',
        success:     'data-[state=checked]:bg-success     data-[state=checked]:border-success     focus-visible:ring-success/40',
        warning:     'data-[state=checked]:bg-warning     data-[state=checked]:border-warning     focus-visible:ring-warning/40',
        info:        'data-[state=checked]:bg-info        data-[state=checked]:border-info        focus-visible:ring-info/40',
        destructive: 'data-[state=checked]:bg-destructive data-[state=checked]:border-destructive focus-visible:ring-destructive/40',
      },
    },
    defaultVariants: {
      size:  'default',
      color: 'default',
    },
  }
)

const dotSize: Record<RadioSize, string> = {
  sm:      'h-1 w-1',
  default: 'h-1.5 w-1.5',
  lg:      'h-2 w-2',
}

const dotColor: Record<RadioColor, string> = {
  default:     'bg-primary-foreground',
  success:     'bg-success-foreground',
  warning:     'bg-warning-foreground',
  info:        'bg-info-foreground',
  destructive: 'bg-destructive-foreground',
}

export interface RadioGroupItemProps
  extends Omit<React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>, 'color'> {
  size?:  RadioSize
  color?: RadioColor
  error?: boolean
}

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  RadioGroupItemProps
>(({ className, size: sizeProp, color: colorProp, error: errorProp, ...props }, ref) => {
  const ctx   = React.useContext(RadioGroupContext)
  const size  = sizeProp  ?? ctx.size
  const color = colorProp ?? ctx.color
  const error = errorProp ?? ctx.error

  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        radioItemVariants({ size, color }),
        error ? 'border-destructive focus-visible:ring-destructive/40' : 'border-foreground/25',
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <div className={cn('rounded-full', dotSize[size], dotColor[color])} />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
})
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName

export { RadioGroup, RadioGroupItem }
