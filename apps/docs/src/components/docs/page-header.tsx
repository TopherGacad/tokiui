interface PageHeaderProps {
  title: string
  description: string
  section?: string
  version?: string
  sourceHref?: string
}

function ExternalIcon() {
  return (
    <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M7 17 17 7M9 7h8v8" />
    </svg>
  )
}

export function PageHeader({ title, description, section = 'Components', version, sourceHref }: PageHeaderProps) {
  return (
    <>
      <nav className="crumb" aria-label="Breadcrumb">
        <span>{section}</span>
        <span className="crumb__sep">/</span>
        <span className="crumb__cur">{title}</span>
      </nav>
      <h1 className="page-title" id="overview">{title}</h1>
      <p className="page-desc">{description}</p>
      <div className="meta-row">
        {version && <span className="meta-pill">{version}</span>}
        {sourceHref && (
          <a href={sourceHref} className="meta-pill" target="_blank" rel="noopener noreferrer">
            Source <ExternalIcon />
          </a>
        )}
        <span className="meta-pill meta-pill--ok">
          <span className="meta-dot" />
          WCAG AA
        </span>
      </div>
    </>
  )
}
