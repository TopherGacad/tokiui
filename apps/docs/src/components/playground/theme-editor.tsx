'use client'

import { ColorPicker } from './color-picker'
import { RadiusSlider } from './radius-slider'
import { FontPicker } from './font-picker'
import { PresetGallery } from './preset-gallery'
import type { ThemeTokens } from '@/lib/theme/types'

const COLOR_TOKENS: Array<{ key: keyof ThemeTokens; label: string }> = [
  { key: 'background', label: 'Background' },
  { key: 'foreground', label: 'Foreground' },
  { key: 'primary', label: 'Primary' },
  { key: 'primaryForeground', label: 'Primary Foreground' },
  { key: 'secondary', label: 'Secondary' },
  { key: 'secondaryForeground', label: 'Secondary Foreground' },
  { key: 'muted', label: 'Muted' },
  { key: 'mutedForeground', label: 'Muted Foreground' },
  { key: 'accent', label: 'Accent' },
  { key: 'accentForeground', label: 'Accent Foreground' },
  { key: 'destructive', label: 'Destructive' },
  { key: 'destructiveForeground', label: 'Destructive Foreground' },
  { key: 'card', label: 'Card' },
  { key: 'border', label: 'Border' },
  { key: 'input', label: 'Input' },
  { key: 'ring', label: 'Ring' },
]

interface ThemeEditorProps {
  mode: 'light' | 'dark'
  lightTokens: ThemeTokens
  darkTokens: ThemeTokens
  fontFamily: string
  onLightChange: (key: keyof ThemeTokens, value: string) => void
  onDarkChange: (key: keyof ThemeTokens, value: string) => void
  onPresetSelect: (light: ThemeTokens, dark: ThemeTokens) => void
  onFontChange: (value: string) => void
}

export function ThemeEditor({
  mode,
  lightTokens,
  darkTokens,
  fontFamily,
  onLightChange,
  onDarkChange,
  onPresetSelect,
  onFontChange,
}: ThemeEditorProps) {
  const tokens = mode === 'light' ? lightTokens : darkTokens
  const onChange = mode === 'light' ? onLightChange : onDarkChange

  return (
    <div className="space-y-6">
      <PresetGallery onSelect={onPresetSelect} />

      <FontPicker value={fontFamily} onChange={onFontChange} />

      <RadiusSlider
        value={lightTokens.radius}
        onChange={(v) => {
          onLightChange('radius', v)
          onDarkChange('radius', v)
        }}
      />

      <div className="space-y-1">
        <p className="text-sm text-muted-foreground">Colors ({mode})</p>
        <div className="space-y-1">
          {COLOR_TOKENS.map(({ key, label }) => (
            <ColorPicker
              key={key}
              label={label}
              value={tokens[key]}
              onChange={(v) => onChange(key, v)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
