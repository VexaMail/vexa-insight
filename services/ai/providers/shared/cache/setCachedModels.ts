import type { ProviderModelInfo } from '../../../contracts/ProviderModelInfo'
import { CACHE_TTL_MS } from './cacheTtlMs'
import { providerModelCacheStore } from './providerModelCacheStore'

/**
 * Stores models in the cache with a TTL.
 */
export function setCachedModels(
  key: string,
  models: ProviderModelInfo[],
): void {
  providerModelCacheStore.set(key, {
    models,
    expiresAt: Date.now() + CACHE_TTL_MS,
  })
}
