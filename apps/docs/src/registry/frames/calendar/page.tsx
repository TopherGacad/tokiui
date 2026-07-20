'use client'

import { useEffect, useState } from 'react'
import {
  Button,
  Card,
  Input,
  cn,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@tokiui/ui'
import { MonthView } from './month-view'
import { WeekView } from './week-view'
import { DayView } from './day-view'
import { addDays, addMonths, fmtDayLong, fmtMonthYear, fmtRange, startOfWeek, MONTHS } from './date-utils'
import type { CalendarEvent, EventColor } from './events'
import { EVENT_COLORS, EVENT_STYLES, createSampleEvents } from './events'
import { CalendarIcon, ChevronLeft, ChevronRight, Clock, MapPin, Plus } from './icons'

type View = 'month' | 'week' | 'day'

const pad = (n: number) => String(n).padStart(2, '0')
const toDateInput = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
const toTimeInput = (d: Date) => `${pad(d.getHours())}:${pad(d.getMinutes())}`

function weekLabel(d: Date): string {
  const s = startOfWeek(d)
  const e = addDays(s, 6)
  const m = (x: Date) => MONTHS[x.getMonth()].slice(0, 3)
  if (s.getMonth() === e.getMonth()) return `${MONTHS[s.getMonth()]} ${s.getDate()} – ${e.getDate()}, ${e.getFullYear()}`
  if (s.getFullYear() === e.getFullYear()) return `${m(s)} ${s.getDate()} – ${m(e)} ${e.getDate()}, ${e.getFullYear()}`
  return `${m(s)} ${s.getDate()}, ${s.getFullYear()} – ${m(e)} ${e.getDate()}, ${e.getFullYear()}`
}

interface Draft {
  title: string
  date: string
  start: string
  end: string
  color: EventColor
}

export default function CalendarPage() {
  // Compute "now" on the client only — keeps SSR / static export hydration-safe.
  const [today, setToday] = useState<Date | null>(null)
  const [current, setCurrent] = useState<Date | null>(null)
  const [events, setEvents] = useState<CalendarEvent[]>([])
  const [view, setView] = useState<View>('month')
  const [selected, setSelected] = useState<CalendarEvent | null>(null)
  const [addOpen, setAddOpen] = useState(false)
  const [draft, setDraft] = useState<Draft>({ title: '', date: '', start: '09:00', end: '10:00', color: 'primary' })

  useEffect(() => {
    const now = new Date()
    setToday(now)
    setCurrent(now)
    setEvents(createSampleEvents(now))
  }, [])

  if (!today || !current) {
    return (
      <div className="flex h-dvh flex-col bg-background">
        <div className="h-[61px] border-b border-border" />
        <div className="flex-1 animate-pulse bg-muted/20" />
      </div>
    )
  }

  const shift = (dir: 1 | -1) =>
    setCurrent((c) => (c ? (view === 'month' ? addMonths(c, dir) : addDays(c, view === 'week' ? dir * 7 : dir)) : c))

  const openAdd = (slot?: Date) => {
    let start: Date
    if (slot) {
      start = new Date(slot)
    } else {
      start = new Date(current)
      start.setHours(9, 0, 0, 0)
    }
    const end = new Date(start.getTime() + 3600000)
    setDraft({ title: '', date: toDateInput(start), start: toTimeInput(start), end: toTimeInput(end), color: 'primary' })
    setAddOpen(true)
  }

  const addEvent = () => {
    const [y, mo, da] = draft.date.split('-').map(Number)
    if (!y || !mo || !da) return
    const [sh, sm] = draft.start.split(':').map(Number)
    const [eh, em] = draft.end.split(':').map(Number)
    const start = new Date(y, mo - 1, da, sh || 0, sm || 0)
    let end = new Date(y, mo - 1, da, eh || 0, em || 0)
    if (end <= start) end = new Date(start.getTime() + 3600000)
    setEvents((prev) => [
      ...prev,
      { id: String(Date.now()), title: draft.title.trim() || 'Untitled event', start, end, color: draft.color },
    ])
    setCurrent(start)
    setAddOpen(false)
  }

  const periodLabel = view === 'month' ? fmtMonthYear(current) : view === 'week' ? weekLabel(current) : fmtDayLong(current)

  return (
    <div className="flex h-dvh flex-col bg-background text-foreground">
      {/* Toolbar */}
      <header className="flex flex-wrap items-center gap-x-3 gap-y-2 border-b border-border px-4 py-3">
        <div className="flex items-center gap-2.5">
          <span className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <CalendarIcon />
          </span>
          <div className="min-w-0">
            <h1 className="truncate text-base font-semibold leading-tight text-foreground">{periodLabel}</h1>
            <p className="truncate text-xs text-muted-foreground">Today · {fmtDayLong(today)}</p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <Button variant="outline" color="neutral" size="icon" onClick={() => shift(-1)} aria-label="Previous">
            <ChevronLeft />
          </Button>
          <Button variant="outline" color="neutral" size="sm" onClick={() => setCurrent(today)}>
            Today
          </Button>
          <Button variant="outline" color="neutral" size="icon" onClick={() => shift(1)} aria-label="Next">
            <ChevronRight />
          </Button>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <div className="flex rounded-md border border-border p-0.5">
            {(['month', 'week', 'day'] as const).map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={cn(
                  'rounded px-2.5 py-1 text-sm capitalize transition-colors',
                  view === v ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground',
                )}
              >
                {v}
              </button>
            ))}
          </div>
          <Button size="sm" onClick={() => openAdd()}>
            <Plus />
            <span className="hidden sm:inline">Event</span>
          </Button>
        </div>
      </header>

      {/* Active view */}
      <main className="flex flex-1 flex-col overflow-hidden p-3 sm:p-4">
        <Card shadow="none" className="flex flex-1 flex-col overflow-hidden">
          {view === 'month' && (
            <MonthView
              date={current}
              today={today}
              events={events}
              onSelectEvent={setSelected}
              onSelectDay={(d) => {
                setCurrent(d)
                setView('day')
              }}
            />
          )}
          {view === 'week' && (
            <WeekView date={current} today={today} events={events} onSelectEvent={setSelected} onSelectSlot={openAdd} />
          )}
          {view === 'day' && (
            <DayView date={current} today={today} events={events} onSelectEvent={setSelected} onSelectSlot={openAdd} />
          )}
        </Card>
      </main>

      {/* Event detail */}
      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent size="sm">
          {selected && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-2">
                  <span className={cn('size-3 shrink-0 rounded-full', EVENT_STYLES[selected.color].dot)} />
                  <DialogTitle>{selected.title}</DialogTitle>
                </div>
              </DialogHeader>
              <div className="grid gap-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Clock />
                  <span>
                    {fmtDayLong(selected.start)} · {fmtRange(selected.start, selected.end)}
                  </span>
                </div>
                {selected.location && (
                  <div className="flex items-center gap-2">
                    <MapPin />
                    <span>{selected.location}</span>
                  </div>
                )}
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  color="destructive"
                  onClick={() => {
                    setEvents((prev) => prev.filter((e) => e.id !== selected.id))
                    setSelected(null)
                  }}
                >
                  Delete
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Add event */}
      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent size="sm">
          <DialogHeader>
            <DialogTitle>New event</DialogTitle>
          </DialogHeader>
          <div className="grid gap-3">
            <label className="grid gap-1.5 text-sm">
              <span className="font-medium text-foreground">Title</span>
              <Input
                value={draft.title}
                onChange={(e) => setDraft((d) => ({ ...d, title: e.target.value }))}
                placeholder="Event title"
                autoFocus
              />
            </label>
            <label className="grid gap-1.5 text-sm">
              <span className="font-medium text-foreground">Date</span>
              <Input type="date" value={draft.date} onChange={(e) => setDraft((d) => ({ ...d, date: e.target.value }))} />
            </label>
            <div className="grid grid-cols-2 gap-3">
              <label className="grid gap-1.5 text-sm">
                <span className="font-medium text-foreground">Start</span>
                <Input type="time" value={draft.start} onChange={(e) => setDraft((d) => ({ ...d, start: e.target.value }))} />
              </label>
              <label className="grid gap-1.5 text-sm">
                <span className="font-medium text-foreground">End</span>
                <Input type="time" value={draft.end} onChange={(e) => setDraft((d) => ({ ...d, end: e.target.value }))} />
              </label>
            </div>
            <div className="grid gap-1.5 text-sm">
              <span className="font-medium text-foreground">Color</span>
              <Select value={draft.color} onValueChange={(v) => setDraft((d) => ({ ...d, color: v as EventColor }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {EVENT_COLORS.map((c) => (
                    <SelectItem key={c} value={c}>
                      <span className="flex items-center gap-2">
                        <span className={cn('size-2.5 rounded-full', EVENT_STYLES[c].dot)} />
                        <span className="capitalize">{c}</span>
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" color="neutral" onClick={() => setAddOpen(false)}>
              Cancel
            </Button>
            <Button onClick={addEvent}>Add event</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
