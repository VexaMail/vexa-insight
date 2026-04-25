import { ThemeProvider } from '@/components/shell'
import { Toaster } from 'sonner'

import { siteMetadata } from '../lib/config/siteMetadata'
import './globals.css'

import { inter } from './inter'
import { spaceGrotesk } from './spaceGrotesk'

export const metadata = siteMetadata

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${inter.variable} ${spaceGrotesk.variable} antialiased`}
      >
        <ThemeProvider>{children}</ThemeProvider>
        <Toaster richColors position="top-right" />
      </body>
    </html>
  )
}
