import type { ProviderModelInfo } from '../../../contracts/ProviderModelInfo'

/**
 * Internal cache entry for provider model lists.
 */
export type CacheEntry = {
  models: ProviderModelInfo[]
  expiresAt: number
}
