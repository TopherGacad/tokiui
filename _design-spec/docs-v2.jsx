/* tokiui — docs v2 (JSX)
   Plain JS, no imports. Assumes React + docs-v2.css on page.
   Single Button page demonstrating: terminal install, manual install
   accordion, anatomy, sizes/states/icons galleries, do/don't, compact
   props, css-vars, a11y. */

const { useState, useEffect, useRef } = React;

/* ----- icons ---------------------------------------------- */
const I = {
  chev: (p) => <svg viewBox="0 0 24 24" width={p?.s||12} height={p?.s||12} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 6 6 6-6 6"/></svg>,
  copy: () => <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/></svg>,
  check: () => <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>,
  arrow: () => <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>,
  plus: () => <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>,
  trash: () => <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/></svg>,
  download: () => <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v12m0 0 4-4m-4 4-4-4M5 21h14"/></svg>,
  external: () => <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17 17 7M9 7h8v8"/></svg>,
  menu: () => <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M3 6h18M3 12h18M3 18h18"/></svg>,
};

const useCopy = () => {
  const [ok, setOk] = useState(false);
  return { ok, copy: async (t) => { try { await navigator.clipboard.writeText(t); } catch {} ; setOk(true); setTimeout(() => setOk(false), 1300); } };
};

/* ----- header / sidebar ---------------------------------- */
function Header() {
  return (
    <header className="site-header">
      <div className="brand">
        <span className="brand__chip">tu</span>
        tokiui
      </div>
      <nav className="head-nav">
        <a href="#" className="is-active">Components</a>
        <a href="#">Themes</a>
        <a href="#">Changelog</a>
        <a href="#">GitHub</a>
      </nav>
      <span className="cmdk">⌘ K</span>
    </header>
  );
}

const NAV = [
  { label: "Getting Started", items: [
    { id: "introduction", label: "Introduction" },
    { id: "installation", label: "Installation" },
    { id: "theming",      label: "Theming", pill: "new" },
    { id: "cli",          label: "CLI" },
  ]},
  { label: "Components", items: [
    { id: "button", label: "Button", active: true },
    { id: "badge",  label: "Badge" },
    { id: "card",   label: "Card" },
    { id: "input",  label: "Input" },
    { id: "dialog", label: "Dialog" },
    { id: "switch", label: "Switch" },
    { id: "tabs",   label: "Tabs", pill: "soon" },
    { id: "tooltip",label: "Tooltip", pill: "soon" },
  ]},
];
function Sidebar() {
  return (
    <aside className="sidebar">
      {NAV.map((sec) => (
        <div className="sidebar__sec" key={sec.label}>
          <p className="sidebar__lab">{sec.label}</p>
          <nav className="sidebar__nav">
            {sec.items.map((it) => (
              <a key={it.id} href={`#${it.id}`} className={"sidebar__link" + (it.active ? " is-active" : "")}>
                <span>{it.label}</span>
                {it.pill && <span className={"pill" + (it.pill === "new" ? " pill--new" : "")}>{it.pill}</span>}
              </a>
            ))}
          </nav>
        </div>
      ))}
    </aside>
  );
}

/* ----- TOC ----------------------------------------------- */
const TOC = [
  { id: "overview",     label: "Overview" },
  { id: "installation", label: "Installation" },
  { id: "anatomy",      label: "Anatomy" },
  { id: "variants",     label: "Variants" },
  { id: "sizes",        label: "Sizes" },
  { id: "states",       label: "States" },
  { id: "with-icons",   label: "With icons" },
  { id: "button-group", label: "Button group" },
  { id: "loading",      label: "Loading" },
  { id: "do-dont",      label: "Do & don't" },
  { id: "api",          label: "API reference" },
  { id: "css-vars",     label: "CSS variables" },
  { id: "accessibility",label: "Accessibility" },
];
function TOCNav({ active }) {
  return (
    <nav className="toc" aria-label="On this page">
      <p className="toc__title">On this page</p>
      <ul>
        {TOC.map((it) => (
          <li key={it.id}>
            <a href={`#${it.id}`} className={active === it.id ? "is-active" : ""}>{it.label}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/* ----- Terminal install ---------------------------------- */
const PMS = [
  { id: "cli",  label: "tokiui",cls: "cli",  cmd: { tool: "npx", flag: "tokiui",      arg: "add button" } },
  { id: "npm",  label: "npm",   cls: "npm",  cmd: { tool: "npm", flag: "install",     arg: "@tokiui/button" } },
  { id: "pnpm", label: "pnpm",  cls: "pnpm", cmd: { tool: "pnpm",flag: "add",         arg: "@tokiui/button" } },
  { id: "yarn", label: "yarn",  cls: "yarn", cmd: { tool: "yarn",flag: "add",         arg: "@tokiui/button" } },
  { id: "bun",  label: "bun",   cls: "bun",  cmd: { tool: "bun", flag: "add",         arg: "@tokiui/button" } },
];
const pmText = (p) => `${p.cmd.tool} ${p.cmd.flag} ${p.cmd.arg}`;
const pmGlyphLabel = { cli: "tu", npm: "n", pnpm: "p", yarn: "y", bun: "b" };

function TerminalInstall() {
  const [pm, setPm] = useState("cli");
  const cur = PMS.find((p) => p.id === pm);
  const { ok, copy } = useCopy();
  return (
    <div className="term">
      <div className="term__head">
        <span className="term__lights">
          <span className="term__light term__light--r"></span>
          <span className="term__light term__light--y"></span>
          <span className="term__light term__light--g"></span>
        </span>
        <span className="term__title">~/my-app</span>
        <div className="pm-tabs" role="tablist">
          {PMS.map((p) => (
            <button key={p.id} role="tab" aria-selected={pm === p.id}
              className={"pm-tab" + (pm === p.id ? " is-active" : "")}
              onClick={() => setPm(p.id)}>
              <span className={`pm-glyph pm-glyph--${p.cls}`}>{pmGlyphLabel[p.id]}</span>
              {p.label}
            </button>
          ))}
        </div>
      </div>
      <div className="term__body">
        <span className="term__prompt">$</span>
        <span className="t-tool">{cur.cmd.tool}</span>{" "}
        <span className="t-flag">{cur.cmd.flag}</span>{" "}
        <span className="t-arg">{cur.cmd.arg}</span>
        <button className={"term__copy" + (ok ? " ok" : "")} onClick={() => copy(pmText(cur))}>
          {ok ? <><I.check/>copied</> : <><I.copy/>copy</>}
        </button>
      </div>
    </div>
  );
}

/* ----- Manual install accordion -------------------------- */
function ManualInstall() {
  const [open, setOpen] = useState(false);
  return (
    <div className={"manual" + (open ? " is-open" : "")}>
      <button className="manual__head" aria-expanded={open} onClick={() => setOpen((v) => !v)}>
        <span className="manual__head-l">
          <span className="manual__icon"><I.download/></span>
          <span>Manual installation</span>
          <span className="pill">3 steps</span>
        </span>
        <span className="manual__chev"><I.chev s={14}/></span>
      </button>
      {open && (
        <div className="manual__body">
          <div className="step">
            <span className="step__num">1</span>
            <div>
              <p className="step__title">Install peer dependencies</p>
              <p className="step__desc">tokiui's Button has no JS deps; you only need React 18 or 19 and a way to ship CSS variables for the design tokens.</p>
              <pre><code><span className="tk-com"># peer deps</span>{"\n"}npm install <span className="tk-str">react</span> <span className="tk-str">react-dom</span></code></pre>
            </div>
          </div>
          <div className="step">
            <span className="step__num">2</span>
            <div>
              <p className="step__title">Copy the source</p>
              <p className="step__desc">Drop these two files into your codebase. They are unminified and dependency-free — own them, edit them, ship them.</p>
              <span className="step__file"><I.copy/>components/ui/button.tsx</span>{" "}
              <span className="step__file"><I.copy/>styles/tokiui/button.css</span>
              <pre><code><span className="tk-com">// components/ui/button.tsx</span>{"\n"}
<span className="tk-key">import</span> {"{ forwardRef }"} <span className="tk-key">from</span> <span className="tk-str">"react"</span>;{"\n"}
<span className="tk-key">import</span> <span className="tk-str">"@/styles/tokiui/button.css"</span>;{"\n"}{"\n"}
<span className="tk-key">export const</span> <span className="tk-fn">Button</span> = forwardRef&lt;HTMLButtonElement, Props&gt;({"\n"}
{"  "}({"{ variant = \"primary\", size = \"md\", className, ...p }"}, ref) =&gt; ({"\n"}
{"    "}&lt;button ref={"{ref}"} className={"{`btn btn--${variant} btn--${size} ${className ?? \"\"}`}"} {"{...p}"} /&gt;{"\n"}
{"  "}){"\n"}
);</code></pre>
            </div>
          </div>
          <div className="step">
            <span className="step__num">3</span>
            <div>
              <p className="step__title">Use it</p>
              <p className="step__desc">Import the component anywhere. Tokens come from your global stylesheet, so theming is automatic.</p>
              <pre><code><span className="tk-key">import</span> {"{ Button }"} <span className="tk-key">from</span> <span className="tk-str">"@/components/ui/button"</span>;{"\n"}{"\n"}
<span className="tk-key">export default function</span> <span className="tk-fn">Page</span>() {"{"}{"\n"}
{"  "}<span className="tk-key">return</span> &lt;<span className="tk-fn">Button</span>&gt;Get started&lt;/<span className="tk-fn">Button</span>&gt;;{"\n"}
{"}"}</code></pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ----- Showcase shell ------------------------------------ */
function Showcase({ title, children, code, defaultTab = "preview" }) {
  const [tab, setTab] = useState(defaultTab);
  const { ok, copy } = useCopy();
  return (
    <div className="show">
      <div className="show__bar">
        <span className="show__title">{title}</span>
        <div className="show__tabs" role="tablist">
          <button role="tab" aria-selected={tab === "preview"} className={"show__tab" + (tab === "preview" ? " is-active" : "")} onClick={() => setTab("preview")}>Preview</button>
          {code && <button role="tab" aria-selected={tab === "code"} className={"show__tab" + (tab === "code" ? " is-active" : "")} onClick={() => setTab("code")}>Code</button>}
        </div>
      </div>
      {tab === "preview" ? (
        <div className="show__body">{children}</div>
      ) : (
        <div className="show__code">
          <button className={"term__copy" + (ok ? " ok" : "")} style={{ top: 10, right: 10 }} onClick={() => copy(code)}>
            {ok ? <><I.check/>copied</> : <><I.copy/>copy</>}
          </button>
          {code}
        </div>
      )}
    </div>
  );
}

/* ----- Anatomy ------------------------------------------- */
function Anatomy() {
  return (
    <div className="anatomy">
      <div className="anatomy__stage">
        <button className="btn btn--primary btn--md" style={{ position: "relative" }}>
          <I.plus/>
          <span>Create project</span>
          <I.arrow/>
          <span className="anatomy__pin" style={{ top: -10, left: 6 }}>1</span>
          <span className="anatomy__pin" style={{ top: -10, left: 32 }}>2</span>
          <span className="anatomy__pin" style={{ top: -10, left: 130 }}>3</span>
          <span className="anatomy__pin" style={{ bottom: -10, right: -10 }}>4</span>
        </button>
      </div>
      <div className="anatomy__legend">
        <div className="anatomy__row"><span className="anatomy__num">1</span><span><span className="anatomy__label">Container</span><span className="anatomy__desc">Surface, border, radius, focus ring.</span></span></div>
        <div className="anatomy__row"><span className="anatomy__num">2</span><span><span className="anatomy__label">Leading icon</span><span className="anatomy__desc">14px, inherits text color.</span></span></div>
        <div className="anatomy__row"><span className="anatomy__num">3</span><span><span className="anatomy__label">Label</span><span className="anatomy__desc">Single line, 8px gap from icons.</span></span></div>
        <div className="anatomy__row"><span className="anatomy__num">4</span><span><span className="anatomy__label">Trailing icon</span><span className="anatomy__desc">Optional. Use for direction or disclosure.</span></span></div>
      </div>
    </div>
  );
}

/* ----- Variant gallery ---------------------------------- */
function VariantGallery() {
  return (
    <div className="gal">
      <div className="gal__row">
        <div className="gal__rowlab">Primary</div>
        <div className="gal__cells">
          <button className="btn btn--primary btn--md">Get started</button>
          <button className="btn btn--primary btn--md"><I.plus/>Create</button>
          <button className="btn btn--primary btn--md">Continue<I.arrow/></button>
          <button className="btn btn--primary btn--md" disabled>Disabled</button>
        </div>
      </div>
      <div className="gal__row">
        <div className="gal__rowlab">Secondary</div>
        <div className="gal__cells">
          <button className="btn btn--secondary btn--md">Cancel</button>
          <button className="btn btn--secondary btn--md"><I.download/>Export</button>
          <button className="btn btn--secondary btn--md">Edit</button>
          <button className="btn btn--secondary btn--md" disabled>Disabled</button>
        </div>
      </div>
      <div className="gal__row">
        <div className="gal__rowlab">Ghost</div>
        <div className="gal__cells">
          <button className="btn btn--ghost btn--md">Skip</button>
          <button className="btn btn--ghost btn--md">Learn more</button>
          <button className="btn btn--ghost btn--md">View all<I.arrow/></button>
          <button className="btn btn--ghost btn--md" disabled>Disabled</button>
        </div>
      </div>
      <div className="gal__row">
        <div className="gal__rowlab">Destructive</div>
        <div className="gal__cells">
          <button className="btn btn--destructive btn--md"><I.trash/>Delete project</button>
          <button className="btn btn--destructive btn--md">Remove</button>
          <button className="btn btn--destructive btn--md" disabled>Disabled</button>
        </div>
      </div>
    </div>
  );
}

/* ----- Sizes / States / Icons --------------------------- */
function Sizes() {
  return (
    <div className="gal">
      {[["sm","Small · 32"],["md","Medium · 40"],["lg","Large · 46"]].map(([s, lab]) => (
        <div className="gal__row" key={s}>
          <div className="gal__rowlab">{lab}</div>
          <div className="gal__cells">
            <button className={`btn btn--primary btn--${s}`}>Continue</button>
            <button className={`btn btn--secondary btn--${s}`}>Cancel</button>
            <button className={`btn btn--ghost btn--${s}`}>Skip</button>
            <button className={`btn btn--secondary btn--icon btn--${s}`} aria-label="Add"><I.plus/></button>
          </div>
        </div>
      ))}
    </div>
  );
}

function States() {
  const states = [
    ["Default",  "btn--primary"],
    ["Hover",    "btn--primary btn-demo--hover"],
    ["Focused",  "btn--primary btn-demo--focus"],
    ["Active",   "btn--primary btn-demo--active"],
    ["Disabled", "btn--primary"],
    ["Loading",  "btn--primary"],
  ];
  return (
    <div className="gal">
      <div className="gal__row">
        <div className="gal__rowlab">Interactive</div>
        <div className="gal__cells">
          {states.map(([lab, cls]) => (
            <div className="gal__cell" key={lab}>
              <button
                className={`btn ${cls} btn--md`}
                disabled={lab === "Disabled"}
                aria-disabled={lab === "Disabled"}
              >
                {lab === "Loading" && <span className="btn-spinner" aria-hidden="true"/>}
                {lab === "Loading" ? "Saving…" : "Save changes"}
              </button>
              <span className="gal__caption">{lab.toLowerCase()}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function WithIcons() {
  return (
    <div className="gal">
      <div className="gal__row">
        <div className="gal__rowlab">Leading</div>
        <div className="gal__cells">
          <button className="btn btn--primary btn--md"><I.plus/>New project</button>
          <button className="btn btn--secondary btn--md"><I.download/>Download</button>
          <button className="btn btn--ghost btn--md"><I.copy/>Copy link</button>
        </div>
      </div>
      <div className="gal__row">
        <div className="gal__rowlab">Trailing</div>
        <div className="gal__cells">
          <button className="btn btn--primary btn--md">Continue<I.arrow/></button>
          <button className="btn btn--ghost btn--md">Read more<I.external/></button>
        </div>
      </div>
      <div className="gal__row">
        <div className="gal__rowlab">Icon only</div>
        <div className="gal__cells">
          <button className="btn btn--secondary btn--icon btn--sm" aria-label="Add"><I.plus/></button>
          <button className="btn btn--secondary btn--icon btn--md" aria-label="Add"><I.plus/></button>
          <button className="btn btn--secondary btn--icon btn--lg" aria-label="Add"><I.plus/></button>
          <button className="btn btn--ghost btn--icon btn--md" aria-label="Copy"><I.copy/></button>
          <button className="btn btn--destructive btn--icon btn--md" aria-label="Delete"><I.trash/></button>
        </div>
      </div>
    </div>
  );
}

function ButtonGroup() {
  return (
    <div className="show">
      <div className="show__bar"><span className="show__title">Button group · segmented action</span></div>
      <div className="show__body" style={{ gap: 24, flexWrap: "wrap" }}>
        <div className="btn-group">
          <button className="btn btn--secondary btn--md">Day</button>
          <button className="btn btn--secondary btn--md" style={{ background: "var(--muted)" }}>Week</button>
          <button className="btn btn--secondary btn--md">Month</button>
        </div>
        <div className="btn-group">
          <button className="btn btn--secondary btn--md"><I.copy/></button>
          <button className="btn btn--secondary btn--md"><I.download/></button>
          <button className="btn btn--secondary btn--md"><I.trash/></button>
        </div>
      </div>
    </div>
  );
}

/* ----- Do / Don't --------------------------------------- */
function DoDont() {
  return (
    <div className="dodont">
      <div className="dd dd--do">
        <div className="dd__head"><span className="dd__icon"><I.check/></span>Do</div>
        <div className="dd__body">
          <div style={{ display: "flex", gap: 8 }}>
            <button className="btn btn--ghost btn--md">Cancel</button>
            <button className="btn btn--primary btn--md">Save changes</button>
          </div>
        </div>
        <p className="dd__caption">Use one primary per region. Pair it with a ghost or secondary as the safe escape.</p>
      </div>
      <div className="dd dd--dont">
        <div className="dd__head"><span className="dd__icon">×</span>Don't</div>
        <div className="dd__body">
          <div style={{ display: "flex", gap: 8 }}>
            <button className="btn btn--primary btn--md">Save</button>
            <button className="btn btn--primary btn--md">Save & close</button>
            <button className="btn btn--destructive btn--md">Delete</button>
          </div>
        </div>
        <p className="dd__caption">Don't stack multiple primaries — users can't tell which action is the default.</p>
      </div>
    </div>
  );
}

/* ----- Compact props table ------------------------------ */
const PROPS = [
  { name: "variant", type: '"primary" | "secondary" | "ghost" | "destructive"', def: '"primary"', desc: "Visual style. Use destructive only for irreversible actions." },
  { name: "size",    type: '"sm" | "md" | "lg"', def: '"md"', desc: "Sets height (32 / 40 / 46) and horizontal padding." },
  { name: "leadingIcon",  type: "ReactNode", desc: "Icon before the label. Inherits color and is hidden from AT." },
  { name: "trailingIcon", type: "ReactNode", desc: "Icon after the label. Use for direction or external link cues." },
  { name: "iconOnly", type: "boolean", def: "false", desc: "Renders a square button. Requires aria-label." },
  { name: "loading",  type: "boolean", def: "false", desc: "Shows a spinner and prevents click. Pair with optimistic copy." },
  { name: "disabled", type: "boolean", def: "false", desc: "Disables interaction. Prefer hiding the button if the action is unavailable." },
  { name: "asChild",  type: "boolean", def: "false", desc: "Render the child element instead of a <button> — useful for <a> or Next <Link>." },
  { name: "onClick",  type: "(e: MouseEvent) => void", desc: "Click handler.", required: true },
];
function PropsTable() {
  return (
    <div className="props">
      {PROPS.map((p) => (
        <div className="props__row" key={p.name}>
          <div className="props__l">
            <span className="props__name">{p.name}{p.required && <span className="req">*</span>}</span>
            <span className="props__type">{p.type}</span>
          </div>
          <div className="props__r">
            <span className="props__desc">{p.desc}</span>
            {p.def !== undefined && <span className="props__def">default <span className="props__chip">{p.def}</span></span>}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ----- CSS-vars table ----------------------------------- */
const VARS = [
  { name: "--btn-h-sm", sw: "var(--muted)",  desc: "Height for size='sm' (default 32px)." },
  { name: "--btn-h-md", sw: "var(--muted)",  desc: "Height for size='md' (default 40px)." },
  { name: "--btn-h-lg", sw: "var(--muted)",  desc: "Height for size='lg' (default 46px)." },
  { name: "--btn-radius", sw: "var(--primary-soft)", desc: "Corner radius — falls back to --radius." },
  { name: "--btn-bg",   sw: "var(--primary)",     desc: "Background. Variant overrides this." },
  { name: "--btn-fg",   sw: "var(--primary-foreground)", desc: "Text + icon color." },
  { name: "--btn-ring", sw: "var(--ring)",        desc: "Focus ring color (4px outer)." },
];
function CssVars() {
  return (
    <div className="vars">
      {VARS.map((v) => (
        <div className="vars__row" key={v.name}>
          <span className="vars__sw" style={{ background: v.sw }}></span>
          <span className="vars__name">{v.name}</span>
          <span className="vars__desc">{v.desc}</span>
        </div>
      ))}
    </div>
  );
}

/* ----- A11y table --------------------------------------- */
const A11Y = [
  { k: <><span className="kbd">Tab</span></>, v: "Moves focus to the button." },
  { k: <><span className="kbd">Enter</span> / <span className="kbd">Space</span></>, v: "Activates the button. Equivalent to onClick." },
  { k: "role", v: '"button" — implicit on <button>. Required only when rendering as <a>.' },
  { k: "aria-label", v: "Required for icon-only buttons. Otherwise the label is the button text." },
  { k: "aria-disabled", v: "Used when disabled — keeps the button focusable and discoverable by AT." },
  { k: "aria-busy", v: "Set to true while loading. Pair with a visually hidden 'Saving…' string." },
];
function A11yTable() {
  return (
    <div className="a11y">
      {A11Y.map((r, i) => (
        <div className="a11y__row" key={i}>
          <div className="a11y__k">{r.k}</div>
          <div className="a11y__v">{r.v}</div>
        </div>
      ))}
    </div>
  );
}

/* ----- Page --------------------------------------------- */
function ButtonPage() {
  return (
    <article className="prose">
      <nav className="crumb">
        <a href="#">Components</a>
        <span className="crumb__sep">/</span>
        <span className="crumb__cur">Button</span>
      </nav>
      <h1 className="page-title" id="overview">Button</h1>
      <p className="page-desc">Triggers an action. Four variants, three sizes, support for leading/trailing icons, loading and grouped layouts — built on a single <code>&lt;button&gt;</code> element with full keyboard and AT support.</p>
      <div className="meta-row">
        <a href="#" className="meta-pill">v0.4.2 <I.external/></a>
        <a href="#" className="meta-pill">Source <I.external/></a>
        <a href="#" className="meta-pill">Report issue <I.external/></a>
        <span className="meta-pill meta-pill--ok"><span className="meta-dot"/>WCAG AA</span>
      </div>

      <h2 id="installation">Installation</h2>
      <p>Pick the package manager that matches your project, or copy the source manually.</p>
      <TerminalInstall />
      <ManualInstall />

      <h2 id="anatomy">Anatomy</h2>
      <p>The Button is a single element with up to four visible parts. Aim for label-only first; add icons only when they reinforce meaning.</p>
      <Anatomy />

      <h2 id="variants">Variants</h2>
      <p>Four variants cover the usual hierarchy: primary for the default action, secondary for the safe alternative, ghost for low-emphasis or in-list actions, and destructive for irreversible actions.</p>
      <VariantGallery />

      <h2 id="sizes">Sizes</h2>
      <p>Three sizes pair with the platform spacing scale. Match the size of nearby inputs and selects.</p>
      <Sizes />

      <h2 id="states">States</h2>
      <p>Hover, focus, active, disabled and loading are all built in. Focus uses a 4px outer ring against the page background — visible on every variant.</p>
      <States />

      <h2 id="with-icons">With icons</h2>
      <p>Icons sit at 14px and inherit text color. Icon-only buttons require an <code>aria-label</code>.</p>
      <WithIcons />

      <h2 id="button-group">Button group</h2>
      <p>Wrap two or more buttons in <code>.btn-group</code> for a segmented action — useful for view toggles or quick toolbars.</p>
      <ButtonGroup />

      <h2 id="loading">Loading</h2>
      <Showcase
        title="Loading · spinner replaces the leading icon"
        code={`<Button loading>Saving…</Button>`}
      >
        <button className="btn btn--primary btn--md" aria-busy="true">
          <span className="btn-spinner" aria-hidden="true"/>Saving…
        </button>
      </Showcase>

      <h2 id="do-dont">Do & don't</h2>
      <DoDont />

      <h2 id="api">API reference</h2>
      <p>Required props are marked with <span style={{ color: "var(--destructive)" }}>*</span>. Defaults are shown as chips.</p>
      <PropsTable />

      <h2 id="css-vars">CSS variables</h2>
      <p>Theming hooks the Button exposes. Override on a parent to retheme without touching component code.</p>
      <CssVars />

      <h2 id="accessibility">Accessibility</h2>
      <p>Built on the native <code>&lt;button&gt;</code> so semantics, keyboard handling and form participation work by default.</p>
      <A11yTable />
    </article>
  );
}

/* ----- Theme toggle ------------------------------------- */
function ThemeToggle() {
  const [t, setT] = useState("light");
  useEffect(() => { document.documentElement.setAttribute("data-theme", t); }, [t]);
  return (
    <div className="theme-toggle">
      {["light","dark"].map((m) => (
        <button key={m} className={t === m ? "is-active" : ""} onClick={() => setT(m)}>{m}</button>
      ))}
    </div>
  );
}

/* ----- Shell -------------------------------------------- */
function App() {
  return (
    <>
      <ThemeToggle />
      <div className="docs-layout">
        <Header />
        <div className="docs-body">
          <Sidebar />
          <main className="content">
            <div className="content__inner">
              <ButtonPage />
            </div>
            <TOCNav active="overview" />
          </main>
        </div>
      </div>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
