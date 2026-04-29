import { cn } from '@/lib/utils'

interface CodeBlockProps {
  children: React.ReactNode
  className?: string
}

export function CodeBlock({ children, className }: CodeBlockProps) {
  return (
    <div className={cn('relative rounded-lg border bg-muted/50 p-4', className)}>
      <pre className="overflow-x-auto text-sm">{children}</pre>
    </div>
  )
}
