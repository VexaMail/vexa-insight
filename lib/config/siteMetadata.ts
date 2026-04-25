import type { Metadata } from 'next'

export const siteMetadata: Metadata = (() => {
  const title = 'Vexa Mail Insight'
  const description =
    'DMARC analytics dashboard with domains, reports, ingestion health, authentication diagnostics, and policy compliance.'
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'https://example.com'

  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: title,
      template: `%s | ${title}`,
    },
    description,
    applicationName: title,
    alternates: {
      canonical: '/',
    },
    openGraph: {
      type: 'website',
      title,
      description,
      url: baseUrl,
      siteName: title,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    icons: {
      icon: '/favicon.ico',
      shortcut: '/favicon.ico',
      apple: '/favicon.ico',
    },
    robots: {
      index: true,
      follow: true,
    },
  }
})()
