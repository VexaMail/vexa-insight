import { safeFetchErrorResult } from './safeFetchErrorResult'
import type { SafeFetchResult } from './SafeFetchResult'

/**
 * Wrap the failure produced by checking a redirect target into a
 * REDIRECT_BLOCKED result, keeping the underlying reason in the message so an
 * operator can tell a private-address bounce from a malformed `Location`.
 */
export function blockedRedirectResult(
  target: string,
  failure: SafeFetchResult,
): SafeFetchResult {
  const reason =
    failure.error === null
      ? 'target rejected'
      : `${failure.error.code}: ${failure.error.message}`
  return safeFetchErrorResult(
    'REDIRECT_BLOCKED',
    `Redirect to ${target} blocked (${reason})`,
  )
}
