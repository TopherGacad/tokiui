import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../lib/utils'

const alertVariants = cva(
  'relative flex gap-3 rounded-lg p-4 border [border-left-width:4px]',
  {
    variants: {
      variant: {
        default:
          'bg-muted border-border [border-left-color:var(--muted-foreground)]',
        success:
          'bg-[var(--alert-success-bg)] border-[var(--alert-success-border)] [border-left-color:var(--success)]',
        warning:
          'bg-[var(--alert-warning-bg)] border-[var(--alert-warning-border)] [border-left-color:var(--warning)]',
        info:
          'bg-[var(--alert-info-bg)] border-[var(--alert-info-border)] [border-left-color:var(--info)]',
        destructive:
          'bg-[var(--alert-destructive-bg)] border-[var(--alert-destructive-border)] [border-left-color:var(--destructive)]',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

const iconColorMap = {
  default:     'text-foreground/60',
  success:     'text-success',
  warning:     'text-warning',
  info:        'text-info',
  destructive: 'text-destructive',
}

const titleColorMap = {
  default:     'text-foreground',
  success:     'text-success',
  warning:     'text-warning',
  info:        'text-info',
  destructive: 'text-destructive',
}

/* ---- Default icons ---- */
function SuccessIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  )
}

function WarningIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" />
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
    </svg>
  )
}

function InfoIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </svg>
  )
}

function DestructiveIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <path d="m15 9-6 6" />
      <path d="m9 9 6 6" />
    </svg>
  )
}

const defaultIconMap = {
  default:     null,
  success:     <SuccessIcon />,
  warning:     <WarningIcon />,
  info:        <InfoIcon />,
  destructive: <DestructiveIcon />,
}

function XIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  )
}

export interface AlertProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'>,
    VariantProps<typeof alertVariants> {
  title?: React.ReactNode
  icon?: React.ReactNode
  onDismiss?: () => void
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = 'default', title, icon, onDismiss, children, ...props }, ref) => {
    const v = variant ?? 'default'
    const resolvedIcon = icon !== undefined ? icon : defaultIconMap[v]
    const iconColor = iconColorMap[v]
    const titleColor = titleColorMap[v]

    return (
      <div
        ref={ref}
        role="alert"
        className={cn(alertVariants({ variant }), className)}
        {...props}
      >
        {resolvedIcon && (
          <span className={cn('mt-px shrink-0', iconColor)}>
            {resolvedIcon}
          </span>
        )}

        <div className="flex-1 min-w-0 space-y-1">
          {title && (
            <p className={cn('text-sm font-semibold leading-none', titleColor)}>
              {title}
            </p>
          )}
          {children && (
            <div className="text-sm text-foreground/80 leading-relaxed">
              {children}
            </div>
          )}
        </div>

        {onDismiss && (
          <button
            type="button"
            onClick={onDismiss}
            aria-label="Dismiss"
            className="shrink-0 rounded p-0.5 text-foreground/40 hover:text-foreground/80 transition-colors cursor-pointer"
          >
            <XIcon />
          </button>
        )}
      </div>
    )
  }
)
Alert.displayName = 'Alert'

export { Alert, alertVariants }
