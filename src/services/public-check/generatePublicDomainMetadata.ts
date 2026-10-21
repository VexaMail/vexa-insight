import type { Metadata } from 'next'
import type { PublicDomainPageProps } from '../../types/public-check/PublicDomainPageProps'
import { normalizePublicDomain } from './normalizePublicDomain'

export async function generatePublicDomainMetadata({
  params,
}: PublicDomainPageProps): Promise<Metadata> {
  const domain = normalizePublicDomain((await params).domain ?? '')
  return {
    title: { absolute: `${domain ?? 'Domain'} email DNS check | Vexa Insight` },
    alternates: { canonical: `https://insight.vexamail.com/${domain ?? ''}` },
    openGraph: {
      title: `${domain ?? 'Domain'} email DNS check`,
      url: `https://insight.vexamail.com/${domain ?? ''}`,
    },
    robots: { index: false, follow: true },
  }
}
