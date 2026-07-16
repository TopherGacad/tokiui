import FramePage from '@/registry/frames/sidebar-shell/page'
import { FrameChrome } from '@/components/frames/frame-chrome'
import { getFrameSource } from '@/lib/get-frame-source'

export const metadata = { title: 'Sidebar' }

const FRAME = 'src/registry/frames/sidebar-shell'

export default async function SidebarFramePage() {
  const files = await getFrameSource([
    `${FRAME}/page.tsx`,
    `${FRAME}/app-sidebar.tsx`,
    `${FRAME}/nav-main.tsx`,
    `${FRAME}/nav-secondary.tsx`,
    `${FRAME}/nav-user.tsx`,
    `${FRAME}/icons.tsx`,
  ])
  return (
    <>
      <FramePage />
      <FrameChrome
        title="Sidebar"
        files={files}
        deps={['sidebar-shell']}
        usage="Requires a tokiui project (run npx @tokiui/cli init first). Installing drops the frame into components/frames/sidebar-shell/ and wires a ready route at /sidebar — open it and the sidebar is there, no importing needed."
      />
    </>
  )
}
