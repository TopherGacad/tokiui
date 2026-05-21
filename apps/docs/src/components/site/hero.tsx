'use client'

import { Button, Badge } from '@tokiui/ui'
import { useCopy } from './use-copy'
import { Icon } from './icons'

export function Hero() {
  const cmd = 'npx tokiui add button'
  const [copied, copy] = useCopy(cmd)

  return (
    <section className="hero" data-screen-label="Hero">
      <div className="hero__bg" />
      <div className="hero__grid" />
      <div className="container">
        <div className="hero__inner">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-[13px] text-muted-foreground shadow-sm mb-7">
            <Badge variant="soft" color="secondary" size="sm" className="font-mono">v0.3.0</Badge>
            Now public
          </span>
          <h1 className="hero__title">
            The component library<br />
            <span className="hero__title-em">we ship with.</span>
          </h1>
          <p className="hero__sub">
            47 components, one token map, zero black-box dependencies.
            Used in 14 of our internal apps.
          </p>
          <div className="hero__ctas">
            <Button size="lg">
              Browse Components <Icon.arrow />
            </Button>
            <Button variant="outline" size="lg">
              Open Playground
            </Button>
          </div>

          <div className="hero__install" role="group" aria-label="Install command">
            <span className="hero__install-prompt mono">$</span>
            <span className="hero__install-cmd mono">{cmd}</span>
            <button
              type="button"
              className={`hero__install-copy${copied ? ' copied' : ''}`}
              aria-label={copied ? 'Copied' : 'Copy install command'}
              onClick={copy}
            >
              {copied ? <Icon.check /> : <Icon.copy />}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
