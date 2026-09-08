import { blockedRedirectResult } from './blockedRedirectResult'
import { checkSafeFetchTarget } from './checkSafeFetchTarget'
import type { FollowSafeRedirectsInput } from './FollowSafeRedirectsInput'
import { MAX_REDIRECT_HOPS } from './maxRedirectHops'
import { redirectRequestInit } from './redirectRequestInit'
import { resolveRedirectTarget } from './resolveRedirectTarget'
import { safeFetchErrorResult } from './safeFetchErrorResult'
import type { SafeFetchResult } from './SafeFetchResult'

/**
 * Dispatch one hop with `redirect: 'manual'` and, when the answer is a
 * redirect, validate the `Location` target with the same SSRF guard as the
 * original URL before dispatching again. Bounded by MAX_REDIRECT_HOPS. Network
 * errors and aborts propagate to safeFetch, which maps them to typed results.
 */
export async function followSafeRedirects(
  input: FollowSafeRedirectsInput,
): Promise<SafeFetchResult> {
  const { url, init, signal, hop } = input
  const response = await fetch(url, { ...init, redirect: 'manual', signal })
  const target = resolveRedirectTarget(response, url)
  if (target === null) {
    return {
      ok: true,
      status: response.status,
      dispatched: true,
      response,
      error: null,
    }
  }
  if (hop >= MAX_REDIRECT_HOPS) {
    return safeFetchErrorResult(
      'TOO_MANY_REDIRECTS',
      `Stopped after ${String(MAX_REDIRECT_HOPS)} redirects at ${url}`,
    )
  }
  const validated = await checkSafeFetchTarget(target)
  if (!validated.ok) return blockedRedirectResult(target, validated.failure)
  await response.body?.cancel()
  return followSafeRedirects({
    url: target,
    init: redirectRequestInit(init, response.status),
    signal,
    hop: hop + 1,
  })
}
