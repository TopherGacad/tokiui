import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../lib/utils'

const buttonVariants = cva(
  [
    'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium',
    'cursor-pointer transition-all duration-150 select-none',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
    'disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed',
    'active:scale-[0.97]',
  ],
  {
    variants: {
      variant: {
        default: 'shadow-sm hover:shadow-md',
        outline: 'border bg-background shadow-sm',
        soft:    '',
        ghost:   '',
        link:    'underline-offset-4 hover:underline',
      },
      color: {
        default:     '',
        neutral:     '',
        destructive: '',
        success:     '',
        warning:     '',
        info:        '',
      },
      size: {
        default: 'h-10 min-w-[44px] px-4 py-2',
        sm:      'h-9  min-w-[44px] px-3 text-xs',
        lg:      'h-11 min-w-[44px] px-8 text-base',
        icon:    'h-10 w-10',
      },
    },
    compoundVariants: [
      // ── default (solid filled) ──
      { variant: 'default', color: 'default',     class: 'bg-primary text-primary-foreground hover:bg-primary/90' },
      { variant: 'default', color: 'neutral',     class: 'bg-secondary text-secondary-foreground hover:bg-secondary/70' },
      { variant: 'default', color: 'destructive', class: 'bg-destructive text-destructive-foreground hover:bg-destructive/90' },
      { variant: 'default', color: 'success',     class: 'bg-success text-success-foreground hover:bg-success/90' },
      { variant: 'default', color: 'warning',     class: 'bg-warning text-warning-foreground hover:bg-warning/90' },
      { variant: 'default', color: 'info',        class: 'bg-info text-info-foreground hover:bg-info/90' },
      // ── outline ──
      { variant: 'outline', color: 'default',     class: 'border-input text-foreground hover:bg-accent hover:text-accent-foreground hover:border-accent' },
      { variant: 'outline', color: 'neutral',     class: 'border-input text-foreground hover:bg-muted' },
      { variant: 'outline', color: 'destructive', class: 'border-destructive/40 text-destructive hover:bg-[var(--btn-destructive-soft)] hover:border-destructive/60' },
      { variant: 'outline', color: 'success',     class: 'border-success/40 text-success hover:bg-[var(--btn-success-soft)] hover:border-success/60' },
      { variant: 'outline', color: 'warning',     class: 'border-warning/40 text-warning hover:bg-[var(--btn-warning-soft)] hover:border-warning/60' },
      { variant: 'outline', color: 'info',        class: 'border-info/40 text-info hover:bg-[var(--btn-info-soft)] hover:border-info/60' },
      // ── soft (tinted fill) ──
      { variant: 'soft', color: 'default',     class: 'bg-[var(--btn-soft)] text-primary hover:bg-[var(--btn-soft-hover)]' },
      { variant: 'soft', color: 'neutral',     class: 'bg-secondary text-secondary-foreground hover:bg-secondary/70' },
      { variant: 'soft', color: 'destructive', class: 'bg-[var(--btn-destructive-soft)] text-destructive hover:bg-[var(--btn-destructive-soft-hover)]' },
      { variant: 'soft', color: 'success',     class: 'bg-[var(--btn-success-soft)] text-success hover:bg-[var(--btn-success-soft-hover)]' },
      { variant: 'soft', color: 'warning',     class: 'bg-[var(--btn-warning-soft)] text-warning hover:bg-[var(--btn-warning-soft-hover)]' },
      { variant: 'soft', color: 'info',        class: 'bg-[var(--btn-info-soft)] text-info hover:bg-[var(--btn-info-soft-hover)]' },
      // ── ghost ──
      { variant: 'ghost', color: 'default',     class: 'hover:bg-accent hover:text-accent-foreground' },
      { variant: 'ghost', color: 'neutral',     class: 'text-muted-foreground hover:bg-muted hover:text-foreground' },
      { variant: 'ghost', color: 'destructive', class: 'text-destructive/80 hover:bg-[var(--btn-destructive-soft)] hover:text-destructive' },
      { variant: 'ghost', color: 'success',     class: 'text-success/80 hover:bg-[var(--btn-success-soft)] hover:text-success' },
      { variant: 'ghost', color: 'warning',     class: 'text-warning/80 hover:bg-[var(--btn-warning-soft)] hover:text-warning' },
      { variant: 'ghost', color: 'info',        class: 'text-info/80 hover:bg-[var(--btn-info-soft)] hover:text-info' },
      // ── link ──
      { variant: 'link', color: 'default',     class: 'text-primary hover:text-primary/80' },
      { variant: 'link', color: 'neutral',     class: 'text-foreground hover:text-foreground/60' },
      { variant: 'link', color: 'destructive', class: 'text-destructive hover:text-destructive/80' },
      { variant: 'link', color: 'success',     class: 'text-success hover:text-success/80' },
      { variant: 'link', color: 'warning',     class: 'text-warning hover:text-warning/80' },
      { variant: 'link', color: 'info',        class: 'text-info hover:text-info/80' },
    ],
    defaultVariants: {
      variant: 'default',
      color: 'default',
      size: 'default',
    },
  }
)

function Spinner({ className }: { className?: string }) {
  return (
    <svg
      className={cn('animate-spin', className)}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  )
}

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'color'>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
  fullWidth?: boolean
  startIcon?: React.ReactNode
  endIcon?: React.ReactNode
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, color, size, asChild = false, loading = false, fullWidth, startIcon, endIcon, disabled, children, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    const iconSize = size === 'sm' ? 'size-3.5' : size === 'lg' ? 'size-5' : 'size-4'
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, color, size }), fullWidth && 'w-full', className)}
        disabled={disabled || loading}
        aria-busy={loading || undefined}
        {...props}
      >
        {loading ? (
          <Spinner className={iconSize} />
        ) : startIcon ? (
          <span className={cn('shrink-0', iconSize)} aria-hidden="true">{startIcon}</span>
        ) : null}
        {children}
        {!loading && endIcon && (
          <span className={cn('shrink-0', iconSize)} aria-hidden="true">{endIcon}</span>
        )}
      </Comp>
    )
  }
)
Button.displayName = 'Button'

/* ----- ButtonGroup ----- */
const ButtonGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    role="group"
    className={cn(
      'inline-flex',
      '[&>*]:rounded-none [&>*]:shadow-none',
      '[&>*:first-child]:rounded-l-md',
      '[&>*:last-child]:rounded-r-md',
      '[&>*:not(:first-child)]:-ml-px',
      '[&>*:focus-visible]:relative [&>*:focus-visible]:z-10',
      '[&>*]:active:scale-100',
      className
    )}
    {...props}
  />
))
ButtonGroup.displayName = 'ButtonGroup'

export { Button, ButtonGroup, buttonVariants }
