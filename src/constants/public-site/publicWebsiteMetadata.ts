import type { Metadata } from 'next'
import { publicSiteUrl } from './publicSiteUrl'

export const publicWebsiteMetadata: Metadata = {
  metadataBase: new URL(publicSiteUrl),
  title: { absolute: 'Free DMARC & SPF Checker | Vexa Insight' },
  description:
    'Check your domain’s DMARC and SPF records for free. Discover common DKIM keys and MX records, understand your published policies, and see what needs attention.',
  alternates: { canonical: `${publicSiteUrl}/` },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Free DMARC & SPF Checker | Vexa Insight',
    description:
      'Check email authentication records without an account. Public DNS evidence, explained.',
    url: publicSiteUrl,
    siteName: 'Vexa Insight',
    type: 'website',
    images: [
      {
        url: `${publicSiteUrl}/vexa-insight-dashboard-light.png`,
        alt: 'Vexa Insight dashboard with synthetic demonstration data',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free DMARC & SPF Checker | Vexa Insight',
    description:
      'Look up DMARC, SPF and MX records and discover common DKIM keys. Free, no account required.',
    images: [`${publicSiteUrl}/vexa-insight-dashboard-light.png`],
  },
}
