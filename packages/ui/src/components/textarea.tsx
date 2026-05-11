'use client'

import * as React from 'react'
import { cn } from '../lib/utils'

type TextareaSize = 'sm' | 'default' | 'lg'

const sizeMap: Record<TextareaSize, { text: string; px: string; py: string; minH: string }> = {
  sm:      { text: 'text-xs',   px: 'px-2.5', py: 'py-1.5', minH: 'min-h-[60px]'  },
  default: { text: 'text-sm',   px: 'px-3',   py: 'py-2',   minH: 'min-h-[80px]'  },
  lg:      { text: 'text-base', px: 'px-4',   py: 'py-3',   minH: 'min-h-[100px]' },
}

export interface TextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> {
  size?: TextareaSize
  error?: boolean
  autoResize?: boolean
  showCount?: boolean
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      size = 'default',
      error,
      autoResize,
      showCount,
      maxLength,
      value,
      onChange,
      onInput,
      ...props
    },
    ref
  ) => {
    const [localCount, setLocalCount] = React.useState(0)
    const s = sizeMap[size]
    const hasCounter = showCount || maxLength !== undefined

    const count = value !== undefined ? String(value).length : localCount

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setLocalCount(e.target.value.length)
      onChange?.(e)
    }

    const handleInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
      if (autoResize) {
        const el = e.currentTarget
        el.style.height = 'auto'
        el.style.height = `${el.scrollHeight}px`
      }
      onInput?.(e)
    }

    const textareaEl = (
      <textarea
        ref={ref}
        value={value}
        maxLength={maxLength}
        onChange={handleChange}
        onInput={handleInput}
        aria-invalid={error || undefined}
        className={cn(
          'flex w-full rounded-md border bg-input',
          'ring-offset-background placeholder:text-muted-foreground',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-0',
          'disabled:cursor-not-allowed disabled:opacity-50',
          'transition-colors',
          s.text, s.px, s.py, s.minH,
          error
            ? 'border-destructive focus-visible:ring-destructive/40 focus-visible:ring-offset-0'
            : 'border-border focus-visible:ring-ring',
          autoResize || hasCounter ? 'resize-none overflow-hidden' : 'resize-y',
          className
        )}
        {...props}
      />
    )

    if (!hasCounter) return textareaEl

    const atLimit = maxLength !== undefined && count >= maxLength

    return (
      <div className="flex flex-col gap-1">
        {textareaEl}
        <span
          className={cn(
            'text-right text-xs tabular-nums',
            atLimit ? 'text-destructive' : 'text-muted-foreground'
          )}
        >
          {maxLength !== undefined ? `${count} / ${maxLength}` : count}
        </span>
      </div>
    )
  }
)
Textarea.displayName = 'Textarea'

export { Textarea }
