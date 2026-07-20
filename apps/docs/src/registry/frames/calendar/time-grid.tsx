'use client'

import { useEffect, useRef } from 'react'
import { cn } from '@tokiui/ui'
import type { CalendarEvent } from './events'
import { EVENT_STYLES, eventsForDay } from './events'
import { fmtHour, fmtTime, isSameDay, minutesSinceMidnight } from './date-utils'

export const HOUR_HEIGHT = 48 // px per hour row
export const HOURS = Array.from({ length: 24 }, (_, i) => i)
const DEFAULT_SCROLL_HOUR = 7

interface DayColumnProps {
  day: Date
  today: Date
  events: CalendarEvent[]
  onSelectEvent: (e: CalendarEvent) => void
  onSelectSlot?: (d: Date) => void
}

// Lay overlapping events into side-by-side columns. Returns a fractional
// left/width per event so a cluster of N overlapping events splits the width.
function layoutDayEvents(events: CalendarEvent[]) {
  const sorted = [...events].sort(
    (a, b) => a.start.getTime() - b.start.getTime() || b.end.getTime() - a.end.getTime(),
  )
  const result: { event: CalendarEvent; left: number; width: number }[] = []
  let cluster: CalendarEvent[] = []
  let clusterEnd = 0

  const flush = () => {
    const columns: CalendarEvent[][] = []
    for (const ev of cluster) {
      const col = columns.find((c) => c[c.length - 1].end.getTime() <= ev.start.getTime())
      if (col) col.push(ev)
      else columns.push([ev])
    }
    const n = columns.length
    columns.forEach((col, ci) => {
      for (const ev of col) result.push({ event: ev, left: ci / n, width: 1 / n })
    })
    cluster = []
    clusterEnd = 0
  }

  for (const ev of sorted) {
    if (cluster.length && ev.start.getTime() >= clusterEnd) flush()
    cluster.push(ev)
    clusterEnd = Math.max(clusterEnd, ev.end.getTime())
  }
  if (cluster.length) flush()
  return result
}

/** Vertical-scroll container that opens at ~7 AM instead of midnight. */
export function TimeGridScroll({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (ref.current) ref.current.scrollTop = DEFAULT_SCROLL_HOUR * HOUR_HEIGHT
  }, [])
  return (
    <div ref={ref} className="flex-1 overflow-auto">
      {children}
    </div>
  )
}

export function HourGutter() {
  return (
    <div className="w-14 shrink-0">
      {HOURS.map((h) => (
        <div key={h} className="relative" style={{ height: HOUR_HEIGHT }}>
          {h > 0 && (
            <span className="absolute -top-2 right-2 text-[11px] tabular-nums text-muted-foreground">
              {fmtHour(h)}
            </span>
          )}
        </div>
      ))}
    </div>
  )
}

export function DayColumn({ day, today, events, onSelectEvent, onSelectSlot }: DayColumnProps) {
  const laid = layoutDayEvents(eventsForDay(events, day))
  const showNow = isSameDay(day, today)
  const nowTop = (minutesSinceMidnight(today) / 60) * HOUR_HEIGHT

  return (
    <div className="relative flex-1 border-l border-border">
      {HOURS.map((h) => (
        <div
          key={h}
          className={cn(
            'border-b border-border/60',
            onSelectSlot && 'cursor-pointer transition-colors hover:bg-accent/40',
          )}
          style={{ height: HOUR_HEIGHT }}
          onClick={
            onSelectSlot
              ? () => {
                  const d = new Date(day)
                  d.setHours(h, 0, 0, 0)
                  onSelectSlot(d)
                }
              : undefined
          }
        />
      ))}

      {showNow && (
        <div
          className="pointer-events-none absolute inset-x-0 z-10 flex items-center"
          style={{ top: nowTop }}
        >
          <span className="-ml-1 size-2 rounded-full bg-destructive" />
          <span className="h-px flex-1 bg-destructive" />
        </div>
      )}

      {laid.map(({ event, left, width }) => {
        const top = (minutesSinceMidnight(event.start) / 60) * HOUR_HEIGHT
        const height = Math.max(
          ((event.end.getTime() - event.start.getTime()) / 3600000) * HOUR_HEIGHT,
          22,
        )
        return (
          <button
            key={event.id}
            onClick={(e) => {
              e.stopPropagation()
              onSelectEvent(event)
            }}
            className={cn(
              'absolute z-10 overflow-hidden rounded-md px-2 py-1 text-left text-xs transition-colors',
              EVENT_STYLES[event.color].block,
            )}
            style={{
              top,
              height: height - 2,
              left: `calc(${left * 100}% + 2px)`,
              width: `calc(${width * 100}% - 4px)`,
            }}
          >
            <span className="block truncate font-medium leading-tight">{event.title}</span>
            {height > 34 && <span className="block truncate opacity-80">{fmtTime(event.start)}</span>}
          </button>
        )
      })}
    </div>
  )
}
