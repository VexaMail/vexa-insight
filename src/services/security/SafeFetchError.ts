/**
 * Discriminated error union returned by safeFetch when a request is rejected
 * for safety reasons or fails to dispatch successfully.
 */
export type SafeFetchError =
  | { code: 'URL_INVALID'; message: string }
  | { code: 'SCHEME_NOT_ALLOWED'; message: string }
  | { code: 'HOSTNAME_INVALID'; message: string }
  | { code: 'DNS_FAILED'; message: string }
  | { code: 'PRIVATE_HOST_NOT_ALLOWED'; message: string }
  | { code: 'REDIRECT_BLOCKED'; message: string }
  | { code: 'TOO_MANY_REDIRECTS'; message: string }
  | { code: 'TIMEOUT'; message: string }
  | { code: 'NETWORK'; message: string }
