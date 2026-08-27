import { isPrivateIp } from './isPrivateIp'
import { resolveHostAddresses } from './resolveHostAddresses'
import { safeFetchErrorResult } from './safeFetchErrorResult'
import type { SafeFetchResult } from './SafeFetchResult'

/**
 * Inspect a URL for SSRF safety. Returns either:
 *   - a parsed URL plus the resolved addresses (success), or
 *   - a failure SafeFetchResult ready to return.
 *
 * Allowed schemes are http: and https: only.
 */
export async function checkSafeFetchTarget(
  rawUrl: string,
): Promise<
  | { ok: true; url: URL; addresses: string[] }
  | { ok: false; failure: SafeFetchResult }
> {
  let url: URL
  try {
    url = new URL(rawUrl)
  } catch {
    return {
      ok: false,
      failure: safeFetchErrorResult('URL_INVALID', `Invalid URL: ${rawUrl}`),
    }
  }
  if (url.protocol !== 'http:' && url.protocol !== 'https:') {
    return {
      ok: false,
      failure: safeFetchErrorResult(
        'SCHEME_NOT_ALLOWED',
        `Scheme ${url.protocol} not allowed`,
      ),
    }
  }
  const host = url.hostname
  if (!host) {
    return {
      ok: false,
      failure: safeFetchErrorResult('HOSTNAME_INVALID', 'Empty hostname'),
    }
  }

  let addresses: string[]
  try {
    addresses = await resolveHostAddresses(host)
  } catch (err) {
    return {
      ok: false,
      failure: safeFetchErrorResult(
        'DNS_FAILED',
        err instanceof Error ? err.message : 'DNS lookup failed',
      ),
    }
  }

  for (const addr of addresses) {
    if (isPrivateIp(addr)) {
      return {
        ok: false,
        failure: safeFetchErrorResult(
          'PRIVATE_HOST_NOT_ALLOWED',
          `Host ${host} resolves to private/reserved address ${addr}`,
        ),
      }
    }
  }

  return { ok: true, url, addresses }
}
