import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { checkInstall } from './services/install/checkInstall'
import { checkAuth } from './utils/proxy/checkAuth'

export async function proxy(request: NextRequest): Promise<NextResponse> {
  const installResponse = await checkInstall(request)
  if (installResponse) return installResponse

  const authResponse = checkAuth(request)
  if (authResponse) return authResponse

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next|favicon\\.ico|manifest\\.webmanifest|robots\\.txt|sitemap\\.xml|.*\\.(?:png|jpe?g|gif|webp|avif|svg|ico|css|js|map|woff2?|ttf|otf|eot|txt|xml|json|webmanifest)).*)',
  ],
}
