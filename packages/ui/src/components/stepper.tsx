'use client'

import * as React from 'react'
import { cn } from '../lib/utils'

// ── Types ─────────────────────────────────────────────────────────

type StepStatus = 'complete' | 'active' | 'incomplete'
type Orientation = 'horizontal' | 'vertical'

// ── Context ───────────────────────────────────────────────────────

interface StepperCtx {
  step: number
  orientation: Orientation
}

const StepperContext = React.createContext<StepperCtx>({
  step: 1,
  orientation: 'horizontal',
})

interface StepItemCtx {
  index: number
  status: StepStatus
}

const StepItemContext = React.createContext<StepItemCtx>({
  index: 1,
  status: 'incomplete',
})

// ── Stepper ───────────────────────────────────────────────────────

export interface StepperProps extends React.HTMLAttributes<HTMLDivElement> {
  step: number
  orientation?: Orientation
}

const Stepper = React.forwardRef<HTMLDivElement, StepperProps>(
  ({ step, orientation = 'horizontal', className, children, ...props }, ref) => (
    <StepperContext.Provider value={{ step, orientation }}>
      <div
        ref={ref}
        data-orientation={orientation}
        className={cn(
          'flex',
          orientation === 'horizontal' ? 'flex-row items-center' : 'flex-col',
          className,
        )}
        {...props}
      >
        {children}
      </div>
    </StepperContext.Provider>
  ),
)
Stepper.displayName = 'Stepper'

// ── StepperItem ───────────────────────────────────────────────────

export interface StepperItemProps extends React.HTMLAttributes<HTMLDivElement> {
  step: number
}

const StepperItem = React.forwardRef<HTMLDivElement, StepperItemProps>(
  ({ step, className, children, ...props }, ref) => {
    const { step: current, orientation } = React.useContext(StepperContext)
    const status: StepStatus =
      step < current ? 'complete' : step === current ? 'active' : 'incomplete'

    return (
      <StepItemContext.Provider value={{ index: step, status }}>
        <div
          ref={ref}
          data-status={status}
          className={cn(
            'group/step flex shrink-0 items-center',
            orientation === 'horizontal' ? 'flex-row gap-2' : 'flex-row gap-3',
            className,
          )}
          {...props}
        >
          {children}
        </div>
      </StepItemContext.Provider>
    )
  },
)
StepperItem.displayName = 'StepperItem'

// ── StepperIndicator ──────────────────────────────────────────────

export interface StepperIndicatorProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode
}

const StepperIndicator = React.forwardRef<HTMLDivElement, StepperIndicatorProps>(
  ({ className, icon, ...props }, ref) => {
    const { index, status } = React.useContext(StepItemContext)

    return (
      <div
        ref={ref}
        aria-hidden="true"
        className={cn(
          'flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 text-sm font-semibold transition-all duration-200',
          status === 'complete'   && 'border-primary bg-primary text-primary-foreground',
          status === 'active'     && 'border-primary bg-primary text-primary-foreground shadow-md',
          status === 'incomplete' && 'border-border bg-background text-muted-foreground',
          className,
        )}
        {...props}
      >
        {status === 'complete' ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-4"
            aria-hidden="true"
          >
            <path d="M20 6 9 17l-5-5" />
          </svg>
        ) : (
          icon ?? index
        )}
      </div>
    )
  },
)
StepperIndicator.displayName = 'StepperIndicator'

// ── StepperContent ────────────────────────────────────────────────

export interface StepperContentProps extends React.HTMLAttributes<HTMLDivElement> {}

const StepperContent = React.forwardRef<HTMLDivElement, StepperContentProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex flex-col gap-0.5', className)} {...props} />
  ),
)
StepperContent.displayName = 'StepperContent'

// ── StepperTitle ──────────────────────────────────────────────────

export interface StepperTitleProps extends React.HTMLAttributes<HTMLParagraphElement> {}

const StepperTitle = React.forwardRef<HTMLParagraphElement, StepperTitleProps>(
  ({ className, ...props }, ref) => {
    const { status } = React.useContext(StepItemContext)
    return (
      <p
        ref={ref}
        className={cn(
          'text-sm font-medium leading-none',
          status === 'incomplete' ? 'text-muted-foreground' : 'text-foreground',
          className,
        )}
        {...props}
      />
    )
  },
)
StepperTitle.displayName = 'StepperTitle'

// ── StepperDescription ────────────────────────────────────────────

export interface StepperDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

const StepperDescription = React.forwardRef<HTMLParagraphElement, StepperDescriptionProps>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn('text-xs text-muted-foreground', className)} {...props} />
  ),
)
StepperDescription.displayName = 'StepperDescription'

// ── StepperSeparator ──────────────────────────────────────────────

export interface StepperSeparatorProps extends React.HTMLAttributes<HTMLDivElement> {}

const StepperSeparator = React.forwardRef<HTMLDivElement, StepperSeparatorProps>(
  ({ className, ...props }, ref) => {
    const { orientation } = React.useContext(StepperContext)
    const { status } = React.useContext(StepItemContext)

    return (
      <div
        ref={ref}
        aria-hidden="true"
        className={cn(
          'transition-colors duration-300',
          orientation === 'horizontal' ? 'h-0.5 flex-1 min-w-8' : 'w-0.5 flex-1 min-h-6 ml-4',
          status === 'complete' ? 'bg-primary' : 'bg-border',
          className,
        )}
        {...props}
      />
    )
  },
)
StepperSeparator.displayName = 'StepperSeparator'

export {
  Stepper,
  StepperItem,
  StepperIndicator,
  StepperContent,
  StepperTitle,
  StepperDescription,
  StepperSeparator,
}
