import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../lib/utils'

const progressTrackVariants = cva(
  'relative w-full overflow-hidden rounded-full bg-muted',
  {
    variants: {
      size: {
        sm:      'h-1.5',
        default: 'h-2.5',
        lg:      'h-4',
      },
    },
    defaultVariants: { size: 'default' },
  }
)

export type ProgressColor   = 'default' | 'success' | 'warning' | 'info' | 'error'
export type ProgressVariant = 'default' | 'striped' | 'indeterminate'

const colorClass: Record<ProgressColor, string> = {
  default: 'bg-primary',
  success: 'bg-success',
  warning: 'bg-warning',
  info:    'bg-info',
  error:   'bg-destructive',
}

export interface ProgressProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof progressTrackVariants> {
  value?:     number
  max?:       number
  color?:     ProgressColor
  variant?:   ProgressVariant
  showLabel?: boolean
  label?:     string
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  (
    {
      className,
      value = 0,
      max = 100,
      size,
      color = 'default',
      variant = 'default',
      showLabel = false,
      label,
      ...props
    },
    ref,
  ) => {
    const pct             = Math.min(100, Math.max(0, (value / max) * 100))
    const isIndeterminate = variant === 'indeterminate'

    return (
      <div ref={ref} className={cn(showLabel && 'space-y-1', className)} {...props}>
        {showLabel && (
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{label ?? 'Progress'}</span>
            <span>{isIndeterminate ? '…' : `${Math.round(pct)}%`}</span>
          </div>
        )}
        <div
          role="progressbar"
          aria-valuenow={isIndeterminate ? undefined : value}
          aria-valuemin={0}
          aria-valuemax={max}
          aria-label={label ?? 'Progress'}
          className={progressTrackVariants({ size })}
        >
          <div
            className={cn(
              'h-full rounded-full transition-[width] duration-500 ease-out',
              colorClass[color],
              variant === 'striped'       && 'progress-striped',
              variant === 'indeterminate' && 'progress-indeterminate',
            )}
            style={isIndeterminate ? undefined : { width: `${pct}%` }}
          />
        </div>
      </div>
    )
  },
)
Progress.displayName = 'Progress'

export { Progress, progressTrackVariants }
