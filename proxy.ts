import type { NextRequest, NextResponse } from 'next/server'
import { checkInstall } from './src/services/install/checkInstall'
import { applyProdCspHeaders } from './src/utils/proxy/applyProdCspHeaders'
import { checkAuth } from './src/utils/proxy/checkAuth'

export async function proxy(request: NextRequest): Promise<NextResponse> {
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
