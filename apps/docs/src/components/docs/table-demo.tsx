'use client'

import { useMemo, useState } from 'react'
import {
  Table, TableHeader, TableBody, TableRow, TableHead, TableCell,
  Badge, Checkbox, Button, cn,
  Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationNext, PaginationLink,
} from '@tokiui/ui'

type Tone = 'success' | 'warning' | 'destructive'

const BASIC: { id: string; status: string; tone: Tone; method: string; amount: string }[] = [
  { id: 'INV-1001', status: 'Paid',    tone: 'success',     method: 'Credit Card', amount: '$1,200.00' },
  { id: 'INV-1002', status: 'Pending', tone: 'warning',     method: 'PayPal',      amount: '$640.00' },
  { id: 'INV-1003', status: 'Paid',    tone: 'success',     method: 'Bank Transfer', amount: '$2,310.00' },
  { id: 'INV-1004', status: 'Overdue', tone: 'destructive', method: 'Credit Card', amount: '$180.00' },
]

export function TablePreview() {
  return (
    <div className="w-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Invoice</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Method</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {BASIC.map((r) => (
            <TableRow key={r.id}>
              <TableCell className="font-medium text-foreground">{r.id}</TableCell>
              <TableCell><Badge variant="soft" color={r.tone} size="sm">{r.status}</Badge></TableCell>
              <TableCell className="text-muted-foreground">{r.method}</TableCell>
              <TableCell className="text-right tabular-nums text-foreground">{r.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

/* ----- Interactive data table (sort + paginate + select) ----- */

type Row = { id: string; customer: string; email: string; status: string; tone: Tone; amount: number; date: string }

const ROWS: Row[] = [
  { id: '1', customer: 'Olivia Martin', email: 'olivia@example.com', status: 'Paid', tone: 'success', amount: 1200, date: '2026-06-24' },
  { id: '2', customer: 'Jackson Lee', email: 'jackson@example.com', status: 'Pending', tone: 'warning', amount: 640, date: '2026-06-23' },
  { id: '3', customer: 'Isabella Nguyen', email: 'isabella@example.com', status: 'Paid', tone: 'success', amount: 2310, date: '2026-06-23' },
  { id: '4', customer: 'William Kim', email: 'william@example.com', status: 'Overdue', tone: 'destructive', amount: 180, date: '2026-06-22' },
  { id: '5', customer: 'Sofia Davis', email: 'sofia@example.com', status: 'Paid', tone: 'success', amount: 95, date: '2026-06-22' },
  { id: '6', customer: 'Liam Brown', email: 'liam@example.com', status: 'Pending', tone: 'warning', amount: 1480, date: '2026-06-21' },
  { id: '7', customer: 'Emma Wilson', email: 'emma@example.com', status: 'Paid', tone: 'success', amount: 3200, date: '2026-06-20' },
  { id: '8', customer: 'Noah Garcia', email: 'noah@example.com', status: 'Overdue', tone: 'destructive', amount: 420, date: '2026-06-19' },
  { id: '9', customer: 'Ava Rodriguez', email: 'ava@example.com', status: 'Paid', tone: 'success', amount: 760, date: '2026-06-18' },
  { id: '10', customer: 'Ethan Clark', email: 'ethan@example.com', status: 'Pending', tone: 'warning', amount: 2050, date: '2026-06-17' },
  { id: '11', customer: 'Mia Lewis', email: 'mia@example.com', status: 'Paid', tone: 'success', amount: 540, date: '2026-06-16' },
  { id: '12', customer: 'Lucas Walker', email: 'lucas@example.com', status: 'Paid', tone: 'success', amount: 1890, date: '2026-06-15' },
]

const fmt = (n: number) => n.toLocaleString('en-US', { style: 'currency', currency: 'USD' })

type SortKey = 'amount' | 'date'

function SortIcon({ active, dir }: { active: boolean; dir: 'asc' | 'desc' }) {
  return (
    <svg
      className={cn('size-3.5 shrink-0 transition-transform', active ? 'text-foreground' : 'text-muted-foreground/40', active && dir === 'asc' && 'rotate-180')}
      viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}

export function DataTableDemo() {
  const [sortKey, setSortKey] = useState<SortKey>('date')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc')
  const [page, setPage] = useState(1)
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const pageSize = 5

  const sorted = useMemo(() => {
    return [...ROWS].sort((a, b) => {
      const av = sortKey === 'amount' ? a.amount : a.date
      const bv = sortKey === 'amount' ? b.amount : b.date
      const cmp = av < bv ? -1 : av > bv ? 1 : 0
      return sortDir === 'asc' ? cmp : -cmp
    })
  }, [sortKey, sortDir])

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize))
  const current = Math.min(page, totalPages)
  const pageRows = sorted.slice((current - 1) * pageSize, current * pageSize)

  function toggleSort(key: SortKey) {
    if (sortKey === key) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
    else { setSortKey(key); setSortDir('asc') }
  }
  function toggleRow(id: string) {
    setSelected((s) => { const n = new Set(s); if (n.has(id)) n.delete(id); else n.add(id); return n })
  }
  const allOnPage = pageRows.length > 0 && pageRows.every((r) => selected.has(r.id))
  function toggleAllOnPage() {
    setSelected((s) => {
      const n = new Set(s)
      if (allOnPage) pageRows.forEach((r) => n.delete(r.id))
      else pageRows.forEach((r) => n.add(r.id))
      return n
    })
  }

  const sortBtn = 'ml-auto inline-flex items-center gap-1 hover:text-foreground'

  return (
    <div className="w-full">
      <div className="mb-3 flex items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">
          {selected.size} of {ROWS.length} row(s) selected
        </p>
        <Button variant="outline" color="neutral" size="sm" disabled={selected.size === 0}>Export selected</Button>
      </div>

      <div className="overflow-hidden rounded-lg border border-border">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/40 hover:bg-muted/40">
              <TableHead className="w-10">
                <Checkbox checked={allOnPage} onCheckedChange={toggleAllOnPage} aria-label="Select all rows on this page" />
              </TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">
                <button type="button" onClick={() => toggleSort('amount')} className={sortBtn}>
                  Amount <SortIcon active={sortKey === 'amount'} dir={sortDir} />
                </button>
              </TableHead>
              <TableHead className="text-right">
                <button type="button" onClick={() => toggleSort('date')} className={sortBtn}>
                  Date <SortIcon active={sortKey === 'date'} dir={sortDir} />
                </button>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pageRows.map((r) => (
              <TableRow key={r.id} data-state={selected.has(r.id) ? 'selected' : undefined}>
                <TableCell>
                  <Checkbox checked={selected.has(r.id)} onCheckedChange={() => toggleRow(r.id)} aria-label={`Select ${r.customer}`} />
                </TableCell>
                <TableCell>
                  <div className="font-medium text-foreground">{r.customer}</div>
                  <div className="text-xs text-muted-foreground">{r.email}</div>
                </TableCell>
                <TableCell><Badge variant="soft" color={r.tone} size="sm">{r.status}</Badge></TableCell>
                <TableCell className="text-right tabular-nums text-foreground">{fmt(r.amount)}</TableCell>
                <TableCell className="whitespace-nowrap text-right text-muted-foreground">{r.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="mt-3 flex items-center justify-between gap-3">
        <p className="text-xs text-muted-foreground">Page {current} of {totalPages}</p>
        <Pagination className="mx-0 w-auto justify-end">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" aria-disabled={current === 1} onClick={(e) => { e.preventDefault(); setPage(Math.max(1, current - 1)) }} />
            </PaginationItem>
            {Array.from({ length: totalPages }).map((_, i) => (
              <PaginationItem key={i}>
                <PaginationLink href="#" isActive={current === i + 1} onClick={(e) => { e.preventDefault(); setPage(i + 1) }}>{i + 1}</PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext href="#" aria-disabled={current === totalPages} onClick={(e) => { e.preventDefault(); setPage(Math.min(totalPages, current + 1)) }} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  )
}

/* ----- Parts reference ----- */
const PARTS = [
  { name: 'Table', desc: 'The <table> wrapped in a horizontally-scrollable container.' },
  { name: 'TableHeader', desc: 'The <thead>. Bottom border under its row(s).' },
  { name: 'TableBody', desc: 'The <tbody>. Removes the border on the last row.' },
  { name: 'TableFooter', desc: 'The <tfoot> for totals — muted background, top border.' },
  { name: 'TableRow', desc: 'A <tr> with hover + data-[state=selected] styling.' },
  { name: 'TableHead', desc: 'A header cell <th> — muted, left-aligned.' },
  { name: 'TableCell', desc: 'A body cell <td>.' },
  { name: 'TableCaption', desc: 'A <caption> rendered below the table.' },
] as const

export function TablePartsTable() {
  return (
    <div className="props">
      {PARTS.map((p) => (
        <div className="props__row" key={p.name}>
          <div className="props__l"><span className="props__name">{p.name}</span></div>
          <div className="props__r"><span className="props__desc">{p.desc}</span></div>
        </div>
      ))}
    </div>
  )
}
