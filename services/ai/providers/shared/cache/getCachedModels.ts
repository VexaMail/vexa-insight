import type { ProviderModelInfo } from '../../../contracts/ProviderModelInfo'
import { providerModelCacheStore } from './providerModelCacheStore'

/**
 * Returns cached models if still valid, or null.
 */
export function getCachedModels(key: string): ProviderModelInfo[] | null {
  const entry = providerModelCacheStore.get(key)
  if (!entry) return null
  if (Date.now() > entry.expiresAt) {
    providerModelCacheStore.delete(key)
    return null
  }
  console.info(`[ai:models] cache hit for ${key}`)
  return entry.models
}
