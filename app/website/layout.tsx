import type { PublicLayoutProps } from '@/types/public-check'

export { publicWebsiteMetadata as metadata } from '@/constants/public-site'
export { publicWebsiteViewport as viewport } from './viewport'

export default function PublicWebsiteLayout({
  children,
}: Readonly<PublicLayoutProps>) {
  return <>{children}</>
}
