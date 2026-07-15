import FramePage from '@/registry/frames/sales-analytics/page'
import { FrameChrome } from '@/components/frames/frame-chrome'
import { getFrameSource } from '@/lib/get-frame-source'

export const metadata = { title: 'Sales Analytics' }

const FRAME = 'src/registry/frames/sales-analytics'

export default async function SalesFramePage() {
  const files = await getFrameSource([`${FRAME}/page.tsx`])
  return (
    <>
      <FramePage />
      <FrameChrome
        title="Sales Analytics"
        files={files}
        deps={['sales-analytics']}
        usage="Requires a tokiui project (run npx @tokiui/cli init first). Installing drops the frame into components/frames/sales-analytics/ and wires a ready route at /sales."
      />
    </>
  )
}
