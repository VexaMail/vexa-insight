import type { SafeFetchError } from './SafeFetchError'
import type { SafeFetchResult } from './SafeFetchResult'

/**
 * Build a typed failure SafeFetchResult with a discriminated error code.
 */
export function safeFetchErrorResult(
  code: SafeFetchError['code'],
  message: string,
): SafeFetchResult {
  return {
    ok: false,
    status: null,
    dispatched: false,
    error: { code, message } as SafeFetchError,
  }
}
