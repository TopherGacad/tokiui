# Phase B Complete — Combobox + Kbd

Date: 2026-06-25

---

Adds the two remaining components and **completes Phase B**: Combobox (the last
Phase B form control) and Kbd (the gap surfaced while dogfooding the docs landing page).

## Kbd (`kbd.tsx`)

- CVA + forwardRef over a semantic `<kbd>`. Sizes `sm` / `md` / `lg`.
- Monospace keycap: border + subtle bottom shadow, built entirely on existing tokens — **no dependencies**.
- For hotkeys, command-palette hints, and shortcut documentation.

## Combobox (`combobox.tsx`)

- Searchable single-select, composed on the existing **`Popover`** + a filtered list — **no new npm dependency** (cmdk deliberately avoided to keep with the minimal-deps ethos).
- Packaged, `options`-driven API (`{ value, label, disabled? }[]`): controlled/uncontrolled via `value`/`defaultValue` + `onValueChange`, plus `placeholder` / `searchPlaceholder` / `emptyText`, `size`, `error`, `clearable`, and `name` (hidden input for native forms).
- **Keyboard nav:** ↑/↓/Home/End move the active option, Enter selects, Esc closes; the search field auto-focuses on open and the active item scrolls into view.
- **A11y:** search field is `role="combobox"` (`aria-controls` / `aria-autocomplete="list"` / `aria-activedescendant`); list is `role="listbox"`, items `role="option"` with `aria-selected`; disabled options are skipped.
- Trigger styling mirrors `SelectTrigger` (sizes, error ring, clear button).

## Registry / docs

- `registry/index.json` + `components/{kbd,combobox}.json`; nav entries, doc pages, and demos for both.
- `combobox.json` → `registryDependencies: ["popover"]`; both have zero npm deps.

Phase B is now complete (Tier 1 + Tier 2 + Combobox); Kbd closes the lone gap from the dogfood. **Next: Phase C — `packages/mcp`.**
