# Table component + data-table pattern

Date: 2026-06-25

---

Adds the **Table** component — the gap the dashboard frame's hand-rolled `<table>` exposed.

## Component (`table.tsx`)

Styled primitives mapping 1:1 to the HTML table elements, `forwardRef` + tokiui tokens, **no dependencies**:
`Table` (wrapped in a responsive `overflow-x-auto` container), `TableHeader`, `TableBody`,
`TableFooter`, `TableRow` (hover + `data-[state=selected]`), `TableHead`, `TableCell`, `TableCaption`.

## Docs

- `table-demo.tsx` — a basic invoices table **and** an interactive **data table**: sortable
  Amount/Date columns, client-side pagination (via `Pagination`), row selection + select-all-on-page
  (via `Checkbox`), composed purely from the primitives + existing components — **no data-grid dependency**.
- Doc page (`/docs/components/table`) + nav entry.

## Notes

- A heavier `DataTable` (column defs, async/server data, virtualization) could follow later, likely on
  a dependency such as TanStack Table — deferred to keep the core dependency-free and copy-paste-able.
- changeset: `@tokiui/ui` minor (→ 0.5.0).
