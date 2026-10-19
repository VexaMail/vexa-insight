import { getSessionActor } from '@/services/auth'
import type { RateLimitWindow } from '@/types/api'
import { checkRateLimit, getRateLimitKey } from '@/utils/rateLimit'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

/**
 * A ready 429 when the caller exceeded `limit` requests in `windowMs` for this
 * scope. A signed-in caller is counted by user id, so changing headers does
 * not reset the count; only API-key callers fall back to the request key.
 */
export async function rejectWhenRateLimited(
  request: NextRequest,
  scope: string,
  { limit, windowMs }: RateLimitWindow,
): Promise<NextResponse | null> {
  const actor = await getSessionActor()
  const caller = actor ? `user:${actor.id}` : getRateLimitKey(request)
  if (checkRateLimit(`${scope}:${caller}`, limit, windowMs)) {
    return null
  }
  return NextResponse.json(
    { error: { code: 'RATE_LIMITED', message: 'Too many requests' } },
    { status: 429 },
  )
}
