# Phase B Tier 1 — New Components & Color Naming Audit

Date: 2026-05-13 / 2026-05-14

---

## New components added

All four were moved up from Phase B Tier 1 and shipped together.

### Spinner (`spinner.tsx`)
- Four variants: `arc` (default), `ring`, `dots`, `bars`
- `arc`/`ring` use `animate-spin` on the SVG; `dots` uses `tokiui-bounce` keyframe; `bars` uses `tokiui-bar` keyframe
- `color` prop uses actual color names: `default`, `current`, `neutral`, `white`, `green`, `amber`, `sky`, `red`
- Keyframes `@keyframes tokiui-bounce` and `@keyframes tokiui-bar` added to `styles.css`
- Usage examples in docs: card overlay, page loader, typing indicator (dots in chat bubble), form submit state

### Skeleton (`skeleton.tsx`)
- `variant` prop: `default` | `circle` | `text`
- `animation` prop: `pulse` | `shimmer` | `none`
- Shimmer implemented via `.skeleton-shimmer` CSS class with `::after` pseudo-element sweep
- Uses `--skeleton-bg` token instead of `bg-muted` for dark mode visibility
- `--skeleton-bg` defined in `:root` (`var(--muted)`) and overridden in `[data-theme="dark"]` (`oklch(0.36 0.007 95)`)

### Separator (`separator.tsx`)
- No Radix dependency — plain `<div>` with `role="separator"` or `role="none"` (decorative)
- Uses `--separator-color` token via `bg-[var(--separator-color)]` (arbitrary syntax) to avoid Tailwind's `@theme` variable chain resolving to black in light mode
- `--separator-color` overridden in `[data-theme="dark"]` for visibility

### Avatar (`avatar.tsx`) + `AvatarGroup`
- `color` prop: `default` | `primary` | `green` | `amber` | `sky` | `red` | `slate` | `auto`
- `color="auto"` uses a deterministic hash on the `fallback` string — same name always gets same color
- `status` prop: `online` | `offline` | `busy` | `away` — renders a colored dot at bottom-right
- **Status dot positioning fix**: outer span is `rounded-full` (no `overflow-hidden`) so the dot overlaps the avatar edge; inner span wraps content with `overflow-hidden rounded-full`
- `AvatarGroup` stacks avatars with negative spacing and `ring-2 ring-background` separation; `max` prop caps visible count with `+N` overflow avatar

---

## Dark mode infrastructure

Added to `apps/docs/src/app/globals.css`:
```css
@variant dark (&:where([data-theme="dark"], [data-theme="dark"] *));
```
This makes all `dark:` Tailwind utilities respond to `[data-theme="dark"]` (the project's toggle mechanism) instead of the default `.dark` class.

---

## Color naming audit — semantic → descriptive

Reviewed all components with `color` props. Renamed variants where the semantic state term doesn't fit the component's context:

| Component | Changed | Kept |
|---|---|---|
| **Avatar** | `success`→`green`, `warning`→`amber`, `info`→`sky`, `destructive`→`red`, `neutral`→`slate` | `default`, `primary` |
| **Spinner** | `success`→`green`, `warning`→`amber`, `info`→`sky`, `destructive`→`red` | `default`, `current`, `neutral`, `white` |
| **Checkbox** | `destructive`→`error` | `default`, `success`, `warning`, `info` |
| **RadioGroup** | `destructive`→`error` | `default`, `success`, `warning`, `info` |
| **Switch** | `destructive`→`error` | `default`, `success`, `warning`, `info` |

Components kept with semantic names (appropriate context): Button, Badge, Alert, Card `status` prop, AlertDialog.

Rationale: Avatar/Spinner colors are purely visual — "what color should this be?" not "what state does this represent?". Form element validation uses `error` (matches existing `error` boolean prop pattern). Action/notification components keep semantic terms since they describe intent or state.

---

## Registry files added

- `packages/registry/components/spinner.json`
- `packages/registry/components/skeleton.json`
- `packages/registry/components/separator.json`
- `packages/registry/components/avatar.json`

All four entries added to `packages/registry/index.json`.

---

## Accordion (`accordion.tsx`)

Date: 2026-05-20

- Built on `@radix-ui/react-accordion` primitives
- `variant` prop: `default` (bordered card stack) | `ghost` (flush, no borders)
- Exports: `Accordion`, `AccordionItem`, `AccordionTrigger`, `AccordionContent`
- `AccordionProps` is a discriminated union (`type: 'single' | 'multiple'`) matching Radix's API
- Type aliases (not interfaces) used to avoid TS2312 — Radix Root props are themselves a union, interfaces cannot extend unions
- `AccordionSingleProps` / `AccordionMultipleProps` both intersect `React.HTMLAttributes<HTMLDivElement>` so destructuring works
- `AccordionContext` passes variant down to children to style trigger/content without prop drilling

---

## tsup watch mode race condition fix

Date: 2026-05-20

- `clean: true` in tsup deleted `packages/ui/dist/` on every watch startup
- Turbo runs `packages/ui dev` and `apps/docs dev` in parallel (no `dependsOn` for dev tasks)
- If Next.js resolved `@tokiui/ui` during the ~200ms clean window it cached the failure → all pages 500
- **Fix:** `clean: !options.watch` in `packages/ui/tsup.config.ts`
- If you still see 500s after restart: delete `apps/docs/.next` to clear stale compiled output

---

## Phase B Tier 1 status

| Component | Status |
|---|---|
| Alert / Banner | ✅ Done (Phase A) |
| Spinner | ✅ Done |
| Skeleton | ✅ Done |
| Separator | ✅ Done |
| Avatar | ✅ Done |
| Accordion | ✅ Done |
| Progress | Pending |
