import BlockPage from '@/registry/blocks/sidebar-shell/page'
import { FrameChrome } from '@/components/frames/frame-chrome'
import { getFrameSource } from '@/lib/get-frame-source'

export const metadata = { title: 'Sidebar' }

const BLOCK = 'src/registry/blocks/sidebar-shell'

export default async function SidebarBlockPage() {
  const files = await getFrameSource([
    `${BLOCK}/page.tsx`,
    `${BLOCK}/app-sidebar.tsx`,
    `${BLOCK}/nav-main.tsx`,
    `${BLOCK}/nav-secondary.tsx`,
    `${BLOCK}/nav-user.tsx`,
    `${BLOCK}/icons.tsx`,
  ])
  return (
    <>
      <BlockPage />
      <FrameChrome title="Sidebar" files={files} deps={['sidebar-01']} />
    </>
  )
}
