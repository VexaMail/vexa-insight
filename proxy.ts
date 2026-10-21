import { NextRequest, type NextResponse } from 'next/server'
import { checkInstall } from './src/services/install/checkInstall'
import { applyProdCspHeaders } from './src/utils/proxy/applyProdCspHeaders'
import { checkAuth } from './src/utils/proxy/checkAuth'
import { getAllowedOriginForwardedHost } from './src/utils/proxy/getAllowedOriginForwardedHost'
import { protectPublicResponse } from './src/utils/proxy/protectPublicResponse'
import { routePublicSite } from './src/utils/proxy/routePublicSite'

export async function proxy(request: NextRequest): Promise<NextResponse> {
  // Server Actions from a runtime-allow-listed origin: rewrite the forwarded
  // host before anything downstream reads it, so Next's CSRF origin check
  // passes without the origin list being baked into the build.
  const forwardedHostOverride = getAllowedOriginForwardedHost(request)
  if (forwardedHostOverride) {
    const headers = new Headers(request.headers)
    headers.set('x-forwarded-host', forwardedHostOverride)
    request = new NextRequest(request, { headers })
  }

  const publicResponse = routePublicSite(request)
  if (publicResponse) return protectPublicResponse(request, publicResponse)
  if (
    request.nextUrl.pathname.startsWith('/api/') ||
    ['/robots.txt', '/sitemap.xml', '/manifest.webmanifest'].includes(
      request.nextUrl.pathname,
    )
  )
    return applyProdCspHeaders(request)

  const installResponse = await checkInstall(request)
  if (installResponse) return installResponse

  const authResponse = checkAuth(request)
  if (authResponse) return authResponse

  return applyProdCspHeaders(request)
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
