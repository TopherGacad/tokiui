'use client'

import { Separator } from '@tokiui/ui'

/* ================================================================
   1. HORIZONTAL
   ================================================================ */

export function SeparatorHorizontalPreview() {
  return (
    <div className="w-full max-w-sm space-y-3 rounded-xl border bg-card dark:border-white/10 dark:bg-[oklch(0.26_0.005_95)] p-5">
      <p className="text-sm">Section one content goes here.</p>
      <Separator />
      <p className="text-sm">Section two content goes here.</p>
    </div>
  )
}

/* ================================================================
   2. VERTICAL
   ================================================================ */

export function SeparatorVerticalPreview() {
  return (
    <div className="flex items-center gap-4 text-sm">
      <span>Home</span>
      <Separator orientation="vertical" className="h-4" />
      <span>About</span>
      <Separator orientation="vertical" className="h-4" />
      <span>Blog</span>
      <Separator orientation="vertical" className="h-4" />
      <span>Contact</span>
    </div>
  )
}

/* ================================================================
   3. WITH LABEL
   ================================================================ */

export function SeparatorWithLabelPreview() {
  return (
    <div className="flex flex-col gap-4 w-full max-w-sm">
      <div className="flex items-center gap-3">
        <Separator className="flex-1" />
        <span className="text-xs text-muted-foreground shrink-0">OR</span>
        <Separator className="flex-1" />
      </div>
      <div className="flex items-center gap-3">
        <Separator className="flex-1" />
        <span className="text-xs font-medium text-muted-foreground shrink-0">Continue with</span>
        <Separator className="flex-1" />
      </div>
    </div>
  )
}

/* ================================================================
   4. IN A LIST
   ================================================================ */

export function SeparatorListPreview() {
  const items = ['Profile', 'Settings', 'Billing', 'Log out']
  return (
    <div className="w-56 overflow-hidden rounded-xl border bg-card dark:border-white/10 dark:bg-[oklch(0.26_0.005_95)]">
      {items.map((item, i) => (
        <div key={item}>
          <div className="px-4 py-2.5 text-sm hover:bg-accent cursor-pointer">{item}</div>
          {i < items.length - 1 && <Separator />}
        </div>
      ))}
    </div>
  )
}

/* ================================================================
   5. CARD SECTION  (real-world usage)
   ================================================================ */

export function SeparatorCardSectionPreview() {
  return (
    <div className="w-full max-w-sm overflow-hidden rounded-xl border bg-card dark:border-white/10 dark:bg-[oklch(0.26_0.005_95)]">
      <div className="px-5 py-4">
        <p className="font-medium">Account details</p>
        <p className="mt-0.5 text-sm text-muted-foreground">Manage your account settings.</p>
      </div>
      <Separator />
      <div className="flex flex-col gap-3 px-5 py-4">
        {[
          ['Name', 'Alex Johnson'],
          ['Email', 'alex@example.com'],
          ['Plan', 'Pro'],
        ].map(([label, value]) => (
          <div key={label} className="flex justify-between text-sm">
            <span className="text-muted-foreground">{label}</span>
            <span>{value}</span>
          </div>
        ))}
      </div>
      <Separator />
      <div className="flex justify-end gap-2 px-5 py-3">
        <button className="rounded-md px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground">
          Cancel
        </button>
        <button className="rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground">
          Save changes
        </button>
      </div>
    </div>
  )
}
