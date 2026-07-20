import { cn } from '@tokiui/ui'
import type { CalendarEvent } from './events'
import { MONTHS, WEEKDAYS_LONG, isSameDay } from './date-utils'
import { DayColumn, HourGutter, TimeGridScroll } from './time-grid'

interface DayViewProps {
  date: Date
  today: Date
  events: CalendarEvent[]
  onSelectEvent: (e: CalendarEvent) => void
  onSelectSlot: (d: Date) => void
}

export function DayView({ date, today, events, onSelectEvent, onSelectSlot }: DayViewProps) {
  const isToday = isSameDay(date, today)
  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="flex items-baseline gap-2 border-b border-border px-4 py-3">
        <span className="text-sm text-muted-foreground">{WEEKDAYS_LONG[date.getDay()]}</span>
        <span className={cn('text-xl font-semibold tabular-nums', isToday && 'text-primary')}>
          {MONTHS[date.getMonth()]} {date.getDate()}
        </span>
      </div>
      <TimeGridScroll>
        <div className="flex">
          <HourGutter />
          <DayColumn
            day={date}
            today={today}
            events={events}
            onSelectEvent={onSelectEvent}
            onSelectSlot={onSelectSlot}
          />
        </div>
      </TimeGridScroll>
    </div>
  )
}
