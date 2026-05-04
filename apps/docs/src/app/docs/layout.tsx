import { Header } from '@/components/site/header'
import { Sidebar } from '@/components/docs/sidebar'
import { TocNav } from '@/components/docs/toc-nav'

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="docs-layout">
      <Header />
      <div className="docs-body">
        <aside className="docs-sidebar">
          <Sidebar />
        </aside>
        <main className="docs-content" id="docs-main">
          <article className="docs-prose">{children}</article>
        </main>
        <TocNav />
      </div>
    </div>
  )
}
