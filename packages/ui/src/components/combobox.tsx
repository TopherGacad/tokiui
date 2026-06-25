'use client'

import * as React from 'react'
import { Popover, PopoverTrigger, PopoverContent } from './popover'
import { cn } from '../lib/utils'

/* ----- Icons ----- */
function ChevronDown({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-muted-foreground" aria-hidden="true">
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}
function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="20 6 9 12 4 16" />
    </svg>
  )
}
function SearchIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-muted-foreground" aria-hidden="true">
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  )
}
function XIcon({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  )
}

export interface ComboboxOption {
  value: string
  label: string
  disabled?: boolean
}

export interface ComboboxProps {
  options: ComboboxOption[]
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  placeholder?: string
  searchPlaceholder?: string
  emptyText?: string
  disabled?: boolean
  size?: 'sm' | 'default' | 'lg'
  error?: boolean
  clearable?: boolean
  className?: string
  contentClassName?: string
  id?: string
  name?: string
}

const sizeMap = {
  sm:      { h: 'h-8',  text: 'text-xs',   px: 'px-2.5', chevron: 12 },
  default: { h: 'h-10', text: 'text-sm',   px: 'px-3',   chevron: 14 },
  lg:      { h: 'h-11', text: 'text-base', px: 'px-4',   chevron: 16 },
}

const Combobox = React.forwardRef<HTMLButtonElement, ComboboxProps>(
  (
    {
      options,
      value,
      defaultValue,
      onValueChange,
      placeholder = 'Select…',
      searchPlaceholder = 'Search…',
      emptyText = 'No results found.',
      disabled,
      size = 'default',
      error,
      clearable,
      className,
      contentClassName,
      id,
      name,
    },
    ref
  ) => {
    const [open, setOpen] = React.useState(false)
    const [internal, setInternal] = React.useState(defaultValue ?? '')
    const selected = value !== undefined ? value : internal
    const [query, setQuery] = React.useState('')
    const [activeIndex, setActiveIndex] = React.useState(0)
    const inputRef = React.useRef<HTMLInputElement>(null)
    const listId = React.useId()
    const s = sizeMap[size]

    const filtered = React.useMemo(() => {
      const q = query.trim().toLowerCase()
      if (!q) return options
      return options.filter((o) => o.label.toLowerCase().includes(q))
    }, [options, query])

    const selectedOption = options.find((o) => o.value === selected)

    // Reset search + active item each time the popover opens.
    React.useEffect(() => {
      if (open) { setQuery(''); setActiveIndex(0) }
    }, [open])

    // Keep the active item in range and scrolled into view as the list changes.
    React.useEffect(() => {
      if (!open) return
      const el = document.getElementById(`${listId}-opt-${activeIndex}`)
      el?.scrollIntoView({ block: 'nearest' })
    }, [activeIndex, open, listId])

    function commit(val: string) {
      if (value === undefined) setInternal(val)
      onValueChange?.(val)
      setOpen(false)
    }

    function clear() {
      if (value === undefined) setInternal('')
      onValueChange?.('')
    }

    function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault()
          setActiveIndex((i) => Math.min(i + 1, filtered.length - 1))
          break
        case 'ArrowUp':
          e.preventDefault()
          setActiveIndex((i) => Math.max(i - 1, 0))
          break
        case 'Home':
          e.preventDefault(); setActiveIndex(0); break
        case 'End':
          e.preventDefault(); setActiveIndex(filtered.length - 1); break
        case 'Enter': {
          e.preventDefault()
          const opt = filtered[activeIndex]
          if (opt && !opt.disabled) commit(opt.value)
          break
        }
        case 'Escape':
          setOpen(false)
          break
      }
    }

    const activeId = filtered[activeIndex] ? `${listId}-opt-${activeIndex}` : undefined

    return (
      <div className="relative w-full">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <button
              ref={ref}
              type="button"
              role="combobox"
              aria-expanded={open}
              aria-haspopup="listbox"
              aria-controls={listId}
              disabled={disabled}
              id={id}
              className={cn(
                'flex w-full items-center justify-between gap-2',
                s.h, s.text,
                s.px,
                clearable && selectedOption && 'pr-9',
                'rounded-md border bg-input ring-offset-background',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
                'disabled:cursor-not-allowed disabled:opacity-50',
                error
                  ? 'border-destructive focus-visible:ring-destructive/40 focus-visible:ring-offset-0'
                  : 'border-border focus-visible:ring-ring',
                className
              )}
            >
              <span className={cn('line-clamp-1 text-left', !selectedOption && 'text-muted-foreground')}>
                {selectedOption ? selectedOption.label : placeholder}
              </span>
              <ChevronDown size={s.chevron} />
            </button>
          </PopoverTrigger>

          <PopoverContent
            align="start"
            sideOffset={6}
            onOpenAutoFocus={(e) => { e.preventDefault(); inputRef.current?.focus() }}
            className={cn('w-[var(--radix-popover-trigger-width)] overflow-hidden p-0', contentClassName)}
          >
            <div className="flex items-center gap-2 border-b border-border px-3">
              <SearchIcon />
              <input
                ref={inputRef}
                type="text"
                role="combobox"
                aria-expanded
                aria-controls={listId}
                aria-autocomplete="list"
                aria-activedescendant={activeId}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder={searchPlaceholder}
                className="h-10 w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
              />
            </div>

            <ul role="listbox" id={listId} className="max-h-60 overflow-auto p-1">
              {filtered.length === 0 ? (
                <li className="px-2 py-6 text-center text-sm text-muted-foreground">{emptyText}</li>
              ) : (
                filtered.map((opt, i) => {
                  const isSelected = opt.value === selected
                  const isActive = i === activeIndex
                  return (
                    <li
                      key={opt.value}
                      id={`${listId}-opt-${i}`}
                      role="option"
                      aria-selected={isSelected}
                      aria-disabled={opt.disabled || undefined}
                      onMouseMove={() => setActiveIndex(i)}
                      onClick={() => { if (!opt.disabled) commit(opt.value) }}
                      className={cn(
                        'relative flex cursor-pointer select-none items-center rounded-lg py-2 pl-2 pr-8 text-sm text-foreground outline-none',
                        isActive && 'bg-muted',
                        opt.disabled && 'pointer-events-none opacity-50'
                      )}
                    >
                      <span className="line-clamp-1">{opt.label}</span>
                      {isSelected && (
                        <span className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center text-foreground">
                          <CheckIcon />
                        </span>
                      )}
                    </li>
                  )
                })
              )}
            </ul>
          </PopoverContent>
        </Popover>

        {clearable && selectedOption && !disabled && (
          <button
            type="button"
            tabIndex={-1}
            aria-label="Clear selection"
            onClick={clear}
            className="absolute top-1/2 right-8 flex size-4 -translate-y-1/2 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
          >
            <XIcon />
          </button>
        )}

        {name && <input type="hidden" name={name} value={selected} />}
      </div>
    )
  }
)
Combobox.displayName = 'Combobox'

export { Combobox }
