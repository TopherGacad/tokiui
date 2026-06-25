import { SettingsFrame } from '@/components/frames/settings-frame'
import { FrameChrome } from '@/components/frames/frame-chrome'
import { getFrameSource } from '@/lib/get-frame-source'

export const metadata = { title: 'Settings' }

export default async function SettingsPage() {
  const files = await getFrameSource(['src/components/frames/settings-frame.tsx'])
  return (
    <>
      <SettingsFrame />
      <FrameChrome
        title="Settings"
        files={files}
        deps={['card', 'tabs', 'input', 'textarea', 'button', 'switch', 'select', 'avatar', 'separator']}
      />
    </>
  )
}
