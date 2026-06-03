'use client'

import { useState, useId } from 'react'
import { useCopy } from '@/components/site/use-copy'
import { Icon } from '@/components/site/icons'

interface ShowcaseClientProps {
  title: string
  code?: string
  highlightedCode?: string
  overflow?: boolean
  children: React.ReactNode
}

function CodePanel({ code, highlightedCode, copied, onCopy, panelId, labelId }: {
  code: string
  highlightedCode?: string
  copied: boolean
  onCopy: () => void
  panelId: string
  labelId: string
}) {
  return (
    <div
      id={panelId}
      role="tabpanel"
      aria-labelledby={labelId}
      className="show__code"
    >
      <button
        className={`term__copy${copied ? ' ok' : ''}`}
        onClick={onCopy}
        aria-label={copied ? 'Copied' : 'Copy code'}
      >
        {copied ? <Icon.check /> : <Icon.copy />}
        {copied ? 'copied' : 'copy'}
      </button>
      {highlightedCode
        ? <div className="show__highlighted" dangerouslySetInnerHTML={{ __html: highlightedCode }} />
        : <pre>{code}</pre>
      }
    </div>
  )
}

export function ShowcaseClient({ title, code, highlightedCode, overflow, children }: ShowcaseClientProps) {
  const uid = useId()
  const [tab, setTab] = useState<'preview' | 'code' | 'split'>('preview')
  const [copied, copy] = useCopy(code ?? '')

  const tabId   = (t: string) => `${uid}-tab-${t}`
  const panelId = (t: string) => `${uid}-panel-${t}`

  return (
    <div className="show">
      <div className="show__bar">
        <span className="show__title">{title}</span>
        {code && (
          <div className="show__tabs" role="tablist" aria-label={`${title} preview tabs`}>
            {(['preview', 'code', 'split'] as const).map((t) => (
              <button
                key={t}
                id={tabId(t)}
                role="tab"
                aria-selected={tab === t}
                aria-controls={panelId(t)}
                className={`show__tab${tab === t ? ' is-active' : ''}`}
                onClick={() => setTab(t)}
              >
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>
        )}
      </div>

      {tab === 'preview' && (
        <div
          id={panelId('preview')}
          role="tabpanel"
          aria-labelledby={tabId('preview')}
          className={`show__body${overflow ? ' show__body--overflow' : ''}`}
        >
          {children}
        </div>
      )}

      {tab === 'code' && (
        <CodePanel
          code={code ?? ''}
          highlightedCode={highlightedCode}
          copied={copied}
          onCopy={copy}
          panelId={panelId('code')}
          labelId={tabId('code')}
        />
      )}

      {tab === 'split' && (
        <div className="show__split">
          <div
            id={panelId('split')}
            role="tabpanel"
            aria-labelledby={tabId('split')}
            className={`show__body${overflow ? ' show__body--overflow' : ''}`}
          >
            {children}
          </div>
          <CodePanel
            code={code ?? ''}
            highlightedCode={highlightedCode}
            copied={copied}
            onCopy={copy}
            panelId={`${panelId('split')}-code`}
            labelId={tabId('split')}
          />
        </div>
      )}
    </div>
  )
}
