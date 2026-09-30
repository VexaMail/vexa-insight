/**
 * Whether a safeFetch failure may pass on retry. Only transport failures do;
 * a URL the SSRF guard rejected is rejected again every time.
 */
export function isRetryableFetchError(code: string): boolean {
  return code === 'NETWORK' || code === 'TIMEOUT' || code === 'DNS_FAILED'
}
