'use client'

import { useState } from 'react'
import { useCopy } from '@/components/site/use-copy'
import { Icon } from '@/components/site/icons'

interface ShowcaseProps {
  title: string
  code?: string
  children: React.ReactNode
}

export function Showcase({ title, code, children }: ShowcaseProps) {
  const [tab, setTab] = useState<'preview' | 'code'>('preview')
  const [copied, copy] = useCopy(code ?? '')

  return (
    <div className="show">
      <div className="show__bar">
        <span className="show__title">{title}</span>
        {code && (
          <div className="show__tabs" role="tablist">
            <button
              role="tab"
              aria-selected={tab === 'preview'}
              className={`show__tab${tab === 'preview' ? ' is-active' : ''}`}
              onClick={() => setTab('preview')}
            >
              Preview
            </button>
            <button
              role="tab"
              aria-selected={tab === 'code'}
              className={`show__tab${tab === 'code' ? ' is-active' : ''}`}
              onClick={() => setTab('code')}
            >
              Code
            </button>
          </div>
        )}
      </div>
      {tab === 'preview' ? (
        <div className="show__body">{children}</div>
      ) : (
        <div className="show__code">
          <button
            className={`term__copy${copied ? ' ok' : ''}`}
            onClick={copy}
            aria-label={copied ? 'Copied' : 'Copy code'}
          >
            {copied ? <Icon.check /> : <Icon.copy />}
            {copied ? 'copied' : 'copy'}
          </button>
          {code}
        </div>
      )}
    </div>
  )
}
