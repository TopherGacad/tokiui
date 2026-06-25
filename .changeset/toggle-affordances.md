---
"@tokiui/ui": minor
---

Add toggle/selected-state affordances surfaced while dogfooding the docs landing page:

- **Button** — new `shape` prop (`default` | `pill`) and `color="contrast"` (neutral, foreground-filled) for toggle / segmented / "selected" states.
- **Switch** — new `thumbClassName` prop to style the thumb (knob), including `data-[state=checked]:` variants.
- **useTheme** — new opt-in `{ transition: true }` option that animates the light/dark switch via the View Transitions API, with a graceful instant fallback where unsupported. Ships a default root-crossfade rule in `styles.css`.

All additive and backward-compatible — existing usage is unchanged.
