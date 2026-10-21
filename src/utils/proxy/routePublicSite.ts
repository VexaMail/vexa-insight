import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { publicSitePaths } from './publicSitePaths'

export function routePublicSite(
  request: NextRequest,
): NextResponse | undefined {
  const publicHost = process.env['PUBLIC_SITE_HOST'] ?? 'insight.vexamail.com'
  const publicOnly =
    process.env['PUBLIC_SITE_ONLY'] === 'true' ||
    request.nextUrl.hostname === publicHost
  const path = request.nextUrl.pathname
  if (publicOnly) {
    if (path === '/') {
      const destination = request.nextUrl.clone()
      destination.pathname = '/website'
      return NextResponse.rewrite(destination)
    }
    if (path === '/robots.txt')
      return new NextResponse('User-agent: *\nAllow: /$\nDisallow: /api/\n', {
        headers: { 'Content-Type': 'text/plain' },
      })
    if (publicSitePaths.has(path) || path.startsWith('/_next/'))
      return NextResponse.next()
    return new NextResponse('Not found', { status: 404 })
  }
  if (path === '/website' || path === '/api/public/domain-check')
    return NextResponse.next()
  return undefined
}
