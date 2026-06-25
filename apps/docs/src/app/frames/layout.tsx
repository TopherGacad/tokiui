import type { Metadata } from 'next'
import { FrameBackButton } from '@/components/frames/frame-back-button'

export const metadata: Metadata = {
  title: { default: 'Frames', template: '%s — tokiui Frames' },
  description: 'Full, copy-paste page templates built entirely from tokiui components.',
}

// Minimal passthrough — frames render standalone/full-bleed (the gallery page
// supplies its own Header/Footer; individual frames are chrome-free previews).
export default function FramesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <FrameBackButton />
    </>
  )
}
