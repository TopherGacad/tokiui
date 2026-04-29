declare module 'culori' {
  interface Color {
    mode: string
    r?: number
    g?: number
    b?: number
    h?: number
    s?: number
    l?: number
    alpha?: number
  }

  export function parse(color: string): Color | undefined
  export function formatHsl(color: Color): string
  export function formatHex(color: Color): string
  export function converter(mode: string): (color: string | Color) => Color
}
