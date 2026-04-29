import type { Metadata } from 'next'
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import './globals.css'

export const metadata: Metadata = {
  title: {
    template: '%s | tokiui',
    default: 'tokiui — React Component Library',
  },
  description:
    'A copy-paste React component library with a live theme playground. Built with Tailwind CSS and Radix UI.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <NuqsAdapter>{children}</NuqsAdapter>
      </body>
    </html>
  )
}
