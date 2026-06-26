import { readFileSync } from 'fs'
import { join } from 'path'
import { codeToHtml } from 'shiki'

export interface FrameFile {
  /** File name, e.g. "dashboard-frame.tsx" */
  label: string
  /** Directory shown in the file tree, e.g. "components/frames" */
  dir: string
  /** Raw source (for copy) */
  raw: string
  /** Shiki dual-theme highlighted HTML */
  html: string
}

/**
 * Reads frame source files at build time and highlights them with Shiki.
 * Paths are relative to the docs app root (process.cwd() during build/dev).
 * Static export → this runs at build time, baking the source into the page.
 */
export async function getFrameSource(relPaths: string[]): Promise<FrameFile[]> {
  return Promise.all(
    relPaths.map(async (rel) => {
      const raw = readFileSync(join(process.cwd(), rel), 'utf8')
      const html = await codeToHtml(raw, {
        lang: 'tsx',
        themes: { light: 'github-light', dark: 'github-dark' },
        defaultColor: false,
      })
      const segments = rel.replace(/^src\//, '').split('/')
      const label = segments.pop() ?? rel
      return { label, dir: segments.join('/'), raw, html }
    }),
  )
}
