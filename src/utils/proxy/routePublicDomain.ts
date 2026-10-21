import { normalizePublicDomain } from '@/services/public-check'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export function routePublicDomain(
  request: NextRequest,
): NextResponse | undefined {
  const path = request.nextUrl.pathname
  const segment = path.startsWith('/website/')
    ? path.slice('/website/'.length)
    : path.slice(1)
  if (
    segment.includes('/') ||
    /\.(?:xml|txt|json|webmanifest|ico|png|svg|webp|js|css)$/i.test(segment)
  )
    return undefined
  let decoded: string
  try {
    decoded = decodeURIComponent(segment)
  } catch {
    return undefined
  }
  const domain = normalizePublicDomain(decoded)
  if (!domain) return undefined
  if (path === `/website/${domain}`) return NextResponse.next()
  const destination = request.nextUrl.clone()
  if (path !== `/${domain}`) {
    destination.pathname = `/${domain}`
    return NextResponse.redirect(destination, 308)
  }
  destination.pathname = `/website/${domain}`
  return NextResponse.rewrite(destination)
}
