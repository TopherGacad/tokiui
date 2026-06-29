'use client'

import { AreaChart, BarChart, DonutChart, RadialChart, Sparkline } from '@tokiui/ui'

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const revenue = [28, 31, 29, 37, 35, 41, 39, 47, 45, 51, 48, 58]
const previous = [24, 26, 28, 30, 29, 33, 34, 36, 37, 40, 41, 45]

export function AreaChartDemo() {
  return (
    <div className="w-full max-w-2xl">
      <AreaChart data={revenue} compare={previous} labels={MONTHS} valueFormat={(v) => `$${v}k`} />
    </div>
  )
}

export function BarChartDemo() {
  return (
    <div className="w-full max-w-2xl">
      <BarChart
        data={[12, 19, 14, 23, 18, 27, 21]}
        labels={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']}
        height={200}
        color="var(--info)"
      />
    </div>
  )
}

const CHANNELS = [
  { label: 'Direct', value: 42, color: 'var(--primary)' },
  { label: 'Organic', value: 28, color: 'var(--info)' },
  { label: 'Referral', value: 18, color: 'var(--warning)' },
  { label: 'Social', value: 12, color: 'var(--success)' },
]

export function DonutChartDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-8">
      <DonutChart data={CHANNELS}>
        <span className="text-xl font-semibold text-foreground">$48k</span>
        <span className="text-xs text-muted-foreground">total</span>
      </DonutChart>
      <div className="space-y-2 text-sm">
        {CHANNELS.map((c) => (
          <div key={c.label} className="flex items-center gap-2">
            <span className="size-2.5 shrink-0 rounded-full" style={{ background: c.color }} />
            <span className="text-foreground">{c.label}</span>
            <span className="ml-auto w-10 text-right tabular-nums text-muted-foreground">{c.value}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function RadialChartDemo() {
  return (
    <RadialChart value={78} color="var(--primary)">
      <span className="text-2xl font-semibold tracking-tight text-foreground">78%</span>
      <span className="text-[11px] text-muted-foreground">reached</span>
    </RadialChart>
  )
}

export function SparklineDemo() {
  return (
    <div className="flex flex-wrap items-center gap-8">
      <div className="flex items-center gap-3">
        <span className="text-sm text-muted-foreground">Revenue</span>
        <Sparkline data={[20, 24, 22, 30, 28, 36, 40]} color="var(--success)" />
      </div>
      <div className="flex items-center gap-3">
        <span className="text-sm text-muted-foreground">Churn</span>
        <Sparkline data={[40, 38, 39, 34, 30, 28, 24]} color="var(--destructive)" />
      </div>
    </div>
  )
}
