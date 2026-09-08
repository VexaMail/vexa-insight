import type { ReactNode } from 'react'

// The login page is a client component, where route segment config is
// ignored; this server layout forces request-time rendering so the CSP
// nonce applies.
export const dynamic = 'force-dynamic'

export default async function LoginLayout({
  children,
}: {
  children: ReactNode
}) {
  return children
}
