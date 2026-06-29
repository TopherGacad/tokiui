import { DashboardFrame } from '@/components/frames/dashboard-frame'
import { FrameChrome } from '@/components/frames/frame-chrome'
import { getFrameSource } from '@/lib/get-frame-source'

export const metadata = { title: 'Dashboard' }

export default async function DashboardPage() {
  const files = await getFrameSource([
    'src/components/frames/dashboard-frame.tsx',
  ])
  return (
    <>
      <DashboardFrame />
      <FrameChrome
        title="Dashboard"
        files={files}
        deps={['card', 'badge', 'button', 'avatar', 'input', 'progress', 'tabs', 'select', 'pagination', 'sidebar', 'chart']}
      />
    </>
  )
}
