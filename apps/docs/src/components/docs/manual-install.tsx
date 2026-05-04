'use client'

import { useState } from 'react'

function ChevronIcon() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m9 6 6 6-6 6" />
    </svg>
  )
}

function DownloadIcon() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3v12m0 0 4-4m-4 4-4-4M5 21h14" />
    </svg>
  )
}

interface ManualInstallProps {
  component: string
  componentPath?: string
}

export function ManualInstall({ component, componentPath }: ManualInstallProps) {
  const [open, setOpen] = useState(false)
  const path = componentPath ?? `components/ui/${component}.tsx`
  const importPath = `@/components/ui/${component}`
  const name = component.charAt(0).toUpperCase() + component.slice(1)

  return (
    <div className={`manual${open ? ' is-open' : ''}`}>
      <button
        type="button"
        className="manual__head"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="manual__head-l">
          <span className="manual__icon"><DownloadIcon /></span>
          <span>Manual installation</span>
          <span className="pill">3 steps</span>
        </span>
        <span className="manual__chev"><ChevronIcon /></span>
      </button>
      {open && (
        <div className="manual__body">
          <div className="step">
            <span className="step__num">1</span>
            <div>
              <p className="step__title">Install peer dependencies</p>
              <p className="step__desc">Ensure React 18+ is installed and tokiui styles are loaded in your project.</p>
              <pre><code>{`npm install @tokiui/ui`}</code></pre>
            </div>
          </div>
          <div className="step">
            <span className="step__num">2</span>
            <div>
              <p className="step__title">Copy the source file</p>
              <p className="step__desc">Drop this file into your codebase. It is unminified — own it, edit it, ship it.</p>
              <span className="step__file">{path}</span>
              <pre><code>{`# Copy from node_modules/@tokiui/ui/src/components/${component}.tsx\n# into your project at ${path}`}</code></pre>
            </div>
          </div>
          <div className="step">
            <span className="step__num">3</span>
            <div>
              <p className="step__title">Import and use</p>
              <p className="step__desc">Tokens come from your global stylesheet — theming is automatic.</p>
              <pre><code>{`import { ${name} } from '${importPath}'\n\nexport default function Page() {\n  return <${name}>Click me</${name}>\n}`}</code></pre>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
