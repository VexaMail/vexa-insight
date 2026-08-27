import { checkSafeFetchTarget } from './checkSafeFetchTarget'
import { safeFetchErrorResult } from './safeFetchErrorResult'
import type { SafeFetchOptions } from './SafeFetchOptions'
import type { SafeFetchResult } from './SafeFetchResult'

/**
 * SSRF-safe outbound fetch. Steps:
 *   1. Parse the URL; reject non-http(s) schemes.
 *   2. Resolve DNS (or use the literal); reject if any resolved address falls
 *      in a private/reserved range (RFC 1918, loopback, link-local, CGNAT,
 *      cloud metadata, IPv6 ULA/loopback/link-local, etc).
 *   3. Dispatch with an AbortController timeout (default 10s).
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
    const res = await fetch(rawUrl, { ...init, signal: controller.signal })
    return {
      ok: true,
      status: res.status,
      dispatched: true,
      response: res,
      error: null,
    }
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
