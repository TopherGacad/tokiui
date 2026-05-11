'use client'

import * as React from 'react'
import { cn } from '../lib/utils'

type InputSize = 'sm' | 'default' | 'lg'

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: InputSize
  error?: boolean
  startIcon?: React.ReactNode
  endIcon?: React.ReactNode
  clearable?: boolean
  onClear?: () => void
}

const sizeMap = {
  sm:      { root: 'h-8',  text: 'text-xs',   px: 'px-2.5', icon: 'size-3.5', padStart: 'pl-8',  padEnd: 'pr-8'  },
  default: { root: 'h-10', text: 'text-sm',   px: 'px-3',   icon: 'size-4',   padStart: 'pl-9',  padEnd: 'pr-9'  },
  lg:      { root: 'h-11', text: 'text-base', px: 'px-4',   icon: 'size-4',   padStart: 'pl-10', padEnd: 'pr-10' },
}

function EyeIcon() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}

function EyeOffIcon() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
      <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
      <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
      <line x1="2" x2="22" y1="2" y2="22" />
    </svg>
  )
}

function XIcon() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  )
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      style,
      type,
      size = 'default',
      error,
      startIcon,
      endIcon,
      clearable,
      onClear,
      disabled,
      value,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = React.useState(false)
    const s = sizeMap[size]

    const isPassword = type === 'password'
    const showClear = clearable && value !== undefined && value !== ''
    const hasStart = !!startIcon
    const hasEnd = isPassword || showClear || !!endIcon

    const baseInputClass = cn(
      'flex w-full rounded-md border bg-input ring-offset-background',
      'placeholder:text-muted-foreground transition-colors',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
      'disabled:cursor-not-allowed disabled:opacity-50',
      'file:border-0 file:bg-transparent file:text-sm file:font-medium',
      s.root, s.text, s.px,
      error
        ? 'border-destructive focus-visible:ring-destructive/40 focus-visible:ring-offset-0'
        : 'border-border focus-visible:ring-ring',
      hasStart && s.padStart,
      hasEnd   && s.padEnd,
    )

    // No icons — className and style go directly on the input
    if (!hasStart && !hasEnd) {
      return (
        <input
          ref={ref}
          type={type}
          value={value}
          disabled={disabled}
          aria-invalid={error || undefined}
          className={cn(baseInputClass, className)}
          style={style}
          {...props}
        />
      )
    }

    // Icons present — className and style go on the wrapper so sizing is correct
    // and the absolutely-positioned icons stay flush with the input border
    return (
      <div className={cn('relative flex w-full items-center', className)} style={style}>
        {startIcon && (
          <span className={cn('pointer-events-none absolute left-3 flex items-center text-muted-foreground', s.icon)}>
            {startIcon}
          </span>
        )}

        <input
          ref={ref}
          type={isPassword ? (showPassword ? 'text' : 'password') : type}
          value={value}
          disabled={disabled}
          aria-invalid={error || undefined}
          className={baseInputClass}
          {...props}
        />

        {isPassword && (
          <button
            type="button"
            tabIndex={-1}
            disabled={disabled}
            onClick={() => setShowPassword(v => !v)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            className={cn('absolute right-3 flex items-center justify-center p-0 bg-transparent border-0 outline-none cursor-pointer text-muted-foreground transition-colors hover:text-foreground disabled:pointer-events-none', s.icon)}
          >
            {showPassword ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        )}

        {!isPassword && showClear && (
          <button
            type="button"
            tabIndex={-1}
            disabled={disabled}
            onClick={onClear}
            aria-label="Clear input"
            className={cn('absolute right-3 flex items-center justify-center p-0 bg-transparent border-0 outline-none cursor-pointer text-muted-foreground transition-colors hover:text-foreground disabled:pointer-events-none', s.icon)}
          >
            <XIcon />
          </button>
        )}

        {!isPassword && !showClear && endIcon && (
          <span className={cn('pointer-events-none absolute right-3 flex items-center text-muted-foreground', s.icon)}>
            {endIcon}
          </span>
        )}
      </div>
    )
  }
)
Input.displayName = 'Input'

export { Input }
