'use client'

import { useState, useCallback } from 'react'

export function useCopy(text: string, ms = 1600): [boolean, () => void] {
  const [copied, setCopied] = useState(false)
  const copy = useCallback(() => {
    if (!navigator.clipboard) return
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), ms)
    })
  }, [text, ms])
  return [copied, copy]
}
