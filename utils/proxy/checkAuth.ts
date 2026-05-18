import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { INSTALL_API } from './installApi'
import { INSTALL_PATH } from './installPath'
import { isStaticAsset } from './isStaticAsset'
import { publicRoutes } from './publicRoutes'

export function checkAuth(request: NextRequest): NextResponse | undefined {
  const pathname = request.nextUrl.pathname

  if (
    isStaticAsset(pathname) ||
    pathname.startsWith(INSTALL_PATH) ||
    pathname.startsWith(INSTALL_API) ||
    publicRoutes.some((route) => pathname.startsWith(route))
  ) {
    return undefined
  }

  const session = request.cookies.get('session')
  if (!session) {
    const loginUrl = new URL('/login', request.url)
    return NextResponse.redirect(loginUrl)
  }

  return undefined
}
