import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../lib/utils'

const badgeVariants = cva(
  'inline-flex items-center gap-1 rounded-full border font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        solid:   'border-transparent',
        soft:    'border-transparent',
        outline: 'bg-transparent',
      },
      color: {
        default:     '',
        secondary:   '',
        destructive: '',
        success:     '',
        warning:     '',
        info:        '',
      },
      size: {
        sm: 'px-2 py-px text-[11px]',
        md: 'px-2.5 py-0.5 text-xs',
        lg: 'px-3 py-1 text-sm',
      },
    },
    compoundVariants: [
      // ── solid ──
      { variant: 'solid', color: 'default',     class: 'bg-primary text-primary-foreground' },
      { variant: 'solid', color: 'secondary',   class: 'bg-secondary text-secondary-foreground' },
      { variant: 'solid', color: 'destructive', class: 'bg-destructive text-destructive-foreground' },
      { variant: 'solid', color: 'success',     class: 'bg-success text-success-foreground' },
      { variant: 'solid', color: 'warning',     class: 'bg-warning text-warning-foreground' },
      { variant: 'solid', color: 'info',        class: 'bg-info text-info-foreground' },
      // ── soft ──
      { variant: 'soft', color: 'default',     class: 'bg-[var(--badge-default-soft)] text-primary' },
      { variant: 'soft', color: 'secondary',   class: 'bg-secondary text-secondary-foreground' },
      { variant: 'soft', color: 'destructive', class: 'bg-[var(--badge-destructive-soft)] text-destructive' },
      { variant: 'soft', color: 'success',     class: 'bg-[var(--badge-success-soft)] text-success' },
      { variant: 'soft', color: 'warning',     class: 'bg-[var(--badge-warning-soft)] text-warning' },
      { variant: 'soft', color: 'info',        class: 'bg-[var(--badge-info-soft)] text-info' },
      // ── outline ──
      { variant: 'outline', color: 'default',     class: 'border-primary/40 text-primary' },
      { variant: 'outline', color: 'secondary',   class: 'border-border text-foreground' },
      { variant: 'outline', color: 'destructive', class: 'border-destructive/40 text-destructive' },
      { variant: 'outline', color: 'success',     class: 'border-success/40 text-success' },
      { variant: 'outline', color: 'warning',     class: 'border-warning/40 text-warning' },
      { variant: 'outline', color: 'info',        class: 'border-info/40 text-info' },
    ],
    defaultVariants: {
      variant: 'solid',
      color: 'default',
      size: 'md',
    },
  }
)

function DotIndicator({ className }: { className?: string }) {
  return <span className={cn('size-1.5 rounded-full bg-current shrink-0', className)} />
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  )
}

export interface BadgeProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'color'>,
    VariantProps<typeof badgeVariants> {
  dot?: boolean
  onDismiss?: () => void
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, color, size, dot, onDismiss, children, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(badgeVariants({ variant, color, size }), className)}
      {...props}
    >
      {dot && <DotIndicator />}
      {children}
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss"
          className="ml-0.5 -mr-0.5 size-3.5 shrink-0 opacity-60 hover:opacity-100 transition-opacity cursor-pointer"
        >
          <XIcon />
        </button>
      )}
    </span>
  )
)
Badge.displayName = 'Badge'

export { Badge, badgeVariants }
