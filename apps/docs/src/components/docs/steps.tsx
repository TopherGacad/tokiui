import type { ReactNode } from 'react'

export function Steps({ children }: { children: ReactNode }) {
  return <div className="steps">{children}</div>
}

export function Step({
  number,
  title,
  children,
}: {
  number: number
  title: string
  children: ReactNode
}) {
  return (
    <div className="step">
      <div className="step__left">
        <span className="step__num">{number}</span>
        <span className="step__line" aria-hidden="true" />
      </div>
      <div className="step__body">
        <h3 className="step__title">{title}</h3>
        <div className="step__content">{children}</div>
      </div>
    </div>
  )
}
