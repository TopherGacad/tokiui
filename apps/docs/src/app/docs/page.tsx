'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

// /docs has no content of its own — send visitors to the Introduction.
export default function DocsIndex() {
  const router = useRouter()
  useEffect(() => {
    router.replace('/docs/introduction')
  }, [router])
  return null
}
