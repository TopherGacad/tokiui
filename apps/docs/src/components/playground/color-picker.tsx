'use client'

import { HexColorPicker } from 'react-colorful'
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
    onChange(hexToOklch(newHex))
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

const clamp = (x: number) => Math.max(0, Math.min(1, x))

const linearize = (x: number) =>
  x <= 0.04045 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4

const gamma = (x: number) =>
  x <= 0.0031308 ? 12.92 * x : 1.055 * x ** (1 / 2.4) - 0.055

function hexToOklch(hex: string): string {
  const r = linearize(parseInt(hex.slice(1, 3), 16) / 255)
  const g = linearize(parseInt(hex.slice(3, 5), 16) / 255)
  const b = linearize(parseInt(hex.slice(5, 7), 16) / 255)

  // Linear sRGB → LMS (Oklab M1)
  const L = (0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b) ** (1 / 3)
  const M = (0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b) ** (1 / 3)
  const S = (0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b) ** (1 / 3)

  // LMS → OKLab (M2)
  const labL = 0.2104542553 * L + 0.7936177850 * M - 0.0040720468 * S
  const labA = 1.9779984951 * L - 2.4285922050 * M + 0.4505937099 * S
  const labB = 0.0259040371 * L + 0.7827717662 * M - 0.8086757660 * S

  const c = Math.sqrt(labA ** 2 + labB ** 2)
  const h = ((Math.atan2(labB, labA) * 180) / Math.PI + 360) % 360

  return `oklch(${Math.round(labL * 1000) / 1000} ${Math.round(c * 1000) / 1000} ${Math.round(h)})`
}

function oklchToHex(oklchStr: string): string {
  const m = oklchStr.match(/oklch\(\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)\s*\)/)
  if (!m) return '#000000'

  const l = parseFloat(m[1])
  const c = parseFloat(m[2])
  const hRad = (parseFloat(m[3]) * Math.PI) / 180

  // OKLCH → OKLab
  const labA = c * Math.cos(hRad)
  const labB = c * Math.sin(hRad)

  // OKLab → LMS (M2 inverse)
  const L = (l + 0.3963377774 * labA + 0.2158037573 * labB) ** 3
  const M = (l - 0.1055613458 * labA - 0.0638541728 * labB) ** 3
  const S = (l - 0.0894841775 * labA - 1.2914855480 * labB) ** 3

  // LMS → Linear sRGB (M1 inverse)
  const r = +4.0767416621 * L - 3.3077115913 * M + 0.2309699292 * S
  const g = -1.2684380046 * L + 2.6097574011 * M - 0.3413193965 * S
  const b = -0.0041960863 * L - 0.7034186147 * M + 1.7076147010 * S

  const toHex = (x: number) =>
    Math.round(clamp(gamma(x)) * 255).toString(16).padStart(2, '0')

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`
}
