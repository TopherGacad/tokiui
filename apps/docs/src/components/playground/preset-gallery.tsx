'use client'

import { allThemes } from '@tokiui/themes'
import type { ThemeTokens } from '@/lib/theme/types'

interface PresetGalleryProps {
  onSelect: (light: ThemeTokens, dark: ThemeTokens) => void
}

export function PresetGallery({ onSelect }: PresetGalleryProps) {
  return (
    <div className="space-y-1">
      <p className="text-sm text-muted-foreground">Presets</p>
      <div className="flex flex-wrap gap-2">
        {allThemes.map((theme) => (
          <button
            key={theme.name}
            type="button"
            onClick={() => onSelect(theme.light as ThemeTokens, theme.dark as ThemeTokens)}
            className="flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-xs font-medium transition-colors hover:bg-accent"
          >
            <span
              className="h-3 w-3 rounded-full border"
              style={{ backgroundColor: `hsl(${theme.light.primary})` }}
            />
            {theme.label}
          </button>
        ))}
      </div>
    </div>
  )
}
