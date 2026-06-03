import { codeToHtml } from 'shiki'
import { ShowcaseClient } from './showcase-client'

interface ShowcaseProps {
  title: string
  code?: string
  overflow?: boolean
  children: React.ReactNode
}

export async function Showcase({ title, code, overflow, children }: ShowcaseProps) {
  let highlightedCode: string | undefined

  if (code) {
    highlightedCode = await codeToHtml(code, {
      lang: 'tsx',
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
      defaultColor: false,
    })
  }

  return (
    <ShowcaseClient title={title} code={code} highlightedCode={highlightedCode} overflow={overflow}>
      {children}
    </ShowcaseClient>
  )
}
