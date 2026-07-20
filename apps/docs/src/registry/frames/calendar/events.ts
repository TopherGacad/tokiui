import { addDays, isSameDay } from './date-utils'

export type EventColor = 'primary' | 'info' | 'success' | 'warning' | 'destructive'

export interface CalendarEvent {
  id: string
  title: string
  start: Date
  end: Date
  color: EventColor
  location?: string
}

// Literal Tailwind classes per color so they survive Tailwind's content scan.
// `chip` — month-cell pill; `block` — timed block in week/day; `dot` — legend/marker.
export const EVENT_STYLES: Record<EventColor, { chip: string; block: string; dot: string }> = {
  primary: {
    chip: 'bg-primary/15 text-primary hover:bg-primary/25',
    block: 'bg-primary/15 border-l-2 border-primary text-primary hover:bg-primary/25',
    dot: 'bg-primary',
  },
  info: {
    chip: 'bg-info/15 text-info hover:bg-info/25',
    block: 'bg-info/15 border-l-2 border-info text-info hover:bg-info/25',
    dot: 'bg-info',
  },
  success: {
    chip: 'bg-success/15 text-success hover:bg-success/25',
    block: 'bg-success/15 border-l-2 border-success text-success hover:bg-success/25',
    dot: 'bg-success',
  },
  warning: {
    chip: 'bg-warning/20 text-warning hover:bg-warning/30',
    block: 'bg-warning/20 border-l-2 border-warning text-warning hover:bg-warning/30',
    dot: 'bg-warning',
  },
  destructive: {
    chip: 'bg-destructive/15 text-destructive hover:bg-destructive/25',
    block: 'bg-destructive/15 border-l-2 border-destructive text-destructive hover:bg-destructive/25',
    dot: 'bg-destructive',
  },
}

export const EVENT_COLORS: EventColor[] = ['primary', 'info', 'success', 'warning', 'destructive']

/** Events on `day`, sorted by start time. */
export function eventsForDay(events: CalendarEvent[], day: Date): CalendarEvent[] {
  return events
    .filter((e) => isSameDay(e.start, day))
    .sort((a, b) => a.start.getTime() - b.start.getTime())
}

// Demo events, generated relative to a reference "today" so the calendar always
// looks populated. Replace with your own data source — the views only need an
// array of `CalendarEvent`.
export function createSampleEvents(today: Date): CalendarEvent[] {
  const at = (offset: number, h: number, m: number, dur: number, e: Omit<CalendarEvent, 'id' | 'start' | 'end'>): CalendarEvent => {
    const start = addDays(today, offset)
    start.setHours(h, m, 0, 0)
    const end = new Date(start.getTime() + dur * 60000)
    return { id: `${offset}-${h}-${m}`, start, end, ...e }
  }
  return [
    at(0, 9, 30, 30, { title: 'Team standup', color: 'primary', location: 'Zoom' }),
    at(0, 11, 0, 60, { title: 'Design review', color: 'info', location: 'Room 4' }),
    at(0, 14, 0, 90, { title: '1:1 with Sam', color: 'success' }),
    at(0, 16, 30, 60, { title: 'Ship checklist', color: 'warning' }),
    at(1, 10, 0, 120, { title: 'Roadmap workshop', color: 'info', location: 'Boardroom' }),
    at(1, 13, 0, 45, { title: 'Lunch & learn', color: 'success', location: 'Kitchen' }),
    at(2, 9, 0, 30, { title: 'Standup', color: 'primary', location: 'Zoom' }),
    at(2, 15, 0, 60, { title: 'Customer call', color: 'destructive' }),
    at(3, 12, 0, 60, { title: 'Product sync', color: 'primary' }),
    at(4, 9, 30, 30, { title: 'Standup', color: 'primary', location: 'Zoom' }),
    at(4, 14, 0, 120, { title: 'Sprint planning', color: 'warning', location: 'Room 2' }),
    at(-1, 10, 0, 60, { title: 'Retro', color: 'info', location: 'Room 4' }),
    at(-2, 13, 30, 90, { title: 'Interview: FE', color: 'success' }),
    at(6, 11, 0, 60, { title: 'All-hands', color: 'destructive', location: 'Main hall' }),
    at(9, 15, 0, 45, { title: 'Budget review', color: 'warning' }),
    at(12, 10, 0, 60, { title: 'Onboarding', color: 'success' }),
  ]
}
