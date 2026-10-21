import { publicSiteUrl } from '@/constants/public-site'
import { NextResponse } from 'next/server'

export function routePublicCrawlerFiles(
  path: string,
): NextResponse | undefined {
  if (path === '/robots.txt')
    return new NextResponse(
      `User-agent: *\nAllow: /\nDisallow: /api/\nSitemap: ${publicSiteUrl}/sitemap.xml\n`,
      {
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
          'Cache-Control': 'no-cache, max-age=0, must-revalidate',
        },
      },
    )
  if (path === '/sitemap.xml')
    return new NextResponse(
      `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${publicSiteUrl}/</loc></url></urlset>`,
      {
        headers: {
          'Content-Type': 'application/xml; charset=utf-8',
          'Cache-Control': 'no-cache, max-age=0, must-revalidate',
        },
      },
    )
  return undefined
}
