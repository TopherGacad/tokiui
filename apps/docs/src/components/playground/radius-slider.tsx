'use client'

interface RadiusSliderProps {
  value: string
  onChange: (value: string) => void
}

const steps = ['0rem', '0.125rem', '0.25rem', '0.375rem', '0.5rem', '0.75rem', '1rem', '1.5rem']

export function RadiusSlider({ value, onChange }: RadiusSliderProps) {
  const index = steps.indexOf(value)
  const current = index === -1 ? 4 : index

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">Border Radius</span>
        <span className="font-mono text-xs">{value}</span>
      </div>
      <input
        type="range"
        min={0}
        max={steps.length - 1}
        value={current}
        onChange={(e) => onChange(steps[parseInt(e.target.value)])}
        className="w-full accent-primary"
      />
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>None</span>
        <span>Full</span>
      </div>
    </div>
  )
}
