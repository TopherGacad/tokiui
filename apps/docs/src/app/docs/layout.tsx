import { Header } from '@/components/site/header'
import { Sidebar } from '@/components/docs/sidebar'
import { TocNav } from '@/components/docs/toc-nav'
import { DocsPager } from '@/components/docs/docs-pager'
import { MobileNav } from '@/components/docs/mobile-nav'

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="docs-layout">
      <Header mobileNav={<MobileNav />} />
      <div className="docs-body">
        <aside className="docs-sidebar">
          <div className="docs-sidebar__panel">
            <Sidebar />
          </div>
        </aside>
        <main className="docs-content" id="docs-main">
          <div className="docs-content__inner">
            <article className="docs-prose">{children}</article>
            <DocsPager />
          </div>
        </main>
        <TocNav />
      </div>
    </div>
  )
}
