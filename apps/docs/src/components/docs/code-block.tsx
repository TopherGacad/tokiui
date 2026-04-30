import { CopyButton } from './copy-button'

interface CodeBlockProps {
  children: string
  className?: string
}

export function CodeBlock({ children, className }: CodeBlockProps) {
  return (
    <div className={`code-block${className ? ` ${className}` : ''}`}>
      <CopyButton text={children} className="code-block__copy" />
      <pre>{children}</pre>
    </div>
  )
}
