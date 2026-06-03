# Phase B Tier 2 — Stepper

Date: 2026-06-01

---

## Stepper (`stepper.tsx`)

First Tier 2 component. No Radix UI primitive — built from scratch using React context.

### Architecture

Two context layers:
- `StepperContext` — shared across the whole stepper: `step` (current active step) and `orientation`
- `StepItemContext` — per-item: `index` and derived `status` (`complete | active | incomplete`)

### Components

- `Stepper` — root `div`, provides context, `flex-row` or `flex-col` based on orientation
- `StepperItem` — wraps one step, derives its status from current step vs its own index
- `StepperIndicator` — circle showing number, checkmark (complete), or custom `icon` prop
- `StepperContent` — flex column wrapper for title + description
- `StepperTitle` — `<p>` that dims to `muted-foreground` when incomplete
- `StepperDescription` — `<p>` always muted
- `StepperSeparator` — connecting line; `flex-1 h-0.5` horizontal or `w-0.5` vertical; filled with `bg-primary` when the parent item is complete

### Separator placement

The separator goes between `StepperItem` elements (not inside them) using `React.Fragment` in the demo. It inherits the prior item's completion status via `StepItemContext`, so it fills when step N is complete.

### Docs

Four demos:
1. Basic horizontal with next/back controls
2. Vertical orientation
3. Custom icons (user, credit card, shield-check SVGs)
4. Onboarding wizard — indicator-only stepper with step content panels below
