/**
 * Options accepted by safeFetch. Mirrors RequestInit but reserves `signal`
 * for the internal timeout AbortController, and adds:
 *   - `timeoutMs`: overall request budget in milliseconds (default 10_000).
 *   - `allowDispatch`: when false, validates only; never issues the request.
 */
export type SafeFetchOptions = Omit<RequestInit, 'signal'> & {
  timeoutMs?: number
  allowDispatch?: boolean
}
