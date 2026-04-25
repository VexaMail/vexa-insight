import type { NextRequest } from 'next/server'

/**
 * Derives a rate-limit key from the request (API key or IP).
 */
export function getRateLimitKey(request: NextRequest): string {
  const apiKey =
    request.headers.get('x-api-key') ??
    request.headers.get('authorization')?.replace(/^Bearer\s+/i, '') ??
    ''
  if (apiKey) return `key:${apiKey.slice(0, 32)}`
  const forwarded = request.headers.get('x-forwarded-for')
  const ip =
    forwarded?.split(',')[0]?.trim() ??
    request.headers.get('x-real-ip') ??
    'anonymous'
  return `ip:${ip}`
}
