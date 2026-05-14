'use client'

import { Skeleton } from '@tokiui/ui'

/* ================================================================
   1. SHAPES
   ================================================================ */

export function SkeletonShapesPreview() {
  return (
    <div className="flex flex-col gap-3 w-full max-w-xs">
      <Skeleton className="h-10 w-full" />
      <Skeleton variant="text" className="w-3/4" />
      <Skeleton variant="text" className="w-1/2" />
      <Skeleton variant="circle" className="h-12 w-12" />
    </div>
  )
}

/* ================================================================
   2. ANIMATION
   ================================================================ */

export function SkeletonAnimationPreview() {
  return (
    <div className="flex flex-col gap-8 w-full max-w-xs">
      {(['pulse', 'shimmer', 'none'] as const).map((anim) => (
        <div key={anim} className="space-y-2">
          <p className="text-xs font-mono text-muted-foreground">{anim}</p>
          <Skeleton animation={anim} className="h-4 w-full" />
          <Skeleton animation={anim} className="h-4 w-4/5" />
          <Skeleton animation={anim} className="h-4 w-3/5" />
        </div>
      ))}
    </div>
  )
}

/* ================================================================
   3. CARD
   ================================================================ */

export function SkeletonCardPreview() {
  return (
    <div className="flex flex-col gap-3 rounded-xl border bg-card dark:border-white/10 dark:bg-[oklch(0.26_0.005_95)] p-4 w-full max-w-xs">
      <Skeleton className="h-40 w-full" />
      <div className="flex flex-col gap-2">
        <Skeleton variant="text" className="w-3/4" />
        <Skeleton variant="text" className="w-full" />
        <Skeleton variant="text" className="w-2/3" />
      </div>
      <div className="flex gap-2 pt-1">
        <Skeleton className="h-9 w-24" />
        <Skeleton className="h-9 w-20" />
      </div>
    </div>
  )
}

/* ================================================================
   4. LIST
   ================================================================ */

export function SkeletonListPreview() {
  return (
    <div className="flex flex-col gap-3 w-full max-w-sm">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="flex items-center gap-3">
          <Skeleton variant="circle" className="h-10 w-10 shrink-0" />
          <div className="flex flex-col gap-2 flex-1">
            <Skeleton variant="text" className="w-1/3" />
            <Skeleton variant="text" className="w-2/3" />
          </div>
        </div>
      ))}
    </div>
  )
}

/* ================================================================
   5. PROFILE  (real-world usage)
   ================================================================ */

export function SkeletonProfilePreview() {
  return (
    <div className="flex flex-col items-center gap-4 py-6 w-full max-w-xs text-center">
      <Skeleton variant="circle" className="h-20 w-20" />
      <div className="w-full space-y-2">
        <Skeleton variant="text" className="w-1/2 mx-auto h-5" />
        <Skeleton variant="text" className="w-full" />
        <Skeleton variant="text" className="w-3/4 mx-auto" />
      </div>
      <div className="flex w-full justify-center gap-8 pt-1">
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex flex-col items-center gap-1.5">
            <Skeleton className="h-6 w-10" />
            <Skeleton variant="text" className="w-12" />
          </div>
        ))}
      </div>
      <div className="flex gap-2 pt-1">
        <Skeleton className="h-9 w-28" />
        <Skeleton className="h-9 w-28" />
      </div>
    </div>
  )
}

/* ================================================================
   6. TABLE  (real-world usage)
   ================================================================ */

export function SkeletonTablePreview() {
  return (
    <div className="w-full max-w-lg overflow-hidden rounded-xl border bg-card dark:border-white/10 dark:bg-[oklch(0.26_0.005_95)]">
      {/* header */}
      <div className="flex items-center gap-4 border-b dark:border-white/10 px-4 py-3">
        <Skeleton className="h-3 w-32" />
        <Skeleton className="h-3 w-20 ml-auto" />
        <Skeleton className="h-3 w-16" />
        <Skeleton className="h-3 w-14" />
      </div>
      {/* rows */}
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 border-b dark:border-white/5 last:border-0 px-4 py-3">
          <Skeleton variant="circle" className="h-8 w-8 shrink-0" />
          <Skeleton variant="text" className="w-28" />
          <Skeleton className="h-5 w-16 rounded-full ml-auto" />
          <Skeleton variant="text" className="w-16" />
          <Skeleton variant="text" className="w-12" />
        </div>
      ))}
    </div>
  )
}

/* ================================================================
   7. ARTICLE
   ================================================================ */

export function SkeletonArticlePreview() {
  return (
    <div className="flex flex-col gap-4 w-full max-w-md">
      <Skeleton className="h-52 w-full" />
      <div className="flex items-center gap-2">
        <Skeleton variant="circle" className="h-8 w-8" />
        <Skeleton variant="text" className="w-32" />
        <Skeleton variant="text" className="w-20 ml-auto" />
      </div>
      <Skeleton variant="text" className="w-3/4 h-6" />
      <div className="flex flex-col gap-2">
        <Skeleton variant="text" className="w-full" />
        <Skeleton variant="text" className="w-full" />
        <Skeleton variant="text" className="w-4/5" />
      </div>
    </div>
  )
}
