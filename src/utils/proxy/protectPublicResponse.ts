import type { NextRequest, NextResponse } from 'next/server'
import { applyProdCspHeaders } from './applyProdCspHeaders'

export function protectPublicResponse(
  request: NextRequest,
  response: NextResponse,
): NextResponse {
  const secured = applyProdCspHeaders(request)
  for (const [name, value] of secured.headers) {
    if (name !== 'x-middleware-next') response.headers.set(name, value)
  }
  return response
}
