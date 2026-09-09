import { checkRateLimit, getRateLimitKey } from '@/utils/rateLimit'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { AI_LIMIT } from './aiLimit'
import { AI_WINDOW_MS } from './aiWindowMs'

/** The 429 response when this client has used up its AI budget, else null. */
export function checkAiRateLimit(
  request: NextRequest,
  prefix: string,
): NextResponse | null {
  const rlKey = `${prefix}:${getRateLimitKey(request)}`
  if (checkRateLimit(rlKey, AI_LIMIT, AI_WINDOW_MS)) return null
  return NextResponse.json(
    {
      error: {
        code: 'TOO_MANY_REQUESTS',
        message: 'AI rate limit exceeded',
      },
    },
    { status: 429 },
  )
}
