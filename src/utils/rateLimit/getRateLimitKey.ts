import type { NextRequest } from 'next/server'
import { getRateLimitKeyFromHeaders } from './getRateLimitKeyFromHeaders'

/**
 * Derives a rate-limit key from the request (API key or IP).
 */
export function getRateLimitKey(request: NextRequest): string {
  const apiKey =
    request.headers.get('x-api-key') ??
    request.headers.get('authorization')?.replace(/^Bearer\s+/i, '') ??
    ''
  if (apiKey) return `key:${apiKey.slice(0, 32)}`
  return getRateLimitKeyFromHeaders(request.headers)
}
