// Lightweight, dependency-free charts for the Frames demos. tokiui has no chart
// primitive yet, so these are hand-rolled SVG/CSS — but styled entirely with tokiui
// design tokens so they stay seamless with the component set. (A real Chart component
// is a flagged next gap.)

/* ---------- Sparkline ---------- */
export function Sparkline({
  data,
  color = 'var(--primary)',
  width = 96,
  height = 32,
}: {
  data: number[]
  color?: string
  width?: number
  height?: number
}) {
  const pad = 3
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1
  const pts = data.map((d, i) => {
    const x = (i / (data.length - 1)) * width
    const y = pad + (1 - (d - min) / range) * (height - pad * 2)
    return `${x.toFixed(2)},${y.toFixed(2)}`
  })
  const line = `M${pts.join(' L')}`
  const area = `${line} L${width},${height} L0,${height} Z`
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none" aria-hidden="true">
      <path d={area} fill={color} fillOpacity={0.12} />
      <path d={line} stroke={color} strokeWidth={1.75} strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  )
}

/* ---------- Area chart (responsive width, fixed height) ---------- */
export function AreaChart({
  data,
  compare,
  height = 220,
  color = 'var(--primary)',
  gradientId = 'tk-area',
}: {
  data: number[]
  compare?: number[]
  height?: number
  color?: string
  gradientId?: string
}) {
  const W = 100
  const pad = 10
  const all = compare ? [...data, ...compare] : data
  const max = Math.max(...all)
  const min = Math.min(...all)
  const range = max - min || 1
  const toPts = (d: number[]) =>
    d.map((v, i) => {
      const x = (i / (d.length - 1)) * W
      const y = pad + (1 - (v - min) / range) * (height - pad * 2)
      return `${x.toFixed(2)},${y.toFixed(2)}`
    })
  const mainPts = toPts(data)
  const line = `M${mainPts.join(' L')}`
  const area = `${line} L${W},${height} L0,${height} Z`
  const grid = [0.25, 0.5, 0.75]

  return (
    <svg
      width="100%"
      height={height}
      viewBox={`0 0 ${W} ${height}`}
      preserveAspectRatio="none"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity={0.26} />
          <stop offset="100%" stopColor={color} stopOpacity={0} />
        </linearGradient>
      </defs>
      {grid.map((g) => {
        const y = pad + g * (height - pad * 2)
        return (
          <line
            key={g}
            x1={0}
            x2={W}
            y1={y}
            y2={y}
            stroke="var(--border)"
            strokeWidth={1}
            strokeDasharray="3 4"
            vectorEffect="non-scaling-stroke"
            opacity={0.7}
          />
        )
      })}
      {compare && (
        <path
          d={`M${toPts(compare).join(' L')}`}
          stroke="var(--muted-foreground)"
          strokeWidth={1.5}
          strokeDasharray="4 4"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
          opacity={0.45}
        />
      )}
      <path d={area} fill={`url(#${gradientId})`} />
      <path d={line} stroke={color} strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
    </svg>
  )
}

/* ---------- Segmented donut ---------- */
export function DonutChart({
  segments,
  size = 152,
  thickness = 18,
}: {
  segments: { value: number; color: string }[]
  size?: number
  thickness?: number
}) {
  const r = (size - thickness) / 2
  const c = size / 2
  const circ = 2 * Math.PI * r
  const total = segments.reduce((s, x) => s + x.value, 0) || 1
  let offset = 0
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90" aria-hidden="true">
      <circle cx={c} cy={c} r={r} fill="none" stroke="var(--muted)" strokeWidth={thickness} />
      {segments.map((s, i) => {
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
  )
}

/* ---------- Radial progress ring ---------- */
export function RadialRing({
  value,
  size = 132,
  thickness = 12,
  color = 'var(--primary)',
  children,
}: {
  value: number
  size?: number
  thickness?: number
  color?: string
  children?: React.ReactNode
}) {
  const r = (size - thickness) / 2
  const c = size / 2
  const circ = 2 * Math.PI * r
  const len = (Math.min(100, Math.max(0, value)) / 100) * circ
  return (
    <div className="relative inline-flex items-center justify-center">
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
      <div className="absolute inset-0 flex flex-col items-center justify-center">{children}</div>
    </div>
  )
}
