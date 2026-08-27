import type { NextRequest } from 'next/server'
import { getAllowedOriginHostsFromEnv } from '../security/getAllowedOriginHostsFromEnv'

/**
 * Runtime counterpart to Next's build-time `serverActions.allowedOrigins`.
 *
 * Next validates Server Action requests by comparing the `Origin` header's
 * host against `X-Forwarded-Host` (or `Host`), and its `allowedOrigins`
 * escape hatch is baked into the build — a published image ships an empty
 * list and answers 403 behind any proxy that does not forward the public
 * hostname. This reads `VEXA_ALLOWED_ORIGINS` at request time instead: when
 * a POST's origin host is allow-listed but does not match the forwarded
 * host, it returns the host the proxy should forward, which makes Next's
 * own comparison pass. Non-listed mismatches return undefined and still
 * fail Next's check.
 */
export function getAllowedOriginForwardedHost(
  request: NextRequest,
): string | undefined {
  if (request.method !== 'POST') return undefined
  const origin = request.headers.get('origin')
  if (!origin) return undefined

  let originHost: string
  try {
    originHost = new URL(origin).host
  } catch {
    return undefined
  }

  const forwardedHost =
    request.headers.get('x-forwarded-host') ?? request.headers.get('host')
  if (forwardedHost === originHost) return undefined
  if (!getAllowedOriginHostsFromEnv().includes(originHost)) return undefined

  return originHost
}
