import type { ThemeTokens } from './types'

interface EncodedTheme {
  light: ThemeTokens
  dark: ThemeTokens
}

export function decodeTheme(encoded: string): EncodedTheme | null {
  try {
    return JSON.parse(Buffer.from(encoded, 'base64').toString('utf-8')) as EncodedTheme
  } catch {
    return null
  }
}
