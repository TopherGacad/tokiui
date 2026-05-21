'use client'

import * as React from 'react'
import * as AccordionPrimitive from '@radix-ui/react-accordion'
import { cva } from 'class-variance-authority'
import { cn } from '../lib/utils'

// ── Variants ──────────────────────────────────────────────────────

const accordionVariants = cva('w-full', {
  variants: {
    variant: {
      default:   'rounded-xl border border-border bg-card divide-y divide-border overflow-hidden',
      separated: 'flex flex-col gap-2',
      flush:     'divide-y divide-border',
    },
  },
  defaultVariants: { variant: 'default' },
})

const accordionItemVariants = cva('', {
  variants: {
    variant: {
      default:   'transition-all duration-150 data-[state=open]:shadow-[inset_3px_0_0_var(--primary)]',
      separated: 'rounded-xl border border-border bg-card overflow-hidden transition-[box-shadow,border-color] duration-150 data-[state=open]:shadow-lg data-[state=open]:border-primary/50',
      flush:     'transition-all duration-150 data-[state=open]:bg-muted data-[state=open]:shadow-[inset_3px_0_0_var(--primary)]',
    },
  },
  defaultVariants: { variant: 'default' },
})

// ── Context ───────────────────────────────────────────────────────

type AccordionVariant = 'default' | 'separated' | 'flush'
const AccordionContext = React.createContext<AccordionVariant>('default')

// ── Accordion ────────────────────────────────────────────────────

export type AccordionSingleProps = React.HTMLAttributes<HTMLDivElement> & {
  type: 'single'
  collapsible?: boolean
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  disabled?: boolean
  dir?: 'ltr' | 'rtl'
  variant?: AccordionVariant
}

export type AccordionMultipleProps = React.HTMLAttributes<HTMLDivElement> & {
  type: 'multiple'
  value?: string[]
  defaultValue?: string[]
  onValueChange?: (value: string[]) => void
  disabled?: boolean
  dir?: 'ltr' | 'rtl'
  variant?: AccordionVariant
}

export type AccordionProps = AccordionSingleProps | AccordionMultipleProps

const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
  (allProps, ref) => {
    const { className, variant = 'default', ...props } = allProps as AccordionSingleProps
    return (
      <AccordionContext.Provider value={variant}>
        <AccordionPrimitive.Root
          ref={ref}
          className={cn(accordionVariants({ variant }), className)}
          {...(props as any)}
        />
      </AccordionContext.Provider>
    )
  }
)
Accordion.displayName = 'Accordion'

// ── AccordionItem ────────────────────────────────────────────────

export interface AccordionItemProps
  extends React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item> {}

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  AccordionItemProps
>(({ className, ...props }, ref) => {
  const variant = React.useContext(AccordionContext)
  return (
    <AccordionPrimitive.Item
      ref={ref}
      className={cn(accordionItemVariants({ variant }), className)}
      {...props}
    />
  )
})
AccordionItem.displayName = 'AccordionItem'

// ── AccordionTrigger ─────────────────────────────────────────────

export interface AccordionTriggerProps
  extends React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger> {}

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  AccordionTriggerProps
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        'flex flex-1 items-center justify-between px-4 py-3 text-sm font-medium cursor-pointer',
        'text-left transition-colors duration-150',
        'hover:bg-muted',
        'data-[state=open]:text-primary',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset',
        '[&[data-state=open]>svg]:rotate-180',
        className
      )}
      {...props}
    >
      {children}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="shrink-0 text-muted-foreground transition-transform duration-200 ml-2 [[data-state=open]_&]:text-primary"
        aria-hidden="true"
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
))
AccordionTrigger.displayName = 'AccordionTrigger'

// ── AccordionContent ─────────────────────────────────────────────

export interface AccordionContentProps
  extends React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content> {}

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  AccordionContentProps
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden text-sm data-[state=closed]:animate-[accordion-up_0.2s_ease-out] data-[state=open]:animate-[accordion-down_0.2s_ease-out]"
    {...props}
  >
    <div className={cn('border-t border-border/40 px-4 pb-4 pt-2 text-muted-foreground leading-relaxed', className)}>
      {children}
    </div>
  </AccordionPrimitive.Content>
))
AccordionContent.displayName = 'AccordionContent'

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
