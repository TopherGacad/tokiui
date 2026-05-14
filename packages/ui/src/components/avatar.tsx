'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../lib/utils'

const AUTO_COLORS = ['primary', 'green', 'amber', 'sky', 'red', 'slate'] as const

function getAutoColor(seed?: string): typeof AUTO_COLORS[number] {
  if (!seed) return 'primary'
  let hash = 0
  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash)
  }
  return AUTO_COLORS[Math.abs(hash) % AUTO_COLORS.length]
}

// Outer container — rounded-full kept for ring (AvatarGroup), but NO overflow-hidden
// so the status dot can overlap outside the circle boundary.
const avatarVariants = cva(
  'relative inline-flex shrink-0 rounded-full select-none',
  {
    variants: {
      size: {
        sm:      'h-7 w-7 text-xs',
        default: 'h-9 w-9 text-sm',
        lg:      'h-11 w-11 text-base',
        xl:      'h-14 w-14 text-lg',
      },
      color: {
        default: 'text-muted-foreground',
        primary: 'text-primary-foreground',
        green:   'text-success-foreground',
        amber:   'text-warning-foreground',
        sky:     'text-info-foreground',
        red:     'text-destructive-foreground',
        slate:   'text-secondary-foreground',
      },
    },
    defaultVariants: { size: 'default', color: 'default' },
  }
)

const innerColorMap: Record<Exclude<AvatarColor, 'auto'>, string> = {
  default: 'bg-[var(--skeleton-bg)]',
  primary: 'bg-primary',
  green:   'bg-success',
  amber:   'bg-warning',
  sky:     'bg-info',
  red:     'bg-destructive',
  slate:   'bg-secondary',
}

export type AvatarColor  = 'auto' | 'default' | 'primary' | 'green' | 'amber' | 'sky' | 'red' | 'slate'
export type AvatarStatus = 'online' | 'offline' | 'busy' | 'away'

export interface AvatarProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof avatarVariants> {
  src?:      string
  alt?:      string
  fallback?: string
  color?:    AvatarColor
  status?:   AvatarStatus
}

const Avatar = React.forwardRef<HTMLSpanElement, AvatarProps>(
  ({ className, size, src, alt = '', fallback, color = 'default', status, ...props }, ref) => {
    const [imgError, setImgError] = React.useState(false)
    const showImage = src && !imgError
    const resolvedColor = color === 'auto' ? getAutoColor(fallback) : color

    const dotSize =
      size === 'sm' ? 'h-2 w-2' :
      size === 'lg' ? 'h-3 w-3' :
      size === 'xl' ? 'h-3.5 w-3.5' :
      'h-2.5 w-2.5'

    return (
      <span ref={ref} className={cn(avatarVariants({ size, color: resolvedColor }), className)} {...props}>
        {/* Inner circle — overflow-hidden here keeps image/content clipped to circle */}
        <span className={cn(
          'flex h-full w-full items-center justify-center overflow-hidden rounded-full',
          innerColorMap[resolvedColor]
        )}>
          {showImage ? (
            <img
              src={src}
              alt={alt}
              className="h-full w-full object-cover"
              onError={() => setImgError(true)}
            />
          ) : fallback ? (
            <span className="font-medium leading-none" aria-label={alt || fallback}>
              {fallback}
            </span>
          ) : (
            <svg className="h-[60%] w-[60%] opacity-70" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0 2c-5.33 0-8 2.67-8 4v1h16v-1c0-1.33-2.67-4-8-4Z" />
            </svg>
          )}
        </span>

        {status && (
          <span
            className={cn(
              'absolute bottom-0 right-0 rounded-full ring-2 ring-background',
              dotSize,
              status === 'online'  && 'bg-success',
              status === 'offline' && 'bg-muted-foreground',
              status === 'busy'    && 'bg-destructive',
              status === 'away'    && 'bg-warning',
            )}
            aria-label={status}
          />
        )}
      </span>
    )
  }
)
Avatar.displayName = 'Avatar'

const avatarGroupVariants = cva('flex', {
  variants: {
    size: {
      sm:      '-space-x-2',
      default: '-space-x-2.5',
      lg:      '-space-x-3',
      xl:      '-space-x-4',
    },
  },
  defaultVariants: { size: 'default' },
})

export interface AvatarGroupProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof avatarGroupVariants> {
  max?:  number
  size?: 'sm' | 'default' | 'lg' | 'xl'
}

const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ className, size = 'default', max, children, ...props }, ref) => {
    const items = React.Children.toArray(children)
    const visible = max ? items.slice(0, max) : items
    const overflow = max ? Math.max(0, items.length - max) : 0

    return (
      <div ref={ref} className={cn(avatarGroupVariants({ size }), className)} {...props}>
        {visible.map((child, i) =>
          React.isValidElement(child)
            ? React.cloneElement(child as React.ReactElement<AvatarProps>, {
                key: i,
                size,
                className: cn('ring-2 ring-background', (child as React.ReactElement<AvatarProps>).props.className),
              })
            : child
        )}
        {overflow > 0 && (
          <Avatar size={size} className="ring-2 ring-background" fallback={`+${overflow}`} />
        )}
      </div>
    )
  }
)
AvatarGroup.displayName = 'AvatarGroup'

export { Avatar, AvatarGroup, avatarVariants }
