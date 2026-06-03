'use client'

import * as React from 'react'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from '@tokiui/ui'

/* ================================================================
   1. BASIC
   ================================================================ */

export function PaginationBasicPreview() {
  const [page, setPage] = React.useState(3)
  const total = 5

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            aria-disabled={page === 1}
            onClick={(e) => { e.preventDefault(); setPage((p) => Math.max(1, p - 1)) }}
            className={page === 1 ? 'pointer-events-none opacity-50' : ''}
          />
        </PaginationItem>
        {Array.from({ length: total }, (_, i) => i + 1).map((p) => (
          <PaginationItem key={p}>
            <PaginationLink
              href="#"
              isActive={p === page}
              onClick={(e) => { e.preventDefault(); setPage(p) }}
            >
              {p}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext
            href="#"
            aria-disabled={page === total}
            onClick={(e) => { e.preventDefault(); setPage((p) => Math.min(total, p + 1)) }}
            className={page === total ? 'pointer-events-none opacity-50' : ''}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

/* ================================================================
   2. WITH ELLIPSIS
   ================================================================ */

type PageEntry = number | 'ellipsis-left' | 'ellipsis-right'

function getVisiblePages(current: number, total: number): PageEntry[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)

  const pages: PageEntry[] = [1]
  if (current > 3)         pages.push('ellipsis-left')

  const start = Math.max(2, current - 1)
  const end   = Math.min(total - 1, current + 1)
  for (let i = start; i <= end; i++) pages.push(i)

  if (current < total - 2) pages.push('ellipsis-right')
  pages.push(total)

  return pages
}

export function PaginationEllipsisPreview() {
  const [page, setPage] = React.useState(5)
  const total = 10

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e) => { e.preventDefault(); setPage((p) => Math.max(1, p - 1)) }}
            className={page === 1 ? 'pointer-events-none opacity-50' : ''}
          />
        </PaginationItem>
        {getVisiblePages(page, total).map((p) =>
          typeof p === 'string' ? (
            <PaginationItem key={p}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={p}>
              <PaginationLink
                href="#"
                isActive={p === page}
                onClick={(e) => { e.preventDefault(); setPage(p) }}
              >
                {p}
              </PaginationLink>
            </PaginationItem>
          ),
        )}
        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e) => { e.preventDefault(); setPage((p) => Math.min(total, p + 1)) }}
            className={page === total ? 'pointer-events-none opacity-50' : ''}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

/* ================================================================
   3. COMPACT
   ================================================================ */

export function PaginationCompactPreview() {
  const [page, setPage] = React.useState(1)
  const total = 12

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e) => { e.preventDefault(); setPage((p) => Math.max(1, p - 1)) }}
            className={page === 1 ? 'pointer-events-none opacity-50' : ''}
          />
        </PaginationItem>
        <PaginationItem>
          <span className="px-3 text-sm tabular-nums text-muted-foreground">
            Page {page} of {total}
          </span>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e) => { e.preventDefault(); setPage((p) => Math.min(total, p + 1)) }}
            className={page === total ? 'pointer-events-none opacity-50' : ''}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

/* ================================================================
   4. REAL-WORLD: PAGINATED LIST
   ================================================================ */

const ALL_ITEMS = [
  { id: 1,  name: 'Analytics dashboard',  status: 'Live',    updated: '2h ago'   },
  { id: 2,  name: 'Onboarding flow',      status: 'Draft',   updated: '5h ago'   },
  { id: 3,  name: 'Email templates',      status: 'Live',    updated: '1d ago'   },
  { id: 4,  name: 'API reference docs',   status: 'Review',  updated: '2d ago'   },
  { id: 5,  name: 'Settings page',        status: 'Live',    updated: '3d ago'   },
  { id: 6,  name: 'Billing portal',       status: 'Draft',   updated: '4d ago'   },
  { id: 7,  name: 'Notification center',  status: 'Live',    updated: '5d ago'   },
  { id: 8,  name: 'User permissions',     status: 'Review',  updated: '6d ago'   },
  { id: 9,  name: 'Search indexer',       status: 'Live',    updated: '1w ago'   },
  { id: 10, name: 'Export pipeline',      status: 'Draft',   updated: '1w ago'   },
  { id: 11, name: 'Audit log viewer',     status: 'Live',    updated: '2w ago'   },
  { id: 12, name: 'Webhook manager',      status: 'Review',  updated: '2w ago'   },
]

const STATUS_COLOR: Record<string, string> = {
  Live:   'text-success',
  Draft:  'text-muted-foreground',
  Review: 'text-warning',
}

const PER_PAGE = 4

export function PaginationTablePreview() {
  const [page, setPage] = React.useState(1)
  const totalPages = Math.ceil(ALL_ITEMS.length / PER_PAGE)
  const items = ALL_ITEMS.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  return (
    <div className="w-full max-w-lg space-y-3">
      <div className="rounded-xl border bg-card overflow-hidden dark:border-white/10 dark:bg-[oklch(0.26_0.005_95)]">
        {items.map((item, i) => (
          <div
            key={item.id}
            className={`flex items-center justify-between px-4 py-3 text-sm ${
              i < items.length - 1 ? 'border-b dark:border-white/5' : ''
            }`}
          >
            <span className="font-medium">{item.name}</span>
            <div className="flex items-center gap-4">
              <span className={`text-xs ${STATUS_COLOR[item.status]}`}>{item.status}</span>
              <span className="text-xs text-muted-foreground">{item.updated}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between px-1">
        <p className="text-xs text-muted-foreground tabular-nums">
          {(page - 1) * PER_PAGE + 1}–{Math.min(page * PER_PAGE, ALL_ITEMS.length)} of {ALL_ITEMS.length}
        </p>
        <Pagination className="w-auto justify-end">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => { e.preventDefault(); setPage((p) => Math.max(1, p - 1)) }}
                className={page === 1 ? 'pointer-events-none opacity-50' : ''}
              />
            </PaginationItem>
            {getVisiblePages(page, totalPages).map((p) =>
              typeof p === 'string' ? (
                <PaginationItem key={p}>
                  <PaginationEllipsis />
                </PaginationItem>
              ) : (
                <PaginationItem key={p}>
                  <PaginationLink
                    href="#"
                    size="sm"
                    isActive={p === page}
                    onClick={(e) => { e.preventDefault(); setPage(p) }}
                  >
                    {p}
                  </PaginationLink>
                </PaginationItem>
              ),
            )}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => { e.preventDefault(); setPage((p) => Math.min(totalPages, p + 1)) }}
                className={page === totalPages ? 'pointer-events-none opacity-50' : ''}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  )
}
