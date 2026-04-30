'use client'

import { useState } from 'react'
import type { CSSProperties } from 'react'
import { Button } from '@tokiui/ui'
import { Icon } from './icons'

const PRESETS = {
  default: { bg: 'oklch(0.99 0.003 95)', fg: 'oklch(0.18 0.005 95)', muted: 'oklch(0.96 0.005 95)', border: 'oklch(0.92 0.005 95)', primary: 'oklch(0.74 0.17 118)', primaryFg: 'oklch(0.14 0.005 95)', radius: '8px' },
  orbit:   { bg: 'oklch(0.20 0.04 280)', fg: 'oklch(0.97 0.01 280)', muted: 'oklch(0.26 0.04 280)', border: 'oklch(0.30 0.04 280)', primary: 'oklch(0.78 0.16 28)',  primaryFg: 'oklch(0.16 0.04 280)', radius: '14px' },
  sunset:  { bg: 'oklch(0.97 0.02 50)',  fg: 'oklch(0.22 0.04 30)',  muted: 'oklch(0.93 0.03 50)',  border: 'oklch(0.88 0.03 50)',  primary: 'oklch(0.66 0.22 25)',  primaryFg: 'oklch(0.99 0.005 50)', radius: '4px' },
  mono:    { bg: 'oklch(0.98 0 0)',       fg: 'oklch(0.15 0 0)',       muted: 'oklch(0.94 0 0)',       border: 'oklch(0.88 0 0)',       primary: 'oklch(0.20 0 0)',       primaryFg: 'oklch(0.99 0 0)',       radius: '2px' },
} as const

type PresetKey = keyof typeof PRESETS

function ThemePreview({ preset, name }: { preset: PresetKey; name: string }) {
  const p = PRESETS[preset]
  const style = {
    '--t-bg': p.bg,
    '--t-fg': p.fg,
    '--t-muted': p.muted,
    '--t-border': p.border,
    '--t-primary': p.primary,
    '--t-primary-fg': p.primaryFg,
    '--t-radius': p.radius,
  } as CSSProperties

  return (
    <div className="theme-card" style={style}>
      <div className="theme-card__label">
        <span className="mono">theme/{name}.ts</span>
        <span className="theme-card__swatches">
          <span className="theme-card__swatch" style={{ background: p.bg }} />
          <span className="theme-card__swatch" style={{ background: p.muted }} />
          <span className="theme-card__swatch" style={{ background: p.primary }} />
        </span>
      </div>
      <div className="theme-card__demo">
        <div className="theme-card__demo-row" style={{ justifyContent: 'space-between' }}>
          <span className="theme-card__demo-title">Activate workspace</span>
          <span className="badge-demo">v0.1</span>
        </div>
        <div className="theme-card__demo-desc">
          Same component code. Different token values. Both pass contrast.
        </div>
        <div className="theme-card__input">
          <span className="mono" style={{ fontSize: 11, opacity: 0.6 }}>name</span>
          <span>Acquisitions Q3</span>
        </div>
        <div className="theme-card__demo-row">
          <button className="btn-demo">Activate</button>
          <button className="btn-demo btn-demo--ghost">Cancel</button>
        </div>
      </div>
    </div>
  )
}

function PickerGroup({
  label,
  value,
  onChange,
  options,
}: {
  label: string
  value: PresetKey
  onChange: (v: PresetKey) => void
  options: PresetKey[]
}) {
  return (
    <div className="theme-picker__group">
      <span className="theme-picker__label mono">{label}</span>
      <div className="theme-picker__opts">
        {options.map((o) => (
          <button
            key={o}
            type="button"
            className={`theme-picker__btn${value === o ? ' active' : ''}`}
            onClick={() => onChange(o)}
          >
            <span className="theme-picker__dot" style={{ background: PRESETS[o].primary }} />
            {o}
          </button>
        ))}
      </div>
    </div>
  )
}

export function ThemeTeaser() {
  const [left, setLeft] = useState<PresetKey>('default')
  const [right, setRight] = useState<PresetKey>('orbit')
  const presets = Object.keys(PRESETS) as PresetKey[]

  return (
    <section className="section" id="theme" data-screen-label="Theme">
      <div className="container">
        <div className="section-head" style={{ textAlign: 'center' }}>
          <h2 className="section-title" style={{ margin: '0 auto 12px' }}>
            Same component. Your tokens.
          </h2>
          <p className="section-sub" style={{ margin: '0 auto' }}>
            Pick any two presets — every primitive retints in real time.
          </p>
        </div>

        <div className="theme-picker">
          <PickerGroup label="Left" value={left} onChange={setLeft} options={presets} />
          <PickerGroup label="Right" value={right} onChange={setRight} options={presets} />
        </div>

        <div className="theme-teaser">
          <ThemePreview preset={left} name={left} />
          <ThemePreview preset={right} name={right} />
        </div>

        <div className="theme-cta">
          <Button variant="outline">
            Open the full playground <Icon.arrow />
          </Button>
        </div>
      </div>
    </section>
  )
}
