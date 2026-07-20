import { cn } from '@tokiui/ui'
import type { CalendarEvent } from './events'
import { EVENT_STYLES, eventsForDay } from './events'
import { WEEKDAYS, fmtTime, isSameDay, isSameMonth, monthMatrix } from './date-utils'

interface MonthViewProps {
  date: Date
  today: Date
  events: CalendarEvent[]
  onSelectEvent: (e: CalendarEvent) => void
  onSelectDay: (d: Date) => void
}

export function MonthView({ date, today, events, onSelectEvent, onSelectDay }: MonthViewProps) {
  const cells = monthMatrix(date)
  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="grid grid-cols-7 border-b border-border">
        {WEEKDAYS.map((d) => (
          <div key={d} className="py-2 text-center text-xs font-medium text-muted-foreground">
            {d}
          </div>
        ))}
      </div>
      <div className="grid flex-1 grid-cols-7 grid-rows-6">
        {cells.map((day, i) => {
          const dayEvents = eventsForDay(events, day)
          const inMonth = isSameMonth(day, date)
          const isToday = isSameDay(day, today)
          const shown = dayEvents.slice(0, 3)
          const extra = dayEvents.length - shown.length
          return (
            <div
              key={i}
              onClick={() => onSelectDay(day)}
              className={cn(
                'flex min-h-0 cursor-pointer flex-col gap-1 border-b border-r border-border p-1.5 transition-colors hover:bg-accent/40',
                !inMonth && 'bg-muted/30',
                (i + 1) % 7 === 0 && 'border-r-0',
                i >= 35 && 'border-b-0',
              )}
            >
              <span
                className={cn(
                  'flex size-6 items-center justify-center self-start rounded-full text-xs tabular-nums',
                  inMonth ? 'text-foreground' : 'text-muted-foreground/60',
                  isToday && 'bg-primary font-semibold text-primary-foreground',
                )}
              >
                {day.getDate()}
              </span>
              <div className="flex flex-col gap-0.5 overflow-hidden">
                {shown.map((e) => (
                  <button
                    key={e.id}
                    onClick={(ev) => {
                      ev.stopPropagation()
                      onSelectEvent(e)
                    }}
                    className={cn(
                      'truncate rounded px-1.5 py-0.5 text-left text-[11px] font-medium leading-tight transition-colors',
                      EVENT_STYLES[e.color].chip,
                    )}
                  >
                    <span className="hidden tabular-nums opacity-70 sm:inline">{fmtTime(e.start)} </span>
                    {e.title}
                  </button>
                ))}
                {extra > 0 && (
                  <span className="px-1 text-[11px] text-muted-foreground">+{extra} more</span>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
