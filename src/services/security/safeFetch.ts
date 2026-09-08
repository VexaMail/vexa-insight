import { checkSafeFetchTarget } from './checkSafeFetchTarget'
import { followSafeRedirects } from './followSafeRedirects'
import { safeFetchErrorResult } from './safeFetchErrorResult'
import type { SafeFetchOptions } from './SafeFetchOptions'
import type { SafeFetchResult } from './SafeFetchResult'

/**
 * SSRF-safe outbound fetch. Steps:
 *   1. Parse the URL; reject non-http(s) schemes.
 *   2. Resolve DNS (or use the literal); reject if any resolved address falls
 *      in a private/reserved range (RFC 1918, loopback, link-local, CGNAT,
 *      cloud metadata, IPv6 ULA/loopback/link-local, etc).
 *   3. Dispatch with `redirect: 'manual'` under one AbortController timeout
 *      (default 10s) that covers the whole redirect chain.
 *   4. On a 301/302/303/307/308 with a `Location`, resolve it against the
 *      current URL, run steps 1-2 on the target, and re-dispatch; a rejected
 *      target fails with REDIRECT_BLOCKED and more than MAX_REDIRECT_HOPS
 *      redirects fail with TOO_MANY_REDIRECTS. A 303, or a 301/302 answering
 *      a POST, is re-dispatched as a body-less GET, as browsers do.
 *
 * When `allowDispatch: false`, validation runs but no network request is sent.
 * That mode is intended for unit tests and for callers that only need to
 * pre-validate a URL.
 *
 * On success the live `Response` is exposed so callers can read the body from
 * the same DNS resolution the guard checked. This avoids a re-resolution
 * window that a DNS-rebinding attacker could exploit.
 */
export async function safeFetch(
  rawUrl: string,
  options: SafeFetchOptions = {},
): Promise<SafeFetchResult> {
  const validated = await checkSafeFetchTarget(rawUrl)
  if (!validated.ok) return validated.failure

  const { timeoutMs = 10_000, allowDispatch = true, ...init } = options
  if (!allowDispatch) {
    return {
      ok: true,
      status: null,
      dispatched: false,
      response: null,
      error: null,
    }
  }

  const controller = new AbortController()
  const timer = setTimeout(() => {
    controller.abort()
  }, timeoutMs)
  try {
    return await followSafeRedirects({
      url: rawUrl,
      init,
      signal: controller.signal,
      hop: 0,
    })
  } catch (err) {
    if (controller.signal.aborted) {
      return safeFetchErrorResult(
        'TIMEOUT',
        `Request timed out after ${String(timeoutMs)}ms`,
      )
    }
    return safeFetchErrorResult(
      'NETWORK',
      err instanceof Error ? err.message : 'Network error',
    )
  } finally {
    clearTimeout(timer)
  }
}
