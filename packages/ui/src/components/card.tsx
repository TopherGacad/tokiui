import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../lib/utils'

// ── Card ──────────────────────────────────────────────────────────────────────

const cardVariants = cva(
  'rounded-lg border bg-card text-card-foreground transition-all duration-150',
  {
    variants: {
      shadow: {
        none: '',
        sm:   'shadow-sm',
        md:   'shadow-md',
        lg:   'shadow-lg',
      },
      status: {
        none:        '',
        success:     'border-l-4 border-l-success',
        warning:     'border-l-4 border-l-warning',
        info:        'border-l-4 border-l-info',
        destructive: 'border-l-4 border-l-destructive',
      },
      interactive: {
        true:  'cursor-pointer hover:shadow-md hover:-translate-y-0.5 hover:border-border/80 active:scale-[0.99]',
        false: '',
      },
    },
    defaultVariants: {
      shadow: 'sm',
      status: 'none',
      interactive: false,
    },
  }
)

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, shadow, status, interactive, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardVariants({ shadow, status, interactive }), className)}
      {...props}
    />
  )
)
Card.displayName = 'Card'

// ── CardImage ─────────────────────────────────────────────────────────────────

export interface CardImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  aspectRatio?: '16/9' | '4/3' | '1/1' | '3/2'
}

const CardImage = React.forwardRef<HTMLDivElement, CardImageProps>(
  ({ className, aspectRatio = '16/9', alt = '', src, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('overflow-hidden rounded-t-lg', className)}
      style={{ aspectRatio }}
    >
      <img
        src={src}
        alt={alt}
        className="h-full w-full object-cover"
        {...props}
      />
    </div>
  )
)
CardImage.displayName = 'CardImage'

// ── CardHeader ────────────────────────────────────────────────────────────────

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex flex-col space-y-1.5 p-6', className)} {...props} />
  )
)
CardHeader.displayName = 'CardHeader'

// ── CardTitle ─────────────────────────────────────────────────────────────────

const CardTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn('text-xl font-semibold leading-none tracking-tight', className)}
      {...props}
    />
  )
)
CardTitle.displayName = 'CardTitle'

// ── CardDescription ───────────────────────────────────────────────────────────

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn('text-sm text-muted-foreground', className)} {...props} />
))
CardDescription.displayName = 'CardDescription'

// ── CardContent ───────────────────────────────────────────────────────────────

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
  )
)
CardContent.displayName = 'CardContent'

// ── CardFooter ────────────────────────────────────────────────────────────────

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex items-center gap-2 p-6 pt-0', className)} {...props} />
  )
)
CardFooter.displayName = 'CardFooter'

export { Card, CardImage, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
