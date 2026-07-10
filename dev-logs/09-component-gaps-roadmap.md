# Component Gaps & Roadmap

Captured after comparing tokiui against Material UI, DaisyUI, and Bootstrap.
Do not work on Phase B/C until Phase A is stable and release-ready.

---

## Phase A — Existing component improvements

### Completed
- **Semantic color tokens** — `--success`, `--warning`, `--info` (+ foreground, soft, soft-hover) added to `styles.css` and `@theme`
- **Build pipeline** — `'use client'` banner added to tsup so all hooks in bundled output work correctly
- **Form composition** — `FormField`, `FormLabel`, `FormHelperText`, `FormMessage` added as `form.tsx`
- **Button** — `success`/`warning`/`info` color variants across all 5 variants; `loading` prop with spinner; `startIcon`/`endIcon` slots
- **Input** — `size` (sm/default/lg), `startIcon`, `endIcon`, `error` state, `clearable` + `onClear`, password visibility toggle
- **Badge** — `variant` (solid/soft/outline), `color` (default/secondary/destructive/success/warning/info), `size` (sm/md/lg), `dot` indicator, `onDismiss` with × button
- **Tabs** — `variant` prop on `TabsList`/`TabsTrigger` (pills/line/card); `icon` and `badge` slots on `TabsTrigger`
- **Card** — `shadow` variants, `status` border (success/warning/info/destructive), `interactive` hover/lift, `CardImage` with `aspectRatio`

### Completed — component improvements (Phase A session 2)

- **Checkbox** — `size` (sm/default/lg), `color` (default/success/warning/info/destructive), `error` prop; proportionally scaled SVG check/dash icons
- **RadioGroup** — `size`, `color`, `error` via React context; `orientation` (vertical/horizontal); context-based inheritance so props set once on `<RadioGroup>` propagate to all `<RadioGroupItem>`
- **Select** — `size` (sm/default/lg), `error` prop, `clearable`/`onClear` with absolute-positioned clear button; fixed `focus:ring` → `focus-visible:ring`
- **Textarea** — `size` (sm/default/lg), `error` prop, `showCount`/`maxLength` character counter (shows `n / max`, turns destructive at limit); `autoResize` retained
- **Switch** — `color` variants (default/success/warning/info/destructive); `SwitchField` composition helper (label + description + switch in one row)
- **Tooltip** — `closeDelay` prop; `arrow` prop on `TooltipContent`; `size` (sm/default) on `TooltipContent`
- **Dialog** — `fullscreenMobile` prop (bottom-sheet on mobile, centered on desktop); `scrollBehavior` (outside/inside); fixed close button to `focus-visible`
- **AlertDialog** — `level` prop on `AlertDialogContent` (colored border-top for destructive/warning/info); `loading` + `color` props on `AlertDialogAction`
- **DropdownMenu** — `icon` and `description` slots on `DropdownMenuItem` and `DropdownMenuSubTrigger`
- **Sheet** — `size` prop (sm/default/lg/xl/full) on `SheetContent` for left/right sides

### Completed — global gaps

- **`prefers-reduced-motion`** — `@media (prefers-reduced-motion: reduce)` block added to `styles.css`; all animations skip for users who prefer reduced motion
- **Button group** — `ButtonGroup` component: connected buttons with collapsed borders, correct radius on first/last, elevated focus ring
- **Full-width button** — `fullWidth` boolean prop on `Button`
- **Focus ring audit** — fixed remaining `focus:ring` → `focus-visible:ring` across Dialog, Select, Tooltip

### Completed — new components (moved up from Phase B)

- **Alert / Banner** — `alert.tsx`; `variant` (default/success/warning/info/destructive); `title`, `icon` slot, `onDismiss`; auto-icons per variant; inline feedback pattern
- **FormError** — form-level error banner in `form.tsx`; wraps `Alert` with `variant="destructive"`

---

### Remaining — not yet done

- [ ] RTL support — directional components (Sheet sides, DropdownMenu, Select) need logical CSS properties (deferred, English/European only for now)

---

### Completed — final Phase A items (2026-05-07)

- **CheckboxGroup** — context-based group (`size`, `color`, `error`, `orientation`); individual `Checkbox` reads context then allows per-item prop override; `'use client'` added to checkbox.tsx
- **RadioGroupItem individual color override** — already implemented via `sizeProp ?? ctx.size` / `colorProp ?? ctx.color` pattern, confirmed working
- **Alert/Banner** — built in `alert.tsx` (was listed as missing, now done)
- **FormError** — built in `form.tsx`, wraps Alert with `variant="destructive"`
- **AlertDialog action loading state** — `loading` + `color` props on `AlertDialogAction`

### Resolved — feedback & state handling

**Toast feedback patterns**
- `richColors` is enabled in `Toaster` — uses Sonner's built-in green/red/amber/blue palette, not our OKLCH tokens. This is by design; Sonner does not read CSS custom properties for `richColors`. Exact brand color matching requires per-toast `style` overrides via Sonner's `toastOptions`.
- Usage: `toast.success('Saved')`, `toast.error('Failed')`, `toast.warning('Heads up')`, `toast.info('Note')`

**Select async loading** — deferred to Phase B (Combobox covers this properly)

---

## Phase B — Missing components to add

Priority order based on adoption impact.

### Tier 1 — Critical (most apps need these immediately)

| Component | Why |
|---|---|
| **Alert / Banner** | Inline success/error/warning/info feedback — most common feedback pattern |
| Accordion | Top-5 most-used UI pattern; completely absent |
| Spinner / Loader | Standalone loading indicator; unblocks loading state story |
| Skeleton | Placeholder loading states; every async UI needs it |
| Separator / Divider | Tiny but used constantly |
| Progress | Loading bars and step completion indicators |
| Avatar | Needed in almost every social/user-centric UI |

### Tier 2 — Navigation & structure

| Component | Why |
|---|---|
| Breadcrumb | Standard navigation pattern; every routed app |
| Pagination | Every list/table needs it |
| Stepper | Multi-step flows (onboarding, checkout, forms) |
| Navigation Menu | Hierarchical nav |
| Sidebar | Layout component |

### Tier 3 — Advanced form inputs

| Component | Why |
|---|---|
| Combobox / Autocomplete | Most-requested missing form control |
| Date Picker / Calendar | Almost every app needs date input |
| Slider / Range | Common for settings, filters, price ranges |
| Input OTP | Verification flows |
| Rating | Product/review UIs |

### Tier 4 — Specialized / differentiators

| Component | Why |
|---|---|
| Data Table | Biggest trust signal for enterprise/data-heavy devs |
| Command Palette | Differentiator; developers specifically look for this |
| Context Menu | Right-click menus |
| Hover Card | Hover-triggered preview cards |
| Scroll Area | Custom scrollbar styling |
| Aspect Ratio | Video/image containers |
| Resizable | Draggable split panels |

### Tier 5 — Nice to have

| Component | Why |
|---|---|
| Timeline | Chronological activity/history displays |
| Stats / Metric | Dashboard number blocks |
| Chat Bubble | Messaging UIs |
| Countdown | Timers |
| Kbd | Keyboard shortcut display |

---

## Phase C — Docs & DX improvements

- [ ] Update component docs pages to show all new variants
- [ ] Add Form composition usage examples across Input, Select, Checkbox, Textarea docs
- [ ] Add Alert component doc page
- [ ] Add theming token reference for success/warning/info colors
- [ ] Live code playground (stretch goal)
