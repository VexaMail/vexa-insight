import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { buildProdContentSecurityPolicy } from '../security/buildProdContentSecurityPolicy'
import { createCspNonce } from '../security/createCspNonce'

export function applyProdCspHeaders(request: NextRequest): NextResponse {
  if (process.env.NODE_ENV !== 'production') {
    return NextResponse.next()
  }
  const nonce = createCspNonce()
  const contentSecurityPolicy = buildProdContentSecurityPolicy(nonce)
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-nonce', nonce)
  requestHeaders.set('content-security-policy', contentSecurityPolicy)
  const response = NextResponse.next({ request: { headers: requestHeaders } })
  response.headers.set('content-security-policy', contentSecurityPolicy)
  return response
}
