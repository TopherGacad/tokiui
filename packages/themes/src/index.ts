export { defaultTheme } from './default'
export { roseTheme } from './rose'
export { slateTheme } from './slate'
export { neonTheme } from './neon'
export { newspaperTheme } from './newspaper'
export type { Theme, ThemeTokens } from './types'

import { defaultTheme } from './default'
import { roseTheme } from './rose'
import { slateTheme } from './slate'
import { neonTheme } from './neon'
import { newspaperTheme } from './newspaper'
import type { Theme } from './types'

export const allThemes: Theme[] = [
  defaultTheme,
  roseTheme,
  slateTheme,
  neonTheme,
  newspaperTheme,
]
