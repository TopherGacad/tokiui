'use client'

import { useState } from 'react'
import { Button } from '@tokiui/ui'

export function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)

  async function copy() {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Button variant="ghost" size="sm" onClick={copy}>
      {copied ? 'Copied!' : 'Copy'}
    </Button>
  )
}
