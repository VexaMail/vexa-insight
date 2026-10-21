import { PublicAnalyticsConsent } from '@/components/public-site'
import type { PublicLayoutProps } from '@/types/public-check'
import { headers } from 'next/headers'

export { publicWebsiteMetadata as metadata } from '@/constants/public-site'
export { publicWebsiteViewport as viewport } from './viewport'

export default async function PublicWebsiteLayout({
  children,
}: Readonly<PublicLayoutProps>) {
  const analyticsEnabled = process.env['PUBLIC_ANALYTICS_ID'] === 'G-RDQN39NVX8'
  const nonce = (await headers()).get('x-nonce') ?? undefined
  return (
    <>
      {children}
      {analyticsEnabled ? <PublicAnalyticsConsent nonce={nonce} /> : null}
    </>
  )
}
