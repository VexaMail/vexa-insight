import type { SafeFetchError } from './SafeFetchError'

/**
 * Result returned by safeFetch. `ok: true` means the request passed all SSRF
 * guards. `dispatched` indicates whether the underlying fetch was actually
 * issued (false when `allowDispatch` was set to false). When `dispatched` is
 * true, `response` is the live Response so callers can read the body from the
 * same DNS resolution the guard validated (closes the DNS-rebinding window).
 */
export type SafeFetchResult =
  | {
      ok: true
      status: number | null
      dispatched: boolean
      response: Response | null
      error: null
    }
  | {
      ok: false
      status: null
      dispatched: boolean
      response: null
      error: SafeFetchError
    }
