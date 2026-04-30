'use client'

import { useCopy } from '@/components/site/use-copy'
import { Icon } from '@/components/site/icons'

export function CopyButton({ text, className }: { text: string; className?: string }) {
  const [copied, copy] = useCopy(text, 2000)

  return (
    <button
      type="button"
      className={`${className ?? 'doc-preview__copy'}${copied ? ' copied' : ''}`}
      aria-label={copied ? 'Copied' : 'Copy code'}
      onClick={copy}
    >
      {copied ? <Icon.check /> : <Icon.copy />}
      {copied ? 'Copied' : 'Copy'}
    </button>
  )
}
