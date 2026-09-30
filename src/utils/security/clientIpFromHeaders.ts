import { getTrustedProxyHopsFromEnv } from './getTrustedProxyHopsFromEnv'

/**
 * The client address as recorded by your own proxies.
 *
 * Every proxy appends the peer it received the request from, so only the
 * rightmost entries of X-Forwarded-For were written by infrastructure you
 * control; everything to their left came from the client and can be forged.
 * With `VEXA_TRUSTED_PROXY_HOPS` proxies in front of the app, the client is
 * the entry that many places from the right. A proxy that overwrites the
 * header leaves a single entry, which this returns either way.
 */
export function clientIpFromHeaders(headers: Headers): string | null {
  const entries = (headers.get('x-forwarded-for') ?? '')
    .split(',')
    .map((entry) => entry.trim())
    .filter(Boolean)
  if (entries.length > 0) {
    const index = Math.max(0, entries.length - getTrustedProxyHopsFromEnv())
    return entries[index] ?? null
  }
  return headers.get('x-real-ip')?.trim() || null
}
