import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../lib/utils'

const spinnerVariants = cva('', {
  variants: {
    size: {
      sm:      'h-4 w-4',
      default: 'h-5 w-5',
      lg:      'h-6 w-6',
      xl:      'h-8 w-8',
    },
    color: {
      default: 'text-primary',
      current: '',
      neutral: 'text-muted-foreground',
      white:   'text-white',
      red:     'text-destructive',
      green:   'text-success',
      amber:   'text-warning',
      sky:     'text-info',
    },
  },
  defaultVariants: {
    size: 'default',
    color: 'default',
  },
})

export type SpinnerVariant = 'arc' | 'ring' | 'dots' | 'bars'

export interface SpinnerProps
  extends Omit<React.SVGAttributes<SVGSVGElement>, 'color'>,
    VariantProps<typeof spinnerVariants> {
  variant?: SpinnerVariant
  label?: string
}

const Spinner = React.forwardRef<SVGSVGElement, SpinnerProps>(
  ({ className, size, color, variant = 'arc', label = 'Loading…', ...props }, ref) => (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      className={cn(
        spinnerVariants({ size, color }),
        (variant === 'arc' || variant === 'ring') && 'animate-spin',
        className
      )}
      role="status"
      aria-label={label}
      {...props}
    >
      {variant === 'arc' && (
        <>
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-20" />
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeDasharray="47 16" />
        </>
      )}
      {variant === 'ring' && (
        <>
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" className="opacity-20" />
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeDasharray="16 47" />
        </>
      )}
      {variant === 'dots' && (
        <>
          <circle cx="4"  cy="12" r="2.5" fill="currentColor" style={{ animation: 'tokiui-bounce 1.2s ease-in-out 0s infinite' }} />
          <circle cx="12" cy="12" r="2.5" fill="currentColor" style={{ animation: 'tokiui-bounce 1.2s ease-in-out 0.2s infinite' }} />
          <circle cx="20" cy="12" r="2.5" fill="currentColor" style={{ animation: 'tokiui-bounce 1.2s ease-in-out 0.4s infinite' }} />
        </>
      )}
      {variant === 'bars' && (
        <>
          <rect x="3"  y="4" width="4" height="16" rx="2" fill="currentColor" style={{ animation: 'tokiui-bar 1.2s ease-in-out 0s infinite',   transformBox: 'fill-box', transformOrigin: 'center' }} />
          <rect x="10" y="4" width="4" height="16" rx="2" fill="currentColor" style={{ animation: 'tokiui-bar 1.2s ease-in-out 0.2s infinite', transformBox: 'fill-box', transformOrigin: 'center' }} />
          <rect x="17" y="4" width="4" height="16" rx="2" fill="currentColor" style={{ animation: 'tokiui-bar 1.2s ease-in-out 0.4s infinite', transformBox: 'fill-box', transformOrigin: 'center' }} />
        </>
      )}
    </svg>
  )
)
Spinner.displayName = 'Spinner'

export { Spinner, spinnerVariants }
