import type { ThemeTokens } from './types'

export function encodeTheme(light: ThemeTokens, dark: ThemeTokens): string {
  return Buffer.from(JSON.stringify({ light, dark })).toString('base64')
}

export function tokensToCssVars(
  tokens: Partial<ThemeTokens>
): Record<string, string> {
  return Object.fromEntries(
    Object.entries(tokens).map(([key, value]) => [
      `--${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`,
      value,
    ])
  )
}
