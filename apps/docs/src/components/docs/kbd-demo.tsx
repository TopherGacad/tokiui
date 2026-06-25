import { Kbd } from '@tokiui/ui'

function Plus() {
  return <span style={{ color: 'var(--muted-foreground)', fontSize: 12 }}>+</span>
}

export function KbdPreview() {
  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
      <Kbd>⌘</Kbd>
      <Kbd>K</Kbd>
      <Kbd>Esc</Kbd>
      <Kbd>⏎</Kbd>
      <Kbd>⇧</Kbd>
    </div>
  )
}

export function KbdSizesPreview() {
  return (
    <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
      <Kbd size="sm">⌘ K</Kbd>
      <Kbd size="md">⌘ K</Kbd>
      <Kbd size="lg">⌘ K</Kbd>
    </div>
  )
}

export function KbdComboPreview() {
  return (
    <div style={{ display: 'flex', gap: 18, alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
      <span style={{ display: 'inline-flex', gap: 4, alignItems: 'center' }}>
        <Kbd>⌘</Kbd><Plus /><Kbd>K</Kbd>
      </span>
      <span style={{ display: 'inline-flex', gap: 4, alignItems: 'center' }}>
        <Kbd>Ctrl</Kbd><Plus /><Kbd>C</Kbd>
      </span>
      <span style={{ display: 'inline-flex', gap: 4, alignItems: 'center' }}>
        <Kbd>⇧</Kbd><Plus /><Kbd>⌘</Kbd><Plus /><Kbd>P</Kbd>
      </span>
    </div>
  )
}

export function KbdInContextPreview() {
  return (
    <button
      type="button"
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 10,
        height: 36, padding: '0 10px 0 12px', minWidth: 220,
        borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)',
        background: 'var(--muted)', color: 'var(--muted-foreground)',
        fontSize: 13, cursor: 'pointer', textAlign: 'left',
      }}
    >
      <span style={{ flex: 1 }}>Search components…</span>
      <Kbd size="sm">⌘ K</Kbd>
    </button>
  )
}

/* ----- Props table ----- */
const PROPS = [
  { name: 'size', type: '"sm" | "md" | "lg"', def: '"md"', desc: 'Keycap height and text size.' },
  { name: 'className', type: 'string', desc: 'Additional classes merged via cn().' },
  { name: 'children', type: 'ReactNode', desc: 'Key label — a glyph (⌘, ⇧, ⏎) or text (Esc, Ctrl).' },
] as const

export function KbdPropsTable() {
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
