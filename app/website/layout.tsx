import type { PublicLayoutProps } from '@/types/public-check'
import type { Metadata } from 'next'

export { publicWebsiteViewport as viewport } from './viewport'

export const metadata: Metadata = {
  title: { absolute: 'Free domain email security check | Vexa Insight' },
  description:
    'Check SPF, DKIM, DMARC and MX records for your domain. Get a free DNS snapshot, then monitor real sending sources with Vexa Insight.',
  alternates: { canonical: 'https://insight.vexamail.com/' },
  openGraph: {
    title: 'Does your domain send trust?',
    description: 'A free email security check from Vexa Insight.',
    url: 'https://insight.vexamail.com/',
    type: 'website',
  },
}

export default function PublicWebsiteLayout({
  children,
}: Readonly<PublicLayoutProps>) {
  return <>{children}</>
}
