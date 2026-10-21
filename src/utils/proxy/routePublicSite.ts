import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { isPublicSiteRequest } from './isPublicSiteRequest'
import { publicSitePaths } from './publicSitePaths'
import { routePublicCrawlerFiles } from './routePublicCrawlerFiles'
import { routePublicDomain } from './routePublicDomain'

export function routePublicSite(
  request: NextRequest,
): NextResponse | undefined {
  const path = request.nextUrl.pathname
  if (isPublicSiteRequest(request)) {
    if (path === '/') {
      const destination = request.nextUrl.clone()
      destination.pathname = '/website'
      return NextResponse.rewrite(destination)
    }
    const crawlerFile = routePublicCrawlerFiles(path)
    if (crawlerFile) return crawlerFile
    if (publicSitePaths.has(path) || path.startsWith('/_next/'))
      return NextResponse.next()
    return (
      routePublicDomain(request) ??
      new NextResponse('Not found', { status: 404 })
    )
  }
  if (path === '/website' || path === '/api/public/domain-check')
    return NextResponse.next()
  return undefined
}
