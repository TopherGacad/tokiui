import type { ReactNode } from 'react'
import { Button } from '@tokiui/ui'

/* ----- Shared inline icons ----- */
const Plus = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
    <path d="M12 5v14M5 12h14" />
  </svg>
)
const Arrow = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14M13 5l7 7-7 7" />
  </svg>
)
const Trash = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
  </svg>
)
const Download = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 3v12m0 0 4-4m-4 4-4-4M5 21h14" />
  </svg>
)
const Copy = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="9" y="9" width="11" height="11" rx="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
)
const External = () => (
  <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M7 17 17 7M9 7h8v8" />
  </svg>
)
const Check = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20 6 9 17l-5-5" />
  </svg>
)

/* ----- Anatomy ----- */
export function ButtonAnatomy() {
  return (
    <div className="anatomy">
      <div className="anatomy__stage">
        <div style={{ position: 'relative', display: 'inline-flex' }}>
          <Button style={{ paddingLeft: 18, paddingRight: 18, gap: 8 }}>
            <Plus />
            <span>Create project</span>
            <Arrow />
          </Button>
          <span className="anatomy__pin" style={{ top: -12, left: -8 }}>1</span>
          <span className="anatomy__pin" style={{ top: -12, left: 20 }}>2</span>
          <span className="anatomy__pin" style={{ top: -12, left: 80 }}>3</span>
          <span className="anatomy__pin" style={{ top: -12, right: -8 }}>4</span>
        </div>
      </div>
      <div className="anatomy__legend">
        <div className="anatomy__row">
          <span className="anatomy__num">1</span>
          <span>
            <span className="anatomy__label">Container</span>
            <span className="anatomy__desc">Surface, border, border-radius, focus ring.</span>
          </span>
        </div>
        <div className="anatomy__row">
          <span className="anatomy__num">2</span>
          <span>
            <span className="anatomy__label">Leading icon</span>
            <span className="anatomy__desc">14 px, inherits text color. Aria-hidden.</span>
          </span>
        </div>
        <div className="anatomy__row">
          <span className="anatomy__num">3</span>
          <span>
            <span className="anatomy__label">Label</span>
            <span className="anatomy__desc">Single line, 8 px gap from icons.</span>
          </span>
        </div>
        <div className="anatomy__row">
          <span className="anatomy__num">4</span>
          <span>
            <span className="anatomy__label">Trailing icon</span>
            <span className="anatomy__desc">Optional. Use for direction or disclosure.</span>
          </span>
        </div>
      </div>
    </div>
  )
}

/* ----- Variant gallery ----- */
export function ButtonVariantGallery() {
  return (
    <div className="gal">
      <div className="gal__row">
        <div className="gal__rowlab">Default</div>
        <div className="gal__cells">
          <Button>Get started</Button>
          <Button><Plus />Create</Button>
          <Button>Continue <Arrow /></Button>
          <Button disabled>Disabled</Button>
        </div>
      </div>
      <div className="gal__row">
        <div className="gal__rowlab">Soft</div>
        <div className="gal__cells">
          <Button variant="soft">Soft action</Button>
          <Button variant="soft"><Plus />Create</Button>
          <Button variant="soft" disabled>Disabled</Button>
        </div>
      </div>
      <div className="gal__row">
        <div className="gal__rowlab">Outline</div>
        <div className="gal__cells">
          <Button variant="outline">View details</Button>
          <Button variant="outline"><Copy />Copy link</Button>
          <Button variant="outline" disabled>Disabled</Button>
        </div>
      </div>
      <div className="gal__row">
        <div className="gal__rowlab">Ghost</div>
        <div className="gal__cells">
          <Button variant="ghost">Skip</Button>
          <Button variant="ghost">Learn more <External /></Button>
          <Button variant="ghost" disabled>Disabled</Button>
        </div>
      </div>
      <div className="gal__row">
        <div className="gal__rowlab">Link</div>
        <div className="gal__cells">
          <Button variant="link">Read the docs</Button>
          <Button variant="link" disabled>Disabled</Button>
        </div>
      </div>
    </div>
  )
}

/* ----- Sizes gallery ----- */
export function ButtonSizesGallery() {
  return (
    <div className="gal">
      {([['sm', 'Small · h-9'], ['default', 'Medium · h-10'], ['lg', 'Large · h-11']] as const).map(([s, lab]) => (
        <div className="gal__row" key={s}>
          <div className="gal__rowlab">{lab}</div>
          <div className="gal__cells">
            <Button size={s}>Continue</Button>
            <Button color="neutral" size={s}>Cancel</Button>
            <Button variant="ghost" size={s}>Skip</Button>
            <Button color="neutral" variant="outline" size="icon" aria-label="Add" style={s === 'sm' ? { height: 36, width: 36 } : s === 'lg' ? { height: 44, width: 44 } : {}}>
              <Plus />
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}

/* ----- States gallery ----- */
export function ButtonStatesGallery() {
  return (
    <div className="gal">
      <div className="gal__row" style={{ gridTemplateColumns: '1fr' }}>
        <div className="gal__cells">
          <div className="gal__cell">
            <Button>Save changes</Button>
            <span className="gal__caption">default</span>
          </div>
          <div className="gal__cell">
            <Button style={{ background: 'color-mix(in oklch, var(--primary) 88%, black)', borderColor: 'color-mix(in oklch, var(--primary) 88%, black)' }}>
              Save changes
            </Button>
            <span className="gal__caption">hover</span>
          </div>
          <div className="gal__cell">
            <Button style={{ outline: 'none', boxShadow: '0 0 0 2px var(--background), 0 0 0 4px var(--ring)' }}>
              Save changes
            </Button>
            <span className="gal__caption">focused</span>
          </div>
          <div className="gal__cell">
            <Button style={{ transform: 'scale(0.97)' }}>Save changes</Button>
            <span className="gal__caption">active</span>
          </div>
          <div className="gal__cell">
            <Button disabled>Save changes</Button>
            <span className="gal__caption">disabled</span>
          </div>
          <div className="gal__cell">
            <Button disabled aria-busy="true">
              <span className="btn-spinner" aria-hidden="true" />
              Saving…
            </Button>
            <span className="gal__caption">loading</span>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ----- With icons gallery ----- */
export function ButtonWithIconsGallery() {
  return (
    <div className="gal">
      <div className="gal__row">
        <div className="gal__rowlab">Leading</div>
        <div className="gal__cells">
          <Button><Plus />New project</Button>
          <Button color="neutral"><Download />Download</Button>
          <Button variant="ghost"><Copy />Copy link</Button>
        </div>
      </div>
      <div className="gal__row">
        <div className="gal__rowlab">Trailing</div>
        <div className="gal__cells">
          <Button>Continue <Arrow /></Button>
          <Button variant="ghost">Read more <External /></Button>
        </div>
      </div>
      <div className="gal__row">
        <div className="gal__rowlab">Icon only</div>
        <div className="gal__cells">
          <Button color="neutral" variant="outline" size="icon" aria-label="Add" style={{ height: 36, width: 36 }}><Plus /></Button>
          <Button color="neutral" variant="outline" size="icon" aria-label="Add"><Plus /></Button>
          <Button color="neutral" variant="outline" size="icon" aria-label="Add" style={{ height: 44, width: 44 }}><Plus /></Button>
          <Button variant="ghost" size="icon" aria-label="Copy"><Copy /></Button>
          <Button color="destructive" size="icon" aria-label="Delete"><Trash /></Button>
        </div>
      </div>
    </div>
  )
}

/* ----- Button group demo ----- */
export function ButtonGroupDemo() {
  return (
    <div className="show">
      <div className="show__bar">
        <span className="show__title">Button group · segmented action</span>
      </div>
      <div className="show__body" style={{ gap: 24, flexWrap: 'wrap' }}>
        <div className="btn-group">
          <Button variant="outline">Day</Button>
          <Button variant="outline">Week</Button>
          <Button variant="outline">Month</Button>
        </div>
        <div className="btn-group">
          <Button variant="outline" size="icon" aria-label="Copy"><Copy /></Button>
          <Button variant="outline" size="icon" aria-label="Download"><Download /></Button>
          <Button variant="outline" size="icon" aria-label="Delete"><Trash /></Button>
        </div>
      </div>
    </div>
  )
}

/* ----- Loading demo ----- */
export function ButtonLoadingDemo() {
  return (
    <Button disabled aria-busy="true">
      <span className="btn-spinner" aria-hidden="true" />
      Saving…
    </Button>
  )
}

/* ----- Do / Don't ----- */
export function ButtonDoDont() {
  return (
    <div className="dodont">
      <div className="dd dd--do">
        <div className="dd__head">
          <span className="dd__icon"><Check /></span>
          Do
        </div>
        <div className="dd__body">
          <div style={{ display: 'flex', gap: 8 }}>
            <Button variant="ghost">Cancel</Button>
            <Button>Save changes</Button>
          </div>
        </div>
        <p className="dd__caption">Use one primary per region. Pair it with a ghost or outline as the safe escape.</p>
      </div>
      <div className="dd dd--dont">
        <div className="dd__head">
          <span className="dd__icon">×</span>
          {"Don't"}
        </div>
        <div className="dd__body">
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
            <Button>Save</Button>
            <Button>Save & close</Button>
            <Button color="destructive">Delete</Button>
          </div>
        </div>
        <p className="dd__caption">{"Don't"} stack multiple primaries — users {"can't"} tell which action is the default.</p>
      </div>
    </div>
  )
}

/* ----- Props table ----- */
const PROPS = [
  { name: 'variant', type: '"default" | "outline" | "soft" | "ghost" | "link"', def: '"default"', desc: 'Visual style: solid fill, border, tinted fill, hover-only, or text link.' },
  { name: 'color',   type: '"default" | "contrast" | "neutral" | "destructive"', def: '"default"', desc: 'Semantic color. contrast is a neutral, foreground-filled fill for toggle / selected states; use destructive only for irreversible actions.' },
  { name: 'size',    type: '"default" | "sm" | "lg" | "icon"',                  def: '"default"', desc: 'Sets height and horizontal padding. icon renders a square.' },
  { name: 'shape',   type: '"default" | "pill"',                                def: '"default"', desc: 'Corner style. pill renders fully-rounded (capsule) — for filter chips and segmented toggles.' },
  { name: 'asChild',  type: 'boolean',                   def: 'false', desc: 'Render the child element instead of <button>. Useful for <Link>.' },
  { name: 'disabled', type: 'boolean',                   def: 'false', desc: 'Disables interaction and reduces opacity to 50%.' },
  { name: 'className', type: 'string',                   desc: 'Additional classes merged via cn().' },
  { name: 'children', type: 'ReactNode',                 desc: 'Label and optional leading/trailing icons.' },
  { name: 'onClick',  type: '(e: MouseEvent) => void',   desc: 'Click handler forwarded to the underlying element.' },
] as const

export function ButtonPropsTable() {
  return (
    <div className="props">
      {PROPS.map((p) => (
        <div className="props__row" key={p.name}>
          <div className="props__l">
            <span className="props__name">{p.name}</span>
            <span className="props__type">{p.type}</span>
          </div>
          <div className="props__r">
            <span className="props__desc">{p.desc}</span>
            {'def' in p && p.def !== undefined && (
              <span className="props__def">default <span className="props__chip">{p.def}</span></span>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

/* ----- CSS vars table ----- */
const VARS = [
  { sw: 'var(--primary)',              name: '--primary',              desc: 'Fill for default variant + default color.' },
  { sw: 'var(--primary-foreground)',   name: '--primary-foreground',   desc: 'Text color on primary-filled buttons.' },
  { sw: 'var(--secondary)',            name: '--secondary',            desc: 'Fill for neutral color on solid and soft variants.' },
  { sw: 'var(--destructive)',          name: '--destructive',          desc: 'Fill for destructive color on solid variant.' },
  { sw: 'var(--btn-soft)',             name: '--btn-soft',             desc: 'Soft tint: color-mix(primary 18%, background).' },
  { sw: 'var(--btn-destructive-soft)', name: '--btn-destructive-soft', desc: 'Destructive soft tint: color-mix(destructive 12%, background).' },
  { sw: 'var(--ring)',                 name: '--ring',                 desc: 'Focus ring color.' },
  { sw: 'var(--radius)',               name: '--radius',               desc: 'Corner radius shared across all components.' },
]

export function ButtonCssVarsTable() {
  return (
    <div className="vars">
      {VARS.map((v) => (
        <div className="vars__row" key={v.name}>
          <span className="vars__sw" style={{ background: v.sw }} />
          <span className="vars__name">{v.name}</span>
          <span className="vars__desc">{v.desc}</span>
        </div>
      ))}
    </div>
  )
}

/* ----- A11y table ----- */
const A11Y = [
  { k: <><kbd className="kbd">Tab</kbd></>,                                        v: 'Moves focus to the button.' },
  { k: <><kbd className="kbd">Enter</kbd> / <kbd className="kbd">Space</kbd></>,   v: 'Activates the button. Equivalent to onClick.' },
  { k: 'role',         v: '"button" — implicit on <button>. Required when rendering as <a> via asChild.' },
  { k: 'aria-label',   v: 'Required for icon-only buttons where the visible label is absent.' },
  { k: 'aria-disabled', v: 'Use instead of disabled to keep the button focusable and discoverable by AT.' },
  { k: 'aria-busy',    v: 'Set to true while loading. Pair with visually-hidden status text.' },
]

export function ButtonA11yTable() {
  return (
    <div className="a11y">
      {A11Y.map((r, i) => (
        <div className="a11y__row" key={i}>
          <div className="a11y__k">{r.k}</div>
          <div className="a11y__v">{r.v}</div>
        </div>
      ))}
    </div>
  )
}

/* ================================================================
   PER-VARIANT SHOWCASE COMPONENTS
   ================================================================ */

function Row({ children }: { children: ReactNode }) {
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}>
      {children}
    </div>
  )
}

/* ---- Preview (hero) ---- */
export function ButtonPreview() {
  return (
    <Row>
      <Button>Get started</Button>
      <Button variant="outline">Learn more</Button>
      <Button color="neutral">Cancel</Button>
      <Button variant="ghost">Skip</Button>
      <Button color="destructive">Delete</Button>
    </Row>
  )
}

/* ================================================================
   STYLE VARIANTS
   ================================================================ */

export function BtnSolidPreview() {
  return <Row><Button>Save changes</Button></Row>
}

export function BtnSoftPreview() {
  return <Row><Button variant="soft">Save changes</Button></Row>
}

export function BtnOutlinePreview() {
  return <Row><Button variant="outline">Learn more</Button></Row>
}

export function BtnGhostPreview() {
  return <Row><Button variant="ghost">Skip for now</Button></Row>
}

export function BtnLinkPreview() {
  return <Row><Button variant="link">View documentation</Button></Row>
}

export function BtnShapePreview() {
  return (
    <Row>
      <Button shape="pill">Pill</Button>
      <Button shape="pill" variant="outline" color="neutral">Filter</Button>
      <Button shape="pill" color="contrast">Selected</Button>
    </Row>
  )
}

/* ================================================================
   ICON — usage patterns
   ================================================================ */

export function BtnIconOnlyPreview() {
  return (
    <Row>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
        <Button variant="outline" color="neutral" size="icon" aria-label="Add" style={{ height: 36, width: 36 }}><Plus /></Button>
        <span style={{ fontSize: 11, color: 'var(--muted-foreground)', fontFamily: 'var(--font-mono)' }}>sm</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
        <Button variant="outline" color="neutral" size="icon" aria-label="Add"><Plus /></Button>
        <span style={{ fontSize: 11, color: 'var(--muted-foreground)', fontFamily: 'var(--font-mono)' }}>default</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
        <Button variant="outline" color="neutral" size="icon" aria-label="Add" style={{ height: 44, width: 44 }}><Plus /></Button>
        <span style={{ fontSize: 11, color: 'var(--muted-foreground)', fontFamily: 'var(--font-mono)' }}>lg</span>
      </div>
    </Row>
  )
}

export function BtnWithIconPreview() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center' }}>
      <Row>
        <Button><Plus />New project</Button>
        <Button color="neutral"><Download />Download</Button>
        <Button variant="outline"><Copy />Copy link</Button>
        <Button variant="ghost"><Trash />Remove</Button>
      </Row>
      <Row>
        <Button>Continue <Arrow /></Button>
        <Button variant="ghost">Read more <External /></Button>
      </Row>
    </div>
  )
}

/* ================================================================
   BUTTON GROUP — variants
   ================================================================ */

export function BtnGroupSolidPreview() {
  return (
    <Row>
      <div className="btn-group">
        <Button>Day</Button>
        <Button>Week</Button>
        <Button>Month</Button>
      </div>
      <div className="btn-group">
        <Button size="icon" aria-label="Copy"><Copy /></Button>
        <Button size="icon" aria-label="Download"><Download /></Button>
        <Button size="icon" aria-label="Delete"><Trash /></Button>
      </div>
    </Row>
  )
}

export function BtnGroupSoftPreview() {
  return (
    <Row>
      <div className="btn-group">
        <Button variant="soft">Day</Button>
        <Button variant="soft">Week</Button>
        <Button variant="soft">Month</Button>
      </div>
    </Row>
  )
}

export function BtnGroupOutlinePreview() {
  return (
    <Row>
      <div className="btn-group">
        <Button variant="outline">Day</Button>
        <Button variant="outline">Week</Button>
        <Button variant="outline">Month</Button>
      </div>
      <div className="btn-group">
        <Button variant="outline" size="icon" aria-label="Copy"><Copy /></Button>
        <Button variant="outline" size="icon" aria-label="Download"><Download /></Button>
        <Button variant="outline" size="icon" aria-label="Delete"><Trash /></Button>
      </div>
    </Row>
  )
}

/* ================================================================
   COLOR — per-color previews
   ================================================================ */

export function BtnColorPrimaryPreview() {
  return (
    <Row>
      <Button>Button</Button>
      <Button variant="soft">Soft</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
    </Row>
  )
}

export function BtnColorNeutralPreview() {
  return (
    <Row>
      <Button color="neutral">Button</Button>
      <Button variant="soft" color="neutral">Soft</Button>
      <Button variant="outline" color="neutral">Outline</Button>
      <Button variant="ghost" color="neutral">Ghost</Button>
    </Row>
  )
}

export function BtnColorDestructivePreview() {
  return (
    <Row>
      <Button color="destructive">Button</Button>
      <Button variant="soft" color="destructive">Soft</Button>
      <Button variant="outline" color="destructive">Outline</Button>
      <Button variant="ghost" color="destructive">Ghost</Button>
    </Row>
  )
}

/* ================================================================
   FULL WIDTH
   ================================================================ */

export function BtnFullWidthStackedPreview() {
  return (
    <div style={{ width: '100%', maxWidth: 320, display: 'flex', flexDirection: 'column', gap: 10 }}>
      <Button className="w-full">Create account</Button>
      <Button variant="outline" className="w-full">Sign in instead</Button>
    </div>
  )
}

export function BtnFullWidthRowPreview() {
  return (
    <div style={{ width: '100%', maxWidth: 320, display: 'flex', gap: 8 }}>
      <Button variant="outline" color="neutral" className="w-full">Cancel</Button>
      <Button className="w-full">Save changes</Button>
    </div>
  )
}

/* ================================================================
   LOADING
   ================================================================ */

export function BtnLoadingPreview() {
  return (
    <Row>
      <Button disabled aria-busy="true">
        <span className="btn-spinner" aria-hidden="true" />
        Saving…
      </Button>
      <Button color="neutral" disabled aria-busy="true">
        <span className="btn-spinner" aria-hidden="true" />
        Processing…
      </Button>
      <Button variant="outline" disabled aria-busy="true">
        <span className="btn-spinner" aria-hidden="true" />
        Loading…
      </Button>
    </Row>
  )
}
