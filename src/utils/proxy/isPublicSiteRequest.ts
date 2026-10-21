import type { NextRequest } from 'next/server'

export function isPublicSiteRequest(request: NextRequest): boolean {
  const publicHost = process.env['PUBLIC_SITE_HOST'] ?? 'insight.vexamail.com'
  return (
    process.env['PUBLIC_SITE_ONLY'] === 'true' ||
    request.nextUrl.hostname === publicHost
  )
}
