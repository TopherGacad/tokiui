import * as React from 'react'
import { cn } from '../lib/utils'

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?:   'default' | 'circle' | 'text'
  animation?: 'pulse' | 'shimmer' | 'none'
}

const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, variant = 'default', animation = 'pulse', ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'bg-skeleton',
        animation === 'pulse'   && 'animate-pulse',
        animation === 'shimmer' && 'skeleton-shimmer',
        variant === 'circle'  && 'rounded-full',
        variant === 'default' && 'rounded-md',
        variant === 'text'    && 'rounded h-4 w-full',
        className
      )}
      aria-hidden="true"
      {...props}
    />
  )
)
Skeleton.displayName = 'Skeleton'

export { Skeleton }
