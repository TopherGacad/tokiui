'use client'

// The Remember-me Switch and the "Live" Badge are tokiui components; the email/password
// Inputs and the Sign-in Button already were. The preview/code tab bar stays bespoke — tokiui
// <Tabs> renders one panel per value and can't show the "split" (preview + code) mode.

import { useState } from 'react'
import { Button, Input, Switch, Badge } from '@tokiui/ui'

const SNIPPETS: Record<string, string> = {
  default: `import { Button, Badge, Input } from "@tokiui/ui"

export function LoginForm() {
  return (
    <Card className="grid gap-4 p-6">
      <Input type="email" placeholder="you@company.com" />
      <Input type="password" placeholder="••••••••" />
      <div className="flex items-center justify-between">
        <Switch label="Remember me" />
        <a href="/reset" className="text-sm">Forgot?</a>
      </div>
      <Button>Sign in</Button>
    </Card>
  )
}`,
  button: `<Button>Sign in</Button>`,
  input: `<Input type="email" placeholder="you@company.com" />`,
  switch: `<Switch label="Remember me" />`,
  badge: `<Badge className="badge-accent">● Live</Badge>`,
}

type Tab = 'preview' | 'code' | 'split'

export function ComponentPreview() {
  const [tab, setTab] = useState<Tab>('preview')
  const [hovered, setHovered] = useState('default')
  const [remember, setRemember] = useState(true)
  const [emailVal, setEmailVal] = useState('')
  const [pwVal, setPwVal] = useState('')

  const code = SNIPPETS[hovered] ?? SNIPPETS.default

  return (
    <section className="section" id="components" data-screen-label="Components">
      <div className="container">
        <div className="section-head section-head--row">
          <div>
            <h2 className="section-title" style={{ marginBottom: 8 }}>
              Real components, real composition.
            </h2>
            <p className="section-sub" style={{ margin: 0 }}>
              Hover any element — the code on the right syncs to that snippet.
            </p>
          </div>
        </div>

        <div className="preview">
          <div className="preview__bar">
            <span className="mono">~/auth/login-form.tsx</span>
            <div className="preview__tabs" role="tablist">
              {(['preview', 'code', 'split'] as const).map((t) => (
                <button
                  key={t}
                  className={`preview__tab${tab === t ? ' active' : ''}`}
                  onClick={() => setTab(t)}
                  role="tab"
                  aria-selected={tab === t}
                >
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className={`preview__body preview__body--${tab}`}>
            {(tab === 'preview' || tab === 'split') && (
              <div className="preview__stage" onMouseLeave={() => setHovered('default')}>
                <div className="preview__form">
                  <div className="preview__form-head">
                    <span className="mono" style={{ fontSize: 11, color: 'var(--muted-foreground)' }}>
                      auth · sign in
                    </span>
                    <span onMouseEnter={() => setHovered('badge')}>
                      {/* tokiui Badge (soft + dot); border re-added inline to match the original pill. */}
                      <Badge
                        variant="soft"
                        color="default"
                        dot
                        style={{ borderColor: 'color-mix(in oklch, var(--primary) 40%, var(--border))' }}
                      >
                        Live
                      </Badge>
                    </span>
                  </div>
                  <div onMouseEnter={() => setHovered('input')}>
                    <Input
                      type="email"
                      placeholder="you@company.com"
                      value={emailVal}
                      onChange={(e) => setEmailVal(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <div onMouseEnter={() => setHovered('input')}>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      value={pwVal}
                      onChange={(e) => setPwVal(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <div className="preview__form-row" onMouseEnter={() => setHovered('switch')}>
                    {/* tokiui Switch; track/border/thumb overridden via className + thumbClassName to match. */}
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
                      <Switch
                        checked={remember}
                        onCheckedChange={setRemember}
                        aria-label="Remember me"
                        className="bg-[var(--muted)] border border-[var(--border-strong)]"
                        thumbClassName="bg-card data-[state=checked]:bg-[var(--primary-foreground)]"
                      />
                      <span style={{ fontSize: 13, color: 'var(--muted-foreground)', cursor: 'pointer', userSelect: 'none' }}>
                        Remember me
                      </span>
                    </span>
                    <a
                      href="#"
                      style={{ fontSize: 13, color: 'var(--muted-foreground)', textDecoration: 'none' }}
                    >
                      Forgot?
                    </a>
                  </div>
                  <div onMouseEnter={() => setHovered('button')}>
                    <Button className="w-full">Sign in</Button>
                  </div>
                </div>
              </div>
            )}

            {(tab === 'code' || tab === 'split') && (
              <pre className="preview__code">{code}</pre>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
