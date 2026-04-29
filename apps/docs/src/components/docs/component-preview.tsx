import { cn } from '@/lib/utils'

interface ComponentPreviewProps {
  children: React.ReactNode
  className?: string
}

export function ComponentPreview({ children, className }: ComponentPreviewProps) {
  return (
    <div
      className={cn(
        'flex min-h-[160px] items-center justify-center rounded-lg border bg-background p-8',
        className
      )}
    >
      {children}
    </div>
  )
}
