/**
 * One hop of a safeFetch redirect chain: the URL to dispatch (already
 * validated by checkSafeFetchTarget), the addresses that validation resolved,
 * the RequestInit to send, the shared timeout signal, and how many redirects
 * have been followed so far.
 */
export type FollowSafeRedirectsInput = {
  url: string
  addresses: readonly string[]
  init: Omit<RequestInit, 'signal'>
  signal: AbortSignal
  hop: number
}
