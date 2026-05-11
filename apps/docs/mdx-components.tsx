import type { MDXComponents } from 'mdx/types'
import { Callout } from '@/components/docs/callout'
import { FrameworkCards } from '@/components/docs/framework-cards'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    Callout,
    FrameworkCards,
  }
}
