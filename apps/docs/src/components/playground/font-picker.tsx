'use client'

const fonts = [
  { label: 'System Default', value: 'ui-sans-serif, system-ui, sans-serif' },
  { label: 'Inter', value: '"Inter", sans-serif' },
  { label: 'Geist', value: '"Geist", sans-serif' },
  { label: 'Mono', value: 'ui-monospace, monospace' },
  { label: 'Serif', value: 'ui-serif, Georgia, serif' },
]

interface FontPickerProps {
  value: string
  onChange: (value: string) => void
}

export function FontPicker({ value, onChange }: FontPickerProps) {
  return (
    <div className="space-y-1">
      <p className="text-sm text-muted-foreground">Font Family</p>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
      >
        {fonts.map((f) => (
          <option key={f.value} value={f.value}>
            {f.label}
          </option>
        ))}
      </select>
    </div>
  )
}
