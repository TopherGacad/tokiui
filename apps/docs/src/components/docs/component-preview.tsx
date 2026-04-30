import { CopyButton } from './copy-button'

interface ComponentPreviewProps {
  children: React.ReactNode
  code?: string
  label?: string
}

export function ComponentPreview({ children, code, label }: ComponentPreviewProps) {
  return (
    <div className="doc-preview">
      <div className="doc-preview__bar">
        <span className="doc-preview__label mono">{label ?? 'Preview'}</span>
        {code && (
          <div className="doc-preview__actions">
            <CopyButton text={code} />
          </div>
        )}
      </div>
      <div className="doc-preview__stage">{children}</div>
      {code && <pre className="doc-preview__code">{code}</pre>}
    </div>
  )
}
