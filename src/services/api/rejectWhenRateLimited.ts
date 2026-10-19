import type { RateLimitWindow } from '@/types/api'
import { checkRateLimit, getRateLimitKey } from '@/utils/rateLimit'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

/** A ready 429 when the caller exceeded `limit` requests in `windowMs` for this scope. */
export function rejectWhenRateLimited(
  request: NextRequest,
  scope: string,
  { limit, windowMs }: RateLimitWindow,
): NextResponse | null {
  if (checkRateLimit(`${scope}:${getRateLimitKey(request)}`, limit, windowMs)) {
    return null
  }
  return NextResponse.json(
    { error: { code: 'RATE_LIMITED', message: 'Too many requests' } },
    { status: 429 },
  )
}
