'use client'

import { HexColorPicker } from 'react-colorful'
import { formatHsl, parse } from 'culori'
import { useState, useRef, useEffect } from 'react'

interface ColorPickerProps {
  label: string
  value: string
  onChange: (hsl: string) => void
}

export function ColorPicker({ label, value, onChange }: ColorPickerProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const hex = hslToHex(value)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  function handleHexChange(hex: string) {
    const parsed = parse(hex)
    if (!parsed) return
    const hslStr = formatHsl(parsed)
    // Convert "hsl(262, 83%, 58%)" → "262 83% 58%"
    const match = hslStr.match(/hsl\((\d+(?:\.\d+)?),\s*(\d+(?:\.\d+)?)%,\s*(\d+(?:\.\d+)?)%\)/)
    if (match) {
      onChange(`${match[1]} ${match[2]}% ${match[3]}%`)
    }
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
          style={{ backgroundColor: `hsl(${value})` }}
        />
        <span className="min-w-0 flex-1 truncate text-muted-foreground">{label}</span>
        <span className="font-mono text-xs text-muted-foreground">{value}</span>
      </button>
      {open && (
        <div className="absolute left-0 top-full z-50 mt-1 rounded-lg border bg-popover p-3 shadow-lg">
          <HexColorPicker color={hex} onChange={handleHexChange} />
        </div>
      )}
    </div>
  )
}

function hslToHex(hsl: string): string {
  const parts = hsl.split(' ')
  if (parts.length < 3) return '#000000'
  const h = parseFloat(parts[0])
  const s = parseFloat(parts[1])
  const l = parseFloat(parts[2])
  const parsed = parse(`hsl(${h}, ${s}%, ${l}%)`)
  if (!parsed) return '#000000'
  const r = Math.round((parsed.r ?? 0) * 255)
    .toString(16)
    .padStart(2, '0')
  const g = Math.round((parsed.g ?? 0) * 255)
    .toString(16)
    .padStart(2, '0')
  const b = Math.round((parsed.b ?? 0) * 255)
    .toString(16)
    .padStart(2, '0')
  return `#${r}${g}${b}`
}
