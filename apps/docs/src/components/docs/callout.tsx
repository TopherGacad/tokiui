import type { ReactNode } from 'react'

interface CalloutProps {
  type?: 'note' | 'warning'
  children: ReactNode
}

export function Callout({ type = 'note', children }: CalloutProps) {
  return (
    <div className={`callout${type === 'warning' ? ' callout--warning' : ''}`}>
      <span className="callout__icon" aria-hidden="true">
        {type === 'warning' ? '⚠' : 'ℹ'}
      </span>
      <div>{children}</div>
    </div>
  )
}
