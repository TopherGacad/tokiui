'use client'

import { useState } from 'react'
import { Badge, Switch, Kbd, Tabs, TabsList, TabsTrigger, DonutChart, AreaChart, cn } from '@tokiui/ui'

/* =============================== Icons ===============================
   Inline lucide/feather-style icons, 24×24 viewBox, currentColor stroke.
   `ic` is the default 15px nav/inline size; buttons pass their own sizes. */
const ic = 'size-[15px] shrink-0'

const Compass = ({ className = 'size-5' }: { className?: string }) => <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="m14.5 9.5-5 1.5 1.5 5 5-1.5z" /></svg>
const BarChartIcon = ({ className = 'size-5' }: { className?: string }) => <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 3v18h18" /><rect x="7" y="11" width="3" height="6" /><rect x="12" y="7" width="3" height="10" /><rect x="17" y="13" width="3" height="4" /></svg>
const FileText = ({ className = 'size-5' }: { className?: string }) => <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6" /></svg>
const Command = ({ className = 'size-5' }: { className?: string }) => <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M15 6a3 3 0 1 0 3-3 3 3 0 0 0-3 3v12a3 3 0 1 1-3-3h6a3 3 0 1 1-3 3V6a3 3 0 1 0-3 3h6" /></svg>
const Edit3 = ({ className = 'size-5' }: { className?: string }) => <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4z" /></svg>
const HelpCircle = ({ className = 'size-5' }: { className?: string }) => <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M9.5 9a2.5 2.5 0 0 1 4.5 1.5c0 1.5-2 2-2 3" /><path d="M12 17h.01" /></svg>
const Settings = ({ className = 'size-5' }: { className?: string }) => <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.6a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09A1.65 1.65 0 0 0 15 4.6a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>

const Star = ({ className = ic }: { className?: string }) => <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polygon points="12 2 15 8.5 22 9.3 17 14 18.3 21 12 17.5 5.7 21 7 14 2 9.3 9 8.5 12 2" /></svg>
const Clock = ({ className = ic }: { className?: string }) => <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
const ListIcon = ({ className = ic }: { className?: string }) => <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 7h18M3 12h18M3 17h12" /></svg>
const Target = ({ className = ic }: { className?: string }) => <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1" /></svg>
const Dashboard = ({ className = ic }: { className?: string }) => <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="3" width="7" height="9" /><rect x="14" y="3" width="7" height="5" /><rect x="14" y="12" width="7" height="9" /><rect x="3" y="16" width="7" height="5" /></svg>
const Archive = ({ className = ic }: { className?: string }) => <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 20h16M4 20V8l6-4 6 4M4 20h4v-6h4v6" /></svg>

const ChevronDown = ({ className = 'size-3.5' }: { className?: string }) => <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9" /></svg>
const ChevronRight = ({ className = 'size-3.5' }: { className?: string }) => <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="9 18 15 12 9 6" /></svg>
const ChevronUp = ({ className = 'size-3' }: { className?: string }) => <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="18 15 12 9 6 15" /></svg>
const Plus = ({ className = 'size-3.5' }: { className?: string }) => <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 5v14M5 12h14" /></svg>
const Search = ({ className = 'size-4' }: { className?: string }) => <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></svg>
const Menu = ({ className = 'size-[17px]' }: { className?: string }) => <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 6h18M3 12h18M3 18h18" /></svg>
const Sliders = ({ className = 'size-4' }: { className?: string }) => <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6" /></svg>
const Download = ({ className = 'size-4' }: { className?: string }) => <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
const Share = ({ className = 'size-4' }: { className?: string }) => <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" /><polyline points="16 6 12 2 8 6" /><line x1="12" y1="2" x2="12" y2="15" /></svg>
const ArrowUpRight = ({ className = 'size-[11px]' }: { className?: string }) => <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 17 17 7M17 7H9M17 7v8" /></svg>
const Grip = ({ className = 'size-[15px]' }: { className?: string }) => <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 6h14M3 12h10M3 18h14" /></svg>
const Filter = ({ className = 'size-[13px]' }: { className?: string }) => <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 3H2l8 9.5V19l4 2v-8.5z" /></svg>
const MoreHorizontal = ({ className = 'size-3.5' }: { className?: string }) => <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /><circle cx="5" cy="12" r="1" /></svg>
const StarFilled = ({ className = 'size-[13px]' }: { className?: string }) => <svg className={className} viewBox="0 0 24 24" fill="currentColor" stroke="none" aria-hidden="true"><polygon points="12 2 15 8.5 22 9.3 17 14 18.3 21 12 17.5 5.7 21 7 14 2 9.3 9 8.5 12 2" /></svg>
const Circle = ({ className = 'size-4' }: { className?: string }) => <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9" /></svg>

/* =============================== Data ===============================
   Self-contained fake data; copy and numbers taken from the design spec. */

// Gradient person avatars — brand-tinted initials the tokiui <Avatar> can't express
// (it has no custom-gradient color), so they're rendered as small styled spans.
const GRADIENTS = {
  A: 'linear-gradient(135deg, oklch(0.7 0.16 40), oklch(0.45 0.13 30))',   // Armin / orange
  E: 'linear-gradient(135deg, oklch(0.68 0.15 250), oklch(0.42 0.13 275))', // Eren / blue
  M: 'linear-gradient(135deg, oklch(0.6 0.17 300), oklch(0.4 0.14 315))',   // Mikasa / purple
  S: 'linear-gradient(135deg, oklch(0.55 0.16 145), oklch(0.35 0.12 150))', // green
  JR: 'linear-gradient(135deg, oklch(0.72 0.16 250), oklch(0.42 0.14 285))', // JR / indigo
} as const

// The spec's chartreuse "primary-soft" tint. Hardcoded (not `var(--primary-soft)`)
// because the docs app defines --primary-soft as a green value, and the design
// intentionally keeps the chartreuse accent.
const PRIMARY_SOFT = 'oklch(0.94 0.08 118)'
const PRIMARY_SOFT_BORDER = 'color-mix(in oklch, oklch(0.74 0.17 118) 32%, var(--border))'

// Brand icon tile colors (referrers / platforms).
const BRAND = {
  dribbble: 'oklch(0.6 0.19 355)',
  instagram: 'linear-gradient(135deg, oklch(0.65 0.2 30), oklch(0.55 0.22 350))',
  behance: 'oklch(0.5 0.16 265)',
  google: 'oklch(0.55 0.18 145)',
} as const

const REFERRERS = [
  { name: 'Dribbble', mark: 'D', bg: BRAND.dribbble, value: '$227,459', pct: '43%' },
  { name: 'Instagram', mark: 'Ig', bg: BRAND.instagram, value: '$142,823', pct: '27%' },
  { name: 'Behance', mark: 'Bē', bg: BRAND.behance, value: '$89,935', pct: '11%' },
  { name: 'Google', mark: 'G', bg: BRAND.google, value: '$37,028', pct: '7%' },
]

// Donut segments (spec §Deals amount). tokiui DonutChart draws these directly.
const DONUT = [
  { label: 'Dribbble', value: 43, color: 'oklch(0.62 0.20 25)' },
  { label: 'Instagram', value: 27, color: 'oklch(0.72 0.16 300)' },
  { label: 'Behance', value: 19, color: 'oklch(0.60 0.14 250)' },
  { label: 'Google', value: 11, color: 'oklch(0.55 0.16 145)' },
]

const SEGBAR = [
  { g: GRADIENTS.A, initial: 'A', value: '$209,633', pct: '39.63%', flex: 2.09 },
  { g: GRADIENTS.E, initial: 'E', value: '$156,841', pct: '29.65%', flex: 1.57 },
  { g: GRADIENTS.M, initial: 'M', value: '$117,115', pct: '22.14%', flex: 1.17 },
  { g: GRADIENTS.S, initial: 'S', value: '$45,386', pct: '8.58%', flex: 0.45 },
]

// Platform-value metrics — the segmented toggle swaps between these.
// Each month's stacked bar: `accent` (the metric value) over `muted` (remainder to 100%).
type PlatformMetric = 'revenue' | 'leads' | 'wl'
const PLATFORM: Record<PlatformMetric, { title: string; big: string; bars: { label: string; accent: number; tag: string }[] }> = {
  revenue: {
    title: 'Revenue',
    big: '$18,552',
    bars: [
      { label: 'Sep', accent: 38, tag: '$6,901' },
      { label: 'Oct', accent: 52, tag: '$11,035' },
      { label: 'Nov', accent: 44, tag: '$9,288' },
    ],
  },
  leads: {
    title: 'Leads',
    big: '373',
    bars: [
      { label: 'Sep', accent: 44, tag: '97' },
      { label: 'Oct', accent: 61, tag: '141' },
      { label: 'Nov', accent: 50, tag: '135' },
    ],
  },
  wl: {
    title: 'Win/loss',
    big: '16%',
    bars: [
      { label: 'Sep', accent: 30, tag: '12%' },
      { label: 'Oct', accent: 48, tag: '19%' },
      { label: 'Nov', accent: 40, tag: '17%' },
    ],
  },
}

type Rep = { g: string; initial: string; name: string; revenue: string; leads: string; total: string; kpi: string; wlPct: string; wlPill: string; wlNum: string }
const REP_ARMIN: Rep = { g: GRADIENTS.A, initial: 'A', name: 'Armin A.', revenue: '$209,633', leads: '41', total: '118', kpi: '0.84', wlPct: '31%', wlPill: '12', wlNum: '29' }
const REP_MIKASA: Rep = { g: GRADIENTS.M, initial: 'M', name: 'Mikasa A.', revenue: '$156,841', leads: '54', total: '103', kpi: '0.89', wlPct: '39%', wlPill: '21', wlNum: '33' }
const REP_EREN: Rep = { g: GRADIENTS.E, initial: 'E', name: 'Eren Y.', revenue: '$117,115', leads: '22', total: '84', kpi: '0.79', wlPct: '32%', wlPill: '7', wlNum: '15' }

const PLATFORM_MINI = [
  { name: 'Dribbble', mark: 'D', bg: BRAND.dribbble, pct: '14.1%', value: '$44,072', accent: false },
  { name: 'Instagram', mark: 'Ig', bg: BRAND.instagram, pct: '28.1%', value: '$44,072', accent: false },
  { name: 'Google', mark: 'G', bg: BRAND.google, pct: '5.4%', value: '$8,449', accent: true },
  { name: 'Other', mark: null, bg: null, pct: '7.1%', value: '$11,595', accent: false },
]

// Sales-dynamic weekly series (primary + dashed compare), approximated from the
// hand-authored SVG in the reference so the shape reads the same across W1–W6.
const DYN_PRIMARY = [22, 42, 68, 60, 78, 66]
const DYN_COMPARE = [12, 22, 34, 28, 40, 32]
const DYN_LABELS = ['W 1', 'W 2', 'W 3', 'W 4', 'W 5', 'W 6']

/* =============================== Reusable bits =============================== */

// Gradient avatar (mono initials, white text).
function Av({ g, children, className = '' }: { g: string; children: React.ReactNode; className?: string }) {
  return (
    <span
      className={`inline-flex items-center justify-center rounded-full font-mono text-[11px] font-semibold text-white ${className}`}
      style={{ background: g }}
      aria-hidden="true"
    >
      {children}
    </span>
  )
}

// Brand tile (rounded square, white initials, or a fallback icon).
function BrandTile({ bg, mark, className = 'size-6 rounded-md text-[11px]' }: { bg: string | null; mark: string | null; className?: string }) {
  if (!bg) return <span className="inline-flex size-4 items-center justify-center text-muted-foreground" aria-hidden="true"><Circle className="size-4" /></span>
  return (
    <span className={`inline-flex items-center justify-center font-bold text-white ${className}`} style={{ background: bg }} aria-hidden="true">
      {mark}
    </span>
  )
}

// Icon button — top bar / report-head style: bordered square, muted → foreground hover.
function IconButton({ children, label, className = '' }: { children: React.ReactNode; label: string; className?: string }) {
  return (
    <button
      type="button"
      aria-label={label}
      className={`inline-flex items-center justify-center rounded-[10px] border border-border bg-card text-muted-foreground transition-colors hover:border-[var(--border-strong)] hover:bg-muted hover:text-foreground ${className}`}
    >
      {children}
    </button>
  )
}

// A dark num-pill (leads / soft counts). `soft` uses the muted variant.
function NumPill({ children, soft = false }: { children: React.ReactNode; soft?: boolean }) {
  return (
    <span
      className={
        soft
          ? 'inline-flex h-[22px] min-w-[26px] items-center justify-center rounded-full border border-border bg-muted px-[7px] font-mono text-[11px] font-semibold text-foreground'
          : 'inline-flex h-[22px] min-w-[26px] items-center justify-center rounded-full bg-foreground px-[7px] font-mono text-[11px] font-semibold text-[var(--card)]'
      }
    >
      {children}
    </span>
  )
}

// A tree-nav link row.
function NavLink({
  icon,
  children,
  active = false,
  open = false,
  chevron = false,
  add = false,
  badge,
  badgeMuted = false,
  sub = false,
  className = '',
}: {
  icon?: React.ReactNode
  children: React.ReactNode
  active?: boolean
  open?: boolean
  chevron?: boolean
  add?: boolean
  badge?: string
  badgeMuted?: boolean
  sub?: boolean
  className?: string
}) {
  return (
    <button
      type="button"
      className={`group flex w-full items-center gap-[9px] rounded-lg py-[7px] pr-[10px] text-left transition-colors hover:bg-muted hover:text-foreground ${
        sub ? 'pl-[18px] text-[13px]' : 'pl-[10px] text-[13.5px]'
      } ${active ? 'bg-muted font-medium text-foreground' : 'text-muted-foreground'} ${className}`}
    >
      {icon}
      <span className="truncate">{children}</span>
      {add && (
        <span className="ml-auto inline-flex size-[18px] items-center justify-center rounded-[5px] text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 hover:bg-border hover:text-foreground">
          <Plus className="size-3.5" />
        </span>
      )}
      {chevron && (
        <span className={`ml-auto text-muted-foreground transition-transform ${open ? 'rotate-90' : ''}`}>
          <ChevronRight className="size-[13px]" />
        </span>
      )}
      {badge && (
        <Badge
          variant={badgeMuted ? 'outline' : 'solid'}
          color={badgeMuted ? 'secondary' : 'default'}
          size="sm"
          className={`ml-auto h-[18px] min-w-[18px] justify-center rounded-full px-[5px] py-0 font-mono text-[10.5px] font-semibold ${
            badgeMuted ? 'border-border bg-muted text-muted-foreground' : ''
          }`}
        >
          {badge}
        </Badge>
      )}
    </button>
  )
}

// Nested group: left padding + a 1px vertical guide line.
function NavSub({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative my-1 pl-3.5 before:absolute before:bottom-2 before:left-[15px] before:top-0.5 before:w-px before:bg-border">
      {children}
    </div>
  )
}

// Card head (title + trailing control), with bottom border.
function CardHead({ title, children }: { title: React.ReactNode; children?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between border-b border-border px-4 py-[13px]">
      <div className="flex items-center gap-2 text-[13.5px] font-semibold text-foreground">{title}</div>
      {children}
    </div>
  )
}

/* =============================== Frame =============================== */

export default function SalesPage() {
  const [platform, setPlatform] = useState<PlatformMetric>('revenue')
  const [expanded, setExpanded] = useState(true)
  const [navOpen, setNavOpen] = useState(false)
  const p = PLATFORM[platform]

  return (
    <div className="h-dvh bg-background">
      <div className="grid h-full min-h-0 grid-cols-[64px_1fr] overflow-hidden bg-card lg:grid-cols-[64px_232px_1fr]">
        {/* ============ ICON RAIL ============ */}
        <nav className="flex flex-col items-center gap-1.5 border-r border-border bg-card py-4">
          <div className="mb-3.5 flex size-9 items-center justify-center rounded-[11px] bg-foreground text-[17px] font-bold tracking-[-0.03em] text-[var(--card)]">t</div>
          {[
            { icon: <Compass />, label: 'Explore', active: false },
            { icon: <BarChartIcon />, label: 'Reports', active: true },
            { icon: <FileText />, label: 'Documents', active: false },
            { icon: <Command />, label: 'Command', active: false },
            { icon: <Edit3 />, label: 'Edit', active: false },
          ].map((b) => (
            <button
              key={b.label}
              type="button"
              aria-label={b.label}
              aria-current={b.active || undefined}
              className={`relative flex size-10 items-center justify-center rounded-xl transition-colors ${
                b.active
                  ? 'bg-primary text-primary-foreground before:absolute before:-left-4 before:top-1/2 before:h-[22px] before:w-[3px] before:-translate-y-1/2 before:rounded-r-[3px] before:bg-primary before:content-[""]'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              {b.icon}
            </button>
          ))}
          <div className="flex-1" />
          <button type="button" aria-label="Help" className="flex size-10 items-center justify-center rounded-xl text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
            <HelpCircle />
          </button>
          <div className="relative mb-2">
            <span
              className="flex size-[34px] items-center justify-center rounded-full border-2 border-[var(--card)] font-mono text-xs font-semibold text-white"
              style={{ background: GRADIENTS.JR }}
              aria-hidden="true"
            >
              JR
            </span>
            <span className="absolute -right-px -top-px size-[9px] rounded-full border-2 border-[var(--card)] bg-primary" />
          </div>
          <button type="button" aria-label="Settings" className="flex size-10 items-center justify-center rounded-xl text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
            <Settings />
          </button>
        </nav>

        {/* ============ TREE NAV ============ */}
        {/* backdrop behind the mobile nav drawer */}
        {navOpen && (
          <button
            type="button"
            aria-label="Close navigation"
            onClick={() => setNavOpen(false)}
            className="fixed inset-0 z-40 bg-foreground/40 lg:hidden"
          />
        )}
        <div
          className={cn(
            'flex min-h-0 flex-col border-r border-border bg-card',
            // static column at lg+, slide-in drawer beside the icon rail below lg
            'max-lg:fixed max-lg:inset-y-0 max-lg:left-16 max-lg:z-50 max-lg:w-[232px] max-lg:shadow-2xl max-lg:transition-transform max-lg:duration-300 max-lg:ease-out',
            navOpen ? 'max-lg:translate-x-0' : 'max-lg:-translate-x-[300px]',
          )}
        >
          <div className="flex items-center gap-2 px-4 pb-4 pt-5 text-[15px] font-semibold tracking-[-0.01em] text-foreground">
            tokiui.com
            <ChevronDown className="size-3.5 text-muted-foreground" />
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto px-2.5 pb-3.5">
            <NavLink icon={<Star />}>Starred</NavLink>
            <NavLink icon={<Clock />}>Recent</NavLink>
            <NavLink icon={<ListIcon />}>Sales list</NavLink>
            <NavLink icon={<Target />}>Goals</NavLink>

            <div className="mt-0.5">
              <NavLink icon={<Dashboard />} open add>Dashboard</NavLink>
              <NavSub>
                <NavLink>Codename</NavLink>
                <NavLink chevron open>Shared with me</NavLink>
                <NavSub>
                  <NavLink sub>Cargo2go</NavLink>
                  <NavLink sub badge="2">Cloudz3r</NavLink>
                  <NavLink sub>Idioma</NavLink>
                  <NavLink sub>Syllables</NavLink>
                  <NavLink sub>x-0b</NavLink>
                </NavSub>
              </NavSub>
            </div>

            <div className="mt-0.5">
              <NavLink icon={<FileText className={ic} />} open add>Reports</NavLink>
              <NavSub>
                <NavLink chevron open>Shared with me</NavLink>
                <NavSub>
                  <NavLink sub>Deals by user</NavLink>
                  <NavLink sub>Deal duration</NavLink>
                </NavSub>
                <NavLink chevron open>My reports</NavLink>
                <NavSub>
                  <NavLink sub>Emails received</NavLink>
                  <NavLink sub>Deal duration</NavLink>
                  <NavLink sub active className="!font-semibold !text-primary">New report</NavLink>
                  <NavLink sub badge="7" badgeMuted>Analytics</NavLink>
                </NavSub>
              </NavSub>
            </div>

            <NavLink icon={<Archive />} className="mt-2">Manage folders</NavLink>
          </div>
        </div>

        {/* ============ MAIN ============ */}
        <div className="flex min-h-0 min-w-0 flex-col bg-background">
          {/* top bar */}
          <div className="flex items-center gap-3.5 border-b border-border bg-card px-5 py-3">
            <button
              type="button"
              aria-label="Open navigation"
              onClick={() => setNavOpen(true)}
              className="flex size-9 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground lg:hidden"
            >
              <Menu />
            </button>
            <div className="flex h-[38px] max-w-[440px] flex-1 items-center gap-[9px] rounded-full border border-border bg-input px-3.5 text-muted-foreground transition-colors focus-within:border-ring focus-within:bg-card">
              <Search className="size-4 shrink-0" />
              <input
                placeholder={'Try searching “insights”'}
                className="min-w-0 flex-1 border-0 bg-transparent text-[13.5px] text-foreground outline-none placeholder:text-muted-foreground"
              />
              <Kbd size="sm" className="border-[var(--border-strong)] shadow-none">⌘ K</Kbd>
            </div>
            <div className="flex-1" />
            <IconButton label="Menu" className="size-9"><Menu /></IconButton>
            <div className="flex">
              <Av g={GRADIENTS.A} className="size-[30px] border-2 border-[var(--card)]">A</Av>
              <Av g={GRADIENTS.E} className="-ml-2 size-[30px] border-2 border-[var(--card)]">E</Av>
              <Av g={GRADIENTS.M} className="-ml-2 size-[30px] border-2 border-[var(--card)]">M</Av>
            </div>
            <button
              type="button"
              aria-label="Add"
              className="flex size-[38px] items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
            >
              <Plus className="size-[18px]" />
            </button>
          </div>

          {/* canvas — pb clears the fixed "Frames / View code" chrome bar */}
          <div className="min-h-0 flex-1 overflow-y-auto px-6 pb-24 pt-[22px]">
            {/* report head */}
            <div className="mb-5 flex flex-wrap items-center gap-3">
              {/* people — grows to push the actions right, scrolls (not clips) when narrow */}
              <div className="flex min-w-0 flex-1 items-center gap-2 overflow-x-auto [scrollbar-width:none]">
                <button
                  type="button"
                  aria-label="Add person"
                  className="flex size-8 shrink-0 items-center justify-center rounded-full border border-dashed border-[var(--border-strong)] text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
                >
                  <Plus className="size-4" />
                </button>
                {[
                  { g: GRADIENTS.A, i: 'A', n: 'Armin A.' },
                  { g: GRADIENTS.E, i: 'E', n: 'Eren Y.' },
                  { g: GRADIENTS.M, i: 'M', n: 'Mikasa A.' },
                ].map((c) => (
                  <span key={c.n} className="inline-flex h-8 shrink-0 items-center gap-[7px] rounded-full border border-border bg-card py-0 pl-1 pr-3 text-[13px] text-foreground">
                    <Av g={c.g} className="size-6">{c.i}</Av>
                    {c.n}
                  </span>
                ))}
              </div>
              {/* actions — wrap to their own line as a group on narrow screens */}
              <div className="flex items-center gap-3">
                <IconButton label="View options" className="size-9"><Sliders /></IconButton>
                <IconButton label="Download" className="size-9"><Download /></IconButton>
                <IconButton label="Share" className="size-9"><Share /></IconButton>
                <span className="inline-flex h-[34px] items-center gap-2 rounded-full border border-border bg-card px-3 text-[12.5px] text-muted-foreground">
                  <Switch defaultChecked aria-label="Compare timeframe" />
                  Timeframe
                  <span className="inline-flex items-center gap-1.5 font-medium text-foreground">
                    Sep 1 – Nov 30, 2023
                    <ChevronDown className="size-3" />
                  </span>
                </span>
              </div>
            </div>

            <h1 className="mb-1 text-[30px] font-semibold tracking-[-0.03em] text-foreground">New report</h1>

            {/* revenue + kpi card */}
            <div className="mb-3.5 rounded-[14px] border border-border bg-card p-[18px] shadow-sm">
              <div className="mb-4 flex flex-wrap items-start justify-between gap-x-6 gap-y-[18px]">
                {/* revenue block */}
                <div className="min-w-[260px] shrink">
                  <div className="mb-1.5 text-[13px] font-medium text-muted-foreground">Revenue</div>
                  <div className="flex flex-wrap items-baseline gap-y-2 text-[34px] font-semibold leading-none tracking-[-0.035em] text-foreground sm:text-[44px]">
                    $528,976<span className="text-muted-foreground">.82</span>
                    <span className="ml-3.5 inline-flex gap-2 self-center">
                      <span className="inline-flex h-[22px] items-center gap-1 rounded-full bg-[color-mix(in_oklch,var(--up)_14%,var(--card))] px-[9px] font-mono text-xs font-semibold text-[var(--up)]">
                        <ArrowUpRight />7.9%
                      </span>
                      <span className="inline-flex h-[22px] items-center rounded-full border border-border bg-muted px-[9px] font-mono text-xs font-semibold text-muted-foreground">
                        $27,335.09
                      </span>
                    </span>
                  </div>
                  <div className="mt-2.5 inline-flex items-center gap-1.5 text-[12.5px] text-muted-foreground">
                    vs prev. $501,641.73 <span>·</span> Jun 1 – Aug 31, 2023 <ChevronDown className="size-[11px]" />
                  </div>
                </div>

                {/* kpi grid */}
                <div className="grid flex-[1_1_520px] grid-cols-[repeat(auto-fit,minmax(120px,1fr))] gap-2.5 xl:grid-cols-5">
                  <div className="flex flex-col gap-1.5 rounded-[10px] border border-border bg-card px-3.5 py-3">
                    <div className="flex items-center justify-between text-[11.5px] text-muted-foreground">Top sales <ChevronRight className="size-[13px]" /></div>
                    <div className="text-xl font-semibold tracking-[-0.02em] text-foreground">72</div>
                    <div className="flex items-center gap-1.5 text-[11.5px] text-muted-foreground"><Av g={GRADIENTS.M} className="size-4 text-[9px]">M</Av>Mikasa</div>
                  </div>
                  <div className="flex flex-col gap-1.5 rounded-[10px] border border-foreground bg-foreground px-3.5 py-3">
                    <div className="flex items-center justify-between text-[11.5px] text-[color-mix(in_oklch,var(--card)_60%,var(--foreground))]">Best deal <span className="text-primary"><StarFilled /></span></div>
                    <div className="text-xl font-semibold tracking-[-0.02em] text-[var(--card)]">$42,300</div>
                    <div className="flex items-center gap-1.5 text-[11.5px] text-[color-mix(in_oklch,var(--card)_60%,var(--foreground))]">Rolf Inc. <ChevronRight className="size-3" /></div>
                  </div>
                  <div className="flex flex-col gap-1.5 rounded-[10px] border border-border bg-card px-3.5 py-3">
                    <div className="flex items-center justify-between text-[11.5px] text-muted-foreground">Deals</div>
                    <div className="text-xl font-semibold tracking-[-0.02em] text-foreground">256</div>
                    <div className="flex items-center gap-1.5 text-[11.5px] text-muted-foreground"><span className="font-mono text-[11px] font-semibold text-[var(--down)]">▾ 5</span></div>
                  </div>
                  <div className="flex flex-col gap-1.5 rounded-[10px] border border-border bg-card px-3.5 py-3">
                    <div className="flex items-center justify-between text-[11.5px] text-muted-foreground">Value</div>
                    <div className="text-xl font-semibold tracking-[-0.02em] text-foreground">528k</div>
                    <div className="flex items-center gap-1.5 text-[11.5px] text-muted-foreground"><span className="font-mono text-[11px] font-semibold text-[var(--up)]">▴ 7.9%</span></div>
                  </div>
                  <div className="flex flex-col gap-1.5 rounded-[10px] border border-border bg-card px-3.5 py-3">
                    <div className="flex items-center justify-between text-[11.5px] text-muted-foreground">Win rate</div>
                    <div className="text-xl font-semibold tracking-[-0.02em] text-foreground">44%</div>
                    <div className="flex items-center gap-1.5 text-[11.5px] text-muted-foreground"><span className="font-mono text-[11px] font-semibold text-[var(--up)]">▴ 1.2%</span></div>
                  </div>
                </div>
              </div>

              {/* segbar */}
              <div className="mt-3.5 flex items-center gap-2">
                <div className="flex min-w-0 flex-1 gap-1 overflow-x-auto pb-0.5 [scrollbar-width:none]">
                  {SEGBAR.map((s) => (
                    <span
                      key={s.initial}
                      className="flex items-center gap-2 whitespace-nowrap rounded-full border border-border bg-muted px-3 py-[7px] text-[12.5px] text-foreground"
                      style={{ flex: s.flex }}
                    >
                      <Av g={s.g} className="size-[18px] text-[9px]">{s.initial}</Av>
                      <strong className="font-semibold">{s.value}</strong>
                      <span className="font-mono text-[11px] text-muted-foreground">{s.pct}</span>
                    </span>
                  ))}
                </div>
                <button type="button" className="inline-flex h-[34px] items-center gap-1.5 rounded-full bg-foreground px-4 text-[13px] font-medium text-[var(--card)] transition-opacity hover:opacity-90">
                  Details <ChevronRight className="size-[13px]" />
                </button>
              </div>
            </div>

            {/* main grid */}
            <div className="mt-4 grid grid-cols-1 items-start gap-3.5 min-[1180px]:grid-cols-[1.35fr_1.4fr]">
              {/* ===== LEFT column ===== */}
              <div className="flex flex-col gap-3.5">
                {/* Referrers */}
                <div className="rounded-[14px] border border-border bg-card shadow-sm">
                  <CardHead title={<><span className="text-muted-foreground"><Grip /></span>Referrers</>}>
                    <button type="button" className="inline-flex h-7 items-center gap-1.5 rounded-lg border border-border bg-card px-2.5 text-xs text-muted-foreground transition-colors hover:border-[var(--border-strong)] hover:text-foreground">
                      Filters <Filter />
                    </button>
                  </CardHead>
                  {REFERRERS.map((r, i) => (
                    <div key={r.name} className={`grid grid-cols-[1fr_auto_auto] items-center gap-3 px-4 py-[11px] ${i > 0 ? 'border-t border-border' : ''}`}>
                      <span className="inline-flex items-center gap-2.5 text-[13px] font-medium text-foreground">
                        <BrandTile bg={r.bg} mark={r.mark} className="size-6 rounded-[7px] text-[11px]" />
                        {r.name}
                      </span>
                      <span className="font-mono text-[13px] font-medium text-foreground">{r.value}</span>
                      <span className="min-w-9 text-right font-mono text-xs text-muted-foreground">{r.pct}</span>
                    </div>
                  ))}
                </div>

                {/* Deals amount donut */}
                <div className="rounded-[14px] border border-border bg-card shadow-sm">
                  <CardHead title={<>Deals amount <span className="font-normal text-muted-foreground">by referrer</span></>}>
                    <IconButton label="More" className="h-7 w-8 rounded-lg"><MoreHorizontal /></IconButton>
                  </CardHead>
                  <div className="flex flex-col items-center gap-3.5 px-4 pb-5 pt-[18px]">
                    <DonutChart data={DONUT} size={130} thickness={20}>
                      <span className="text-[11px] text-muted-foreground">Total</span>
                      <span className="text-[18px] font-semibold tracking-[-0.02em] text-foreground">$497k</span>
                    </DonutChart>
                    <div className="grid w-full grid-cols-2 gap-x-4 gap-y-1.5">
                      {DONUT.map((d) => (
                        <div key={d.label} className="flex items-center gap-[7px] text-xs text-muted-foreground">
                          <span className="size-1.5 shrink-0 rounded-full" style={{ background: d.color }} />
                          {d.label}
                          <b className="ml-auto font-mono text-[11.5px] font-semibold text-foreground">{d.value}%</b>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Platform value */}
                <div className="rounded-[14px] border border-border bg-card shadow-sm">
                  <CardHead
                    title={
                      <>
                        <BrandTile bg={BRAND.dribbble} mark="D" className="size-5 rounded-md text-[10px]" />
                        Platform value <span className="font-normal text-muted-foreground">Dribbble</span>
                      </>
                    }
                  >
                    <Tabs value={platform} onValueChange={(v) => setPlatform(v as PlatformMetric)}>
                      <TabsList variant="pills" className="h-auto p-0.5">
                        <TabsTrigger variant="pills" value="revenue" className="px-3 py-1 text-xs">Revenue</TabsTrigger>
                        <TabsTrigger variant="pills" value="leads" className="px-3 py-1 text-xs">Leads</TabsTrigger>
                        <TabsTrigger variant="pills" value="wl" className="px-3 py-1 text-xs">W/L</TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </CardHead>
                  <div className="grid grid-cols-[150px_1fr]">
                    <div className="my-3.5 ml-4 flex flex-col justify-center gap-1 rounded-xl bg-foreground p-4 text-[var(--card)]">
                      <span className="text-[11px] opacity-70">Average monthly</span>
                      <span className="text-[22px] font-semibold leading-tight tracking-[-0.02em]">{p.title}</span>
                      <span className="text-[22px] font-semibold leading-tight tracking-[-0.02em]">{p.big}</span>
                      <span className="mt-2 text-xs opacity-85">Leads <b className="font-semibold">373</b> · 97/276</span>
                      <span className="text-xs opacity-85">Win/loss <b className="font-semibold">16%</b> · 51/318</span>
                    </div>
                    <div className="flex h-[210px] items-end gap-[18px] px-5 py-4">
                      {p.bars.map((b) => (
                        <div key={b.label} className="flex h-full flex-1 flex-col items-center gap-2">
                          {/* muted capacity track with the accent value filling up from the bottom */}
                          <div className="relative w-full max-w-[46px] flex-1">
                            <div className="absolute inset-0 rounded-[6px] border border-border bg-muted" />
                            <div
                              className="absolute inset-x-0 bottom-0 rounded-[6px] bg-primary transition-[height] duration-500 ease-out"
                              style={{ height: `${b.accent}%` }}
                            />
                            <span
                              className="absolute left-1/2 z-10 -translate-x-1/2 -translate-y-1.5 whitespace-nowrap rounded-md bg-foreground px-[7px] py-px font-mono text-[11px] font-semibold text-[var(--card)] transition-[bottom] duration-500 ease-out"
                              style={{ bottom: `${b.accent}%` }}
                            >
                              {b.tag}
                            </span>
                          </div>
                          <span className="font-mono text-[11px] text-muted-foreground">{b.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* ===== RIGHT column ===== */}
              <div className="flex flex-col gap-3.5">
                <div className="rounded-[14px] border border-border bg-card shadow-sm">
                  {/* table header */}
                  <div className="grid grid-cols-[1.5fr_1fr_0.7fr_0.7fr_1.2fr] items-center gap-2 px-4 pb-2 pt-3 text-[11px] font-medium text-muted-foreground">
                    <span>Sales</span><span>Revenue</span><span>Leads</span><span>KPI</span><span>W/L</span>
                  </div>

                  {/* Armin */}
                  <RepRow rep={REP_ARMIN} />

                  {/* Mikasa (expandable) */}
                  <div className="grid grid-cols-[1.5fr_1fr_0.7fr_0.7fr_1.2fr] items-center gap-2 border-t border-border px-4 py-3">
                    <span className="inline-flex items-center gap-[9px] text-[13px] font-medium text-foreground">
                      <Av g={REP_MIKASA.g} className="size-[26px]">{REP_MIKASA.initial}</Av>{REP_MIKASA.name}
                    </span>
                    <span className="font-mono text-[12.5px] text-foreground">{REP_MIKASA.revenue}</span>
                    <span className="flex items-center gap-1.5"><NumPill>{REP_MIKASA.leads}</NumPill> <span className="font-mono text-[12.5px] text-muted-foreground">{REP_MIKASA.total}</span></span>
                    <span className="font-mono text-[12.5px] text-foreground">{REP_MIKASA.kpi}</span>
                    <span className="inline-flex items-center gap-1.5 font-mono text-xs text-foreground">
                      {REP_MIKASA.wlPct} <NumPill soft>{REP_MIKASA.wlPill}</NumPill> {REP_MIKASA.wlNum}
                      <button
                        type="button"
                        aria-label={expanded ? 'Collapse Mikasa' : 'Expand Mikasa'}
                        onClick={() => setExpanded((v) => !v)}
                        className="ml-0.5 inline-flex size-[22px] items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-colors hover:border-[var(--border-strong)] hover:bg-muted hover:text-foreground"
                      >
                        {expanded ? <ChevronUp /> : <ChevronDown className="size-3" />}
                      </button>
                    </span>
                  </div>

                  {/* expansion panel */}
                  {expanded && (
                    <div className="mx-3 my-1 rounded-xl bg-muted px-3.5 py-3">
                      <div className="mb-3 flex flex-wrap items-center gap-2">
                        <span className="inline-flex h-[26px] items-center gap-1.5 rounded-full border border-border bg-card px-2.5 text-xs text-foreground">Top sales 🏆</span>
                        <span className="inline-flex h-[26px] items-center gap-1.5 rounded-full border border-border bg-card px-2.5 text-xs text-foreground">Sales streak 🔥</span>
                        <span className="inline-flex h-[26px] items-center gap-1.5 rounded-full border border-border bg-card px-2.5 text-xs text-foreground">Top review 👍</span>
                        <span className="ml-auto inline-flex h-[26px] items-center gap-1.5 rounded-full border px-2.5 text-xs text-foreground" style={{ background: PRIMARY_SOFT, borderColor: PRIMARY_SOFT_BORDER }}>
                          <span className="font-mono text-[11px] font-semibold text-[var(--up)]">▴3</span> $156,841
                        </span>
                      </div>
                      <div className="mb-2 text-[12.5px] font-semibold text-foreground">Work with platforms</div>
                      <div className="grid grid-cols-2 gap-2">
                        {PLATFORM_MINI.map((pm) => (
                          <div
                            key={pm.name}
                            className="flex flex-col gap-2 rounded-[10px] border px-3 py-2.5"
                            style={
                              pm.accent
                                ? { background: PRIMARY_SOFT, borderColor: PRIMARY_SOFT_BORDER }
                                : { background: 'var(--card)', borderColor: 'var(--border)' }
                            }
                          >
                            <div className="flex items-center gap-2 text-[12.5px] font-medium text-foreground">
                              <BrandTile bg={pm.bg} mark={pm.mark} className="size-[18px] rounded-[5px] text-[9px]" />
                              {pm.name}
                            </div>
                            <div className="flex items-center justify-between font-mono text-[11.5px] text-foreground">
                              <span>{pm.pct}</span>
                              <span className="text-[11px] text-muted-foreground">{pm.value}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* sales dynamic chart */}
                  <div className="px-4 pt-2 text-[12.5px] font-semibold text-foreground">Sales dynamic</div>
                  <div className="px-4 pb-4 pt-2">
                    <AreaChart data={DYN_PRIMARY} compare={DYN_COMPARE} labels={DYN_LABELS} height={120} id="sales-dynamic" showTooltip={false} />
                  </div>

                  {/* final rep row — Eren */}
                  <div className="border-t border-border">
                    <RepRow rep={REP_EREN} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// A non-expandable sales table row.
function RepRow({ rep }: { rep: Rep }) {
  return (
    <div className="grid grid-cols-[1.5fr_1fr_0.7fr_0.7fr_1.2fr] items-center gap-2 border-t border-border px-4 py-3 first:border-t-0">
      <span className="inline-flex items-center gap-[9px] text-[13px] font-medium text-foreground">
        <Av g={rep.g} className="size-[26px]">{rep.initial}</Av>{rep.name}
      </span>
      <span className="font-mono text-[12.5px] text-foreground">{rep.revenue}</span>
      <span className="flex items-center gap-1.5"><NumPill>{rep.leads}</NumPill> <span className="font-mono text-[12.5px] text-muted-foreground">{rep.total}</span></span>
      <span className="font-mono text-[12.5px] text-foreground">{rep.kpi}</span>
      <span className="inline-flex items-center gap-1.5 font-mono text-xs text-foreground">
        {rep.wlPct} <NumPill soft>{rep.wlPill}</NumPill> {rep.wlNum}
      </span>
    </div>
  )
}
