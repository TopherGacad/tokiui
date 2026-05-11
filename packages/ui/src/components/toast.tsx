'use client'

import { useEffect, useState } from 'react'
import { Toaster as SonnerToaster } from 'sonner'

export { toast } from 'sonner'
export type { ExternalToast } from 'sonner'

type ToasterProps = Omit<React.ComponentProps<typeof SonnerToaster>, 'theme'>

export function Toaster({ ...props }: ToasterProps) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    function sync() {
      setTheme(
        document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light'
      )
    }
    sync()
    const observer = new MutationObserver(sync)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    })
    return () => observer.disconnect()
  }, [])

  return (
    <SonnerToaster
      theme={theme}
      richColors
      closeButton
      {...props}
    />
  )
}
