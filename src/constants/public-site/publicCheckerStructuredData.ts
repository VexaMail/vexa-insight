import { publicSiteUrl } from './publicSiteUrl'

export const publicCheckerStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Vexa Insight DMARC & SPF Checker',
  url: `${publicSiteUrl}/`,
  applicationCategory: 'SecurityApplication',
  operatingSystem: 'Any',
  isAccessibleForFree: true,
  description:
    'A free public DNS checker for DMARC, SPF and MX records, with discovery of common DKIM selectors.',
}
