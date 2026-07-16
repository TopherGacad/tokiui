import FramePage from '@/registry/frames/settings/page'
import { FrameChrome } from '@/components/frames/frame-chrome'
import { getFrameSource } from '@/lib/get-frame-source'

export const metadata = { title: 'Settings' }

const FRAME = 'src/registry/frames/settings'

export default async function SettingsFramePage() {
  const files = await getFrameSource([`${FRAME}/page.tsx`])
  return (
    <>
      <FramePage />
      <FrameChrome
        title="Settings"
        files={files}
        deps={['settings']}
        usage="Requires a tokiui project (run npx @tokiui/cli init first). Installing drops the frame into components/frames/settings/ and wires a ready route at /settings."
      />
    </>
  )
}
