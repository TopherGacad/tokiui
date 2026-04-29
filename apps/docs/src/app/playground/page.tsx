import { Suspense } from 'react'
import { PlaygroundContent } from './playground-content'

export default function PlaygroundPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-muted-foreground">Loading...</div>}>
      <PlaygroundContent />
    </Suspense>
  )
}
