import FramePage from '@/registry/frames/login/page'
import { FrameChrome } from '@/components/frames/frame-chrome'
import { getFrameSource } from '@/lib/get-frame-source'

export const metadata = { title: 'Login' }

const FRAME = 'src/registry/frames/login'

export default async function LoginFramePage() {
  const files = await getFrameSource([`${FRAME}/page.tsx`])
  return (
    <>
      <FramePage />
      <FrameChrome
        title="Login & Auth"
        files={files}
        deps={['login']}
        usage="Requires a tokiui project (run npx @tokiui/cli init first). Installing drops the frame into components/frames/login/ and wires a ready route at /login."
      />
    </>
  )
}
