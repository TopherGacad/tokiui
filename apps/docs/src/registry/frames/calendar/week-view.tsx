import { cn } from '@tokiui/ui'
import type { CalendarEvent } from './events'
import { WEEKDAYS, isSameDay, weekDays } from './date-utils'
import { DayColumn, HourGutter, TimeGridScroll } from './time-grid'

interface WeekViewProps {
  date: Date
  today: Date
  events: CalendarEvent[]
  onSelectEvent: (e: CalendarEvent) => void
  onSelectSlot: (d: Date) => void
}

export function WeekView({ date, today, events, onSelectEvent, onSelectSlot }: WeekViewProps) {
  const days = weekDays(date)
  return (
    <TimeGridScroll>
      {/* min-width keeps 7 columns usable on small screens (horizontal scroll) */}
      <div className="min-w-[640px]">
        <div className="sticky top-0 z-20 flex border-b border-border bg-background">
          <div className="w-14 shrink-0" />
          {days.map((d) => {
            const isToday = isSameDay(d, today)
            return (
              <div key={d.toISOString()} className="flex-1 border-l border-border py-2 text-center">
                <div className="text-xs text-muted-foreground">{WEEKDAYS[d.getDay()]}</div>
                <div
                  className={cn(
                    'mx-auto mt-0.5 flex size-7 items-center justify-center rounded-full text-sm tabular-nums',
                    isToday && 'bg-primary font-semibold text-primary-foreground',
                  )}
                >
                  {d.getDate()}
                </div>
              </div>
            )
          })}
        </div>
        <div className="flex">
          <HourGutter />
          {days.map((d) => (
            <DayColumn
              key={d.toISOString()}
              day={d}
              today={today}
              events={events}
              onSelectEvent={onSelectEvent}
              onSelectSlot={onSelectSlot}
            />
          ))}
        </div>
      </div>
    </TimeGridScroll>
  )
}
