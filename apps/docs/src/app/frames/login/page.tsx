import { LoginFrame } from '@/components/frames/login-frame'
import { FrameChrome } from '@/components/frames/frame-chrome'
import { getFrameSource } from '@/lib/get-frame-source'

export const metadata = { title: 'Login' }

export default async function LoginPage() {
  const files = await getFrameSource(['src/components/frames/login-frame.tsx'])
  return (
    <>
      <LoginFrame />
      <FrameChrome title="Login & Auth" files={files} />
    </>
  )
}
