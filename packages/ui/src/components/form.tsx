import * as React from 'react'
import { cn } from '../lib/utils'
import { Alert } from './alert'

const FormField = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('flex flex-col gap-1.5', className)} {...props} />
))
FormField.displayName = 'FormField'

const FormLabel = React.forwardRef<
  HTMLLabelElement,
  React.LabelHTMLAttributes<HTMLLabelElement> & { required?: boolean }
>(({ className, required, children, ...props }, ref) => (
  <label
    ref={ref}
    className={cn('text-sm font-medium text-foreground leading-none', className)}
    {...props}
  >
    {children}
    {required && (
      <span className="text-destructive ml-1" aria-hidden="true">*</span>
    )}
  </label>
))
FormLabel.displayName = 'FormLabel'

const FormHelperText = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-xs text-muted-foreground', className)}
    {...props}
  />
))
FormHelperText.displayName = 'FormHelperText'

const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  if (!children) return null
  return (
    <p
      ref={ref}
      role="alert"
      className={cn('text-xs text-destructive font-medium', className)}
      {...props}
    >
      {children}
    </p>
  )
})
FormMessage.displayName = 'FormMessage'

export interface FormErrorProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
}

const FormError = React.forwardRef<HTMLDivElement, FormErrorProps>(
  ({ title, children, ...props }, ref) => {
    if (!children && !title) return null
    return (
      <Alert ref={ref} variant="destructive" title={title} {...props}>
        {children}
      </Alert>
    )
  }
)
FormError.displayName = 'FormError'

export { FormField, FormLabel, FormHelperText, FormMessage, FormError }
