import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../lib/utils'

const kbdVariants = cva(
  [
    'inline-flex select-none items-center justify-center gap-1 whitespace-nowrap align-middle',
    'rounded border border-border bg-muted font-mono font-medium text-muted-foreground',
    'shadow-[0_1px_0_var(--border)]',
  ],
  {
    variants: {
      size: {
        sm: 'h-5 min-w-5 px-1 text-[10px]',
        md: 'h-6 min-w-6 px-1.5 text-[11px]',
        lg: 'h-7 min-w-7 px-2 text-xs',
      },
    },
    defaultVariants: { size: 'md' },
  }
)

export interface KbdProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof kbdVariants> {}

const Kbd = React.forwardRef<HTMLElement, KbdProps>(
  ({ className, size, ...props }, ref) => (
    <kbd ref={ref} className={cn(kbdVariants({ size }), className)} {...props} />
  )
)
Kbd.displayName = 'Kbd'

export { Kbd, kbdVariants }
