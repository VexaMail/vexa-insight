import { ThemeProvider } from '@/components/shell'
import { Toaster } from 'sonner'
import ThemeScript from './ThemeScript'

import { siteMetadata } from '../src/lib/config/siteMetadata'
import './globals.css'

import { geist } from './geist'
import { geistMono } from './geistMono'

export const metadata = siteMetadata

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body
        suppressHydrationWarning
        className={`${geist.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>{children}</ThemeProvider>
        <Toaster richColors position="top-right" />
      </body>
    </html>
  )
}
