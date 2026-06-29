'use client'

import * as React from 'react'
import { useId, useState } from 'react'
import { cn } from '../lib/utils'

// Lightweight, dependency-free charts built on plain SVG + the tokiui design tokens, so
// they retint with the theme for free. Data-driven and (for Area/Bar) interactive on
// hover. Intentionally presentational — for heavy analytics (zoom, brushing, huge data)
// reach for a dedicated charting library.

/* ============================== Sparkline ============================== */
export interface SparklineProps {
  data: number[]
  color?: string
  width?: number
  height?: number
  className?: string
}

export function Sparkline({ data, color = 'var(--primary)', width = 96, height = 32, className }: SparklineProps) {
  const pad = 3
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1
  const pts = data.map((d, i) => {
    const x = (i / (data.length - 1 || 1)) * width
    const y = pad + (1 - (d - min) / range) * (height - pad * 2)
    return `${x.toFixed(2)},${y.toFixed(2)}`
  })
  const line = `M${pts.join(' L')}`
  const area = `${line} L${width},${height} L0,${height} Z`
  return (
    <svg className={className} width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none" aria-hidden="true">
      <path d={area} fill={color} fillOpacity={0.12} />
      <path d={line} stroke={color} strokeWidth={1.75} strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  )
}

/* ============================== AreaChart ============================== */
export interface AreaChartProps {
  /** Series values (y). */
  data: number[]
  /** Optional second, dashed comparison series. */
  compare?: number[]
  /** Optional x-axis labels; also used in the hover tooltip. */
  labels?: string[]
  color?: string
  /** Plot height in px (x-axis labels render below it). */
  height?: number
  /** Hover crosshair + value tooltip. Default true. */
  showTooltip?: boolean
  /** Format the tooltip value, e.g. `(v) => \`$${v}k\``. */
  valueFormat?: (v: number) => string
  className?: string
  /** Gradient id override (auto-generated otherwise). */
  id?: string
}

export function AreaChart({
  data,
  compare,
  labels,
  color = 'var(--primary)',
  height = 220,
  showTooltip = true,
  valueFormat,
  className,
  id,
}: AreaChartProps) {
  const gradId = `${id ?? 'tk-area'}-${useId().replace(/:/g, '')}`
  const [hover, setHover] = useState<number | null>(null)
  const W = 100
  const pad = 10
  const n = data.length
  const all = compare ? [...data, ...compare] : data
  const max = Math.max(...all)
  const min = Math.min(...all)
  const range = max - min || 1
  const toPts = (d: number[]) =>
    d.map((v, i) => {
      const x = (i / (d.length - 1 || 1)) * W
      const y = pad + (1 - (v - min) / range) * (height - pad * 2)
      return `${x.toFixed(2)},${y.toFixed(2)}`
    })
  const line = `M${toPts(data).join(' L')}`
  const area = `${line} L${W},${height} L0,${height} Z`
  const grid = [0.25, 0.5, 0.75]
  const hx = (i: number) => (n > 1 ? (i / (n - 1)) * 100 : 0)
  const hy = (v: number) => ((pad + (1 - (v - min) / range) * (height - pad * 2)) / height) * 100

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!showTooltip || n === 0) return
    const rect = e.currentTarget.getBoundingClientRect()
    const frac = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width))
    setHover(Math.round(frac * (n - 1)))
  }

  return (
    <div className={cn('w-full', className)}>
      <div className="relative" style={{ height }} onMouseMove={onMove} onMouseLeave={() => setHover(null)}>
        <svg width="100%" height={height} viewBox={`0 0 ${W} ${height}`} preserveAspectRatio="none" fill="none" aria-hidden="true">
          <defs>
            <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.26} />
              <stop offset="100%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          {grid.map((g) => {
            const y = pad + g * (height - pad * 2)
            return <line key={g} x1={0} x2={W} y1={y} y2={y} stroke="var(--border)" strokeWidth={1} strokeDasharray="3 4" vectorEffect="non-scaling-stroke" opacity={0.7} />
          })}
          {compare && <path d={`M${toPts(compare).join(' L')}`} stroke="var(--muted-foreground)" strokeWidth={1.5} strokeDasharray="4 4" strokeLinejoin="round" vectorEffect="non-scaling-stroke" opacity={0.45} />}
          <path d={area} fill={`url(#${gradId})`} />
          <path d={line} stroke={color} strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
        </svg>

        {showTooltip && hover !== null && (
          <>
            <div className="pointer-events-none absolute inset-y-0 w-px bg-foreground/15" style={{ left: `${hx(hover)}%` }} />
            <div
              className="pointer-events-none absolute size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full ring-2 ring-[var(--card)]"
              style={{ left: `${hx(hover)}%`, top: `${hy(data[hover])}%`, background: color }}
            />
            <div
              className="pointer-events-none absolute top-1 z-10 whitespace-nowrap rounded-md border border-border bg-card px-2 py-1 text-xs shadow-md"
              style={{ left: `${hx(hover)}%`, transform: `translateX(${hover === 0 ? '0' : hover === n - 1 ? '-100%' : '-50%'})` }}
            >
              {labels?.[hover] && <span className="text-muted-foreground">{labels[hover]} · </span>}
              <span className="font-medium tabular-nums text-foreground">{valueFormat ? valueFormat(data[hover]) : data[hover]}</span>
            </div>
          </>
        )}
      </div>
      {labels && (
        <div className="mt-2 flex justify-between text-[10px] text-muted-foreground">
          {labels.map((l, i) => <span key={i}>{l}</span>)}
        </div>
      )}
    </div>
  )
}

/* =============================== BarChart =============================== */
export interface BarChartProps {
  data: number[]
  labels?: string[]
  color?: string
  height?: number
  showTooltip?: boolean
  valueFormat?: (v: number) => string
  className?: string
}

export function BarChart({ data, labels, color = 'var(--primary)', height = 220, showTooltip = true, valueFormat, className }: BarChartProps) {
  const [hover, setHover] = useState<number | null>(null)
  const max = Math.max(...data, 0) || 1
  return (
    <div className={cn('w-full', className)}>
      <div className="flex items-end gap-1.5" style={{ height }}>
        {data.map((v, i) => (
          <div
            key={i}
            className="relative h-full flex-1"
            onMouseEnter={() => showTooltip && setHover(i)}
            onMouseLeave={() => showTooltip && setHover(null)}
          >
            <div
              className="absolute bottom-0 w-full rounded-t-[3px] transition-opacity"
              style={{ height: `${(v / max) * 100}%`, background: color, opacity: hover === null || hover === i ? 1 : 0.4 }}
            />
            {showTooltip && hover === i && (
              <div className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-1 -translate-x-1/2 whitespace-nowrap rounded-md border border-border bg-card px-2 py-1 text-xs shadow-md">
                {labels?.[i] && <span className="text-muted-foreground">{labels[i]} · </span>}
                <span className="font-medium tabular-nums text-foreground">{valueFormat ? valueFormat(v) : v}</span>
              </div>
            )}
          </div>
        ))}
      </div>
      {labels && (
        <div className="mt-2 flex gap-1.5 text-[10px] text-muted-foreground">
          {labels.map((l, i) => <span key={i} className="flex-1 text-center">{l}</span>)}
        </div>
      )}
    </div>
  )
}

/* ============================== DonutChart ============================== */
export interface DonutSegment {
  label?: string
  value: number
  color: string
}
export interface DonutChartProps {
  data: DonutSegment[]
  size?: number
  thickness?: number
  className?: string
  /** Rendered centered inside the ring. */
  children?: React.ReactNode
}

export function DonutChart({ data, size = 152, thickness = 18, className, children }: DonutChartProps) {
  const r = (size - thickness) / 2
  const c = size / 2
  const circ = 2 * Math.PI * r
  const total = data.reduce((s, x) => s + x.value, 0) || 1
  let offset = 0
  return (
    <div className={cn('relative inline-flex items-center justify-center', className)}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90" aria-hidden="true">
        <circle cx={c} cy={c} r={r} fill="none" stroke="var(--muted)" strokeWidth={thickness} />
        {data.map((s, i) => {
          const len = (s.value / total) * circ
          const gap = 1.5
          const seg = (
            <circle
              key={i}
              cx={c}
              cy={c}
              r={r}
              fill="none"
              stroke={s.color}
              strokeWidth={thickness}
              strokeDasharray={`${Math.max(0, len - gap)} ${circ - Math.max(0, len - gap)}`}
              strokeDashoffset={-offset}
            />
          )
          offset += len
          return seg
        })}
      </svg>
      {children && <div className="absolute inset-0 flex flex-col items-center justify-center">{children}</div>}
    </div>
  )
}

/* ============================= RadialChart ============================= */
export interface RadialChartProps {
  /** 0–100. */
  value: number
  size?: number
  thickness?: number
  color?: string
  className?: string
  children?: React.ReactNode
}

export function RadialChart({ value, size = 132, thickness = 12, color = 'var(--primary)', className, children }: RadialChartProps) {
  const r = (size - thickness) / 2
  const c = size / 2
  const circ = 2 * Math.PI * r
  const len = (Math.min(100, Math.max(0, value)) / 100) * circ
  return (
    <div className={cn('relative inline-flex items-center justify-center', className)}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90" aria-hidden="true">
        <circle cx={c} cy={c} r={r} fill="none" stroke="var(--muted)" strokeWidth={thickness} />
        <circle
          cx={c}
          cy={c}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={thickness}
          strokeLinecap="round"
          strokeDasharray={`${len} ${circ - len}`}
          className="transition-[stroke-dasharray] duration-700 ease-out"
        />
      </svg>
      {children && <div className="absolute inset-0 flex flex-col items-center justify-center">{children}</div>}
    </div>
  )
}
