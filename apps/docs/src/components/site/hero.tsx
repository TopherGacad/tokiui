'use client'

// Hero. The announcement pill is a tokiui Badge and the CTAs + copy button are tokiui Buttons.
// The install-command bar itself stays bespoke (a specialized widget; no matching component).
import Link from 'next/link'
import { Button, Badge, buttonVariants } from '@tokiui/ui'
import { useCopy } from './use-copy'
import { Icon } from './icons'

export function Hero() {
  const cmd = 'npx @tokiui/cli add button'
  const [copied, copy] = useCopy(cmd)

  return (
    <section className="hero" data-screen-label="Hero">
      <div className="hero__bg" />
      <div className="hero__grid" />
      <div className="container">
        <div className="hero__inner">
          <Badge
            variant="outline"
            // match the original pill: card bg, default border, 13px muted text, shadow-sm
            className="mb-7 gap-2 rounded-full border-border bg-card px-3 py-1.5 text-[13px] font-normal text-muted-foreground shadow-sm"
          >
            <Badge variant="soft" color="secondary" size="sm" className="font-mono">v0.3.0</Badge>
            Now public
          </Badge>
          <h1 className="hero__title">
            The component library<br />
            <span className="hero__title-em">we ship with.</span>
          </h1>
          <p className="hero__sub">
            47 components, one token map, zero black-box dependencies.
            Used in 14 of our internal apps.
          </p>
          <div className="hero__ctas">
            <Link href="/docs/components/button" className={buttonVariants({ size: 'lg' })}>
              Browse Components <Icon.arrow />
            </Link>
            <Link href="/playground" className={buttonVariants({ variant: 'outline', size: 'lg' })}>
              Open Playground
            </Link>
          </div>

          <div className="hero__install" role="group" aria-label="Install command">
            <span className="hero__install-prompt mono">$</span>
            <span className="hero__install-cmd mono">{cmd}</span>
            <Button
              variant="outline"
              size="icon"
              aria-label={copied ? 'Copied' : 'Copy install command'}
              onClick={copy}
              // match .hero__install-copy: 28×28 round, card bg, no shadow
              className={`h-7 w-7 shrink-0 rounded-full border-border bg-card shadow-none active:scale-100 hover:bg-card ${copied ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
            >
              {copied ? <Icon.check /> : <Icon.copy />}
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
