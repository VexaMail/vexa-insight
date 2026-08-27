import { NextRequest, type NextResponse } from 'next/server'
import { checkInstall } from './src/services/install/checkInstall'
import { applyProdCspHeaders } from './src/utils/proxy/applyProdCspHeaders'
import { checkAuth } from './src/utils/proxy/checkAuth'
import { getAllowedOriginForwardedHost } from './src/utils/proxy/getAllowedOriginForwardedHost'

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

  const installResponse = await checkInstall(request)
  if (installResponse) return installResponse

  const authResponse = checkAuth(request)
  if (authResponse) return authResponse

  return applyProdCspHeaders(request)
}

export const config = {
  matcher: [
    '/((?!api|_next|favicon\\.ico|manifest\\.webmanifest|robots\\.txt|sitemap\\.xml|.*\\.(?:png|jpe?g|gif|webp|avif|svg|ico|css|js|map|woff2?|ttf|otf|eot|txt|xml|json|webmanifest)).*)',
  ],
}
