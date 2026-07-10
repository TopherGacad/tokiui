import { SalesFrame } from '@/components/frames/sales-frame'
import { FrameChrome } from '@/components/frames/frame-chrome'
import { getFrameSource } from '@/lib/get-frame-source'

export const metadata = { title: 'Sales Analytics' }

export default async function SalesAnalyticsPage() {
  const files = await getFrameSource([
    'src/components/frames/sales-frame.tsx',
  ])
  return (
    <>
      <SalesFrame />
      <FrameChrome
        title="Sales Analytics"
        files={files}
        deps={['badge', 'switch', 'kbd', 'tabs', 'chart']}
      />
    </>
  )
}
