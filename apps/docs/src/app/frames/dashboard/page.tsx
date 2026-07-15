import FramePage from '@/registry/frames/dashboard/page'
import { FrameChrome } from '@/components/frames/frame-chrome'
import { getFrameSource } from '@/lib/get-frame-source'

export const metadata = { title: 'Dashboard' }

const FRAME = 'src/registry/frames/dashboard'

export default async function DashboardFramePage() {
  const files = await getFrameSource([`${FRAME}/page.tsx`])
  return (
    <>
      <FramePage />
      <FrameChrome
        title="Dashboard"
        files={files}
        deps={['dashboard']}
        usage="Requires a tokiui project (run npx @tokiui/cli init first). Installing drops the frame into components/frames/dashboard/ and wires a ready route at /dashboard."
      />
    </>
  )
}
