import type { CacheEntry } from './CacheEntry'

/**
 * In-memory cache store for provider model lists.
 */
export const providerModelCacheStore = new Map<string, CacheEntry>()
