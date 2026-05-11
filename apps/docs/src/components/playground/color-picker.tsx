'use client'

import { HexColorPicker } from 'react-colorful'
import { parse, converter } from 'culori'

const toRgb = converter('rgb')
const toOklch = converter('oklch')
import { useState, useRef, useEffect } from 'react'

interface ColorPickerProps {
  label: string
  value: string
  onChange: (oklch: string) => void
}

export function ColorPicker({ label, value, onChange }: ColorPickerProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const hex = oklchToHex(value)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  function handleHexChange(newHex: string) {
    const parsed = parse(newHex)
    if (!parsed) return
    const color = toOklch(parsed)
    if (!color) return
    const l = Math.round(color.l * 1000) / 1000
    const c = Math.round((color.c ?? 0) * 1000) / 1000
    const h = Math.round(color.h ?? 0)
    onChange(`oklch(${l} ${c} ${h})`)
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center gap-2 rounded-md border p-2 text-left text-sm hover:bg-accent"
      >
        <span
          className="h-5 w-5 flex-shrink-0 rounded border"
          style={{ backgroundColor: value }}
        />
        <span className="min-w-0 flex-1 truncate text-muted-foreground">{label}</span>
        <span className="font-mono text-xs text-muted-foreground">{hex}</span>
      </button>
      {open && (
        <div className="absolute left-0 top-full z-50 mt-1 rounded-lg border bg-popover p-3 shadow-lg">
          <HexColorPicker color={hex} onChange={handleHexChange} />
        </div>
      )}
    </div>
  )
}

function oklchToHex(oklchStr: string): string {
  const parsed = parse(oklchStr)
  if (!parsed) return '#000000'
  const rgbColor = toRgb(parsed)
  if (!rgbColor) return '#000000'
  const clamp = (n: number) => Math.max(0, Math.min(1, n))
  const r = Math.round(clamp(rgbColor.r ?? 0) * 255).toString(16).padStart(2, '0')
  const g = Math.round(clamp(rgbColor.g ?? 0) * 255).toString(16).padStart(2, '0')
  const b = Math.round(clamp(rgbColor.b ?? 0) * 255).toString(16).padStart(2, '0')
  return `#${r}${g}${b}`
}
