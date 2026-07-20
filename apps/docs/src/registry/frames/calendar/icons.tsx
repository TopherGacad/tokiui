const ic = 'size-4 shrink-0'
const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
} as const

export const ChevronLeft = () => (
  <svg className={ic} viewBox="0 0 24 24" {...stroke} aria-hidden="true"><path d="m15 18-6-6 6-6" /></svg>
)
export const ChevronRight = () => (
  <svg className={ic} viewBox="0 0 24 24" {...stroke} aria-hidden="true"><path d="m9 18 6-6-6-6" /></svg>
)
export const Plus = () => (
  <svg className={ic} viewBox="0 0 24 24" {...stroke} aria-hidden="true"><path d="M5 12h14M12 5v14" /></svg>
)
export const Clock = () => (
  <svg className={ic} viewBox="0 0 24 24" {...stroke} aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
)
export const MapPin = () => (
  <svg className={ic} viewBox="0 0 24 24" {...stroke} aria-hidden="true"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
)
export const CalendarIcon = () => (
  <svg className={ic} viewBox="0 0 24 24" {...stroke} aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>
)
