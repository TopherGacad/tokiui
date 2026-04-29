import { Header } from '@/components/site/header'
import { Footer } from '@/components/site/footer'
import { Sidebar } from '@/components/docs/sidebar'

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="container mx-auto flex flex-1 gap-8 px-4 py-8">
        <aside className="hidden w-56 shrink-0 lg:block">
          <Sidebar />
        </aside>
        <main className="min-w-0 flex-1">
          <article className="prose prose-neutral dark:prose-invert max-w-none">{children}</article>
        </main>
      </div>
      <Footer />
    </div>
  )
}
