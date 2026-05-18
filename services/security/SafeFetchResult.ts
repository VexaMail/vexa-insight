import type { SafeFetchError } from './SafeFetchError'

/**
 * Result returned by safeFetch. `ok: true` means the request passed all SSRF
 * guards. `dispatched` indicates whether the underlying fetch was actually
 * issued (false when `allowDispatch` was set to false).
 */
export type SafeFetchResult =
  | { ok: true; status: number | null; dispatched: boolean; error: null }
  | { ok: false; status: null; dispatched: boolean; error: SafeFetchError }
