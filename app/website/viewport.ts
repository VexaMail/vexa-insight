import type { Viewport } from 'next'

export const publicWebsiteViewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f5f8fa' },
    { media: '(prefers-color-scheme: dark)', color: '#080e16' },
  ],
}
