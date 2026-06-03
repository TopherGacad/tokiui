'use client'

import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from '@tokiui/ui'

/* ================================================================
   1. BASIC
   ================================================================ */

export function BreadcrumbBasicPreview() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Components</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}

/* ================================================================
   2. CUSTOM SEPARATOR
   ================================================================ */

export function BreadcrumbCustomSeparatorPreview() {
  return (
    <div className="flex flex-col gap-4">
      {/* slash */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>/</BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Settings</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>/</BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbPage>Profile</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* dot */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>·</BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Blog</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>·</BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbPage>Article</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  )
}

/* ================================================================
   3. WITH ELLIPSIS
   ================================================================ */

export function BreadcrumbEllipsisPreview() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbEllipsis />
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Components</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}

/* ================================================================
   4. REAL-WORLD: SETTINGS PAGE
   ================================================================ */

export function BreadcrumbSettingsPreview() {
  return (
    <div className="w-full max-w-lg rounded-xl border bg-card p-5 dark:border-white/10 dark:bg-[oklch(0.26_0.005_95)]">
      <Breadcrumb className="mb-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Account</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Notifications</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h2 className="text-base font-semibold">Notification preferences</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Control which emails and in-app alerts you receive.
      </p>
    </div>
  )
}

/* ================================================================
   5. REAL-WORLD: E-COMMERCE PRODUCT PAGE
   ================================================================ */

export function BreadcrumbProductPreview() {
  return (
    <div className="w-full max-w-lg rounded-xl border bg-card p-5 dark:border-white/10 dark:bg-[oklch(0.26_0.005_95)]">
      <Breadcrumb className="mb-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Shop</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Electronics</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Laptops</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Studio Pro 15</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="space-y-0.5">
        <p className="text-xs text-muted-foreground">SKU: LAP-4821</p>
        <h2 className="text-base font-semibold">Studio Pro 15</h2>
        <p className="text-xl font-bold">$1,299.00</p>
      </div>
    </div>
  )
}
