/**
 * Builds a cache key from provider ID and a credential fingerprint.
 */
export function buildCacheKey(providerId: string, apiKey: string): string {
  return `${providerId}:${apiKey.slice(-8)}`
}
