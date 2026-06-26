import { Header } from '@/components/site/header'
import { Footer } from '@/components/site/footer'
import { FramePreview } from '@/components/frames/frame-preview'

export const metadata = { title: 'Frames' }

const FRAMES = [
  { href: '/frames/dashboard', title: 'Dashboard', desc: 'App shell — sidebar, stat cards, activity, and a table.' },
  { href: '/frames/login', title: 'Login & Auth', desc: 'Centered sign-in with social providers.' },
  { href: '/frames/settings', title: 'Settings', desc: 'Tabbed account settings and forms.' },
]

export default function FramesGallery() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main id="main" className="flex-1">
        <div className="mx-auto max-w-[1100px] px-6 py-14">
          <h1 className="text-3xl font-medium tracking-tight text-foreground">Frames</h1>
          <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-muted-foreground">
            Full page templates built entirely from tokiui components. Preview them live, then copy one as a starting point for your own app.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {FRAMES.map((f) => (
              <FramePreview key={f.href} href={f.href} title={f.title} desc={f.desc} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
