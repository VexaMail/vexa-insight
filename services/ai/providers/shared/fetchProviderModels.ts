import type { AIProviderId } from '../../contracts/AiProviderId'
import type { ProviderModelInfo } from '../../contracts/ProviderModelInfo'
import { buildCacheKey } from './cache/buildCacheKey'
import { getCachedModels } from './cache/getCachedModels'
import { getInflightRequest } from './cache/getInflightRequest'
import { setCachedModels } from './cache/setCachedModels'
import { setInflightRequest } from './cache/setInflightRequest'
import { providerModelFetchers } from './providerModelFetchers'

/**
 * Fetches available models for a provider, using cache and in-flight dedup.
 */
export async function fetchProviderModels(
  providerId: AIProviderId,
  apiKey: string,
): Promise<ProviderModelInfo[]> {
  const cacheKey = buildCacheKey(providerId, apiKey)

  const cached = getCachedModels(cacheKey)
  if (cached) return cached

  const existing = getInflightRequest(cacheKey)
  if (existing) return existing

  const fetcher = providerModelFetchers[providerId]

  const fetchAndCache = async (): Promise<ProviderModelInfo[]> => {
    const models = await fetcher(apiKey)
    setCachedModels(cacheKey, models)
    console.info(
      `[ai:models] fetched ${String(models.length)} models for ${providerId}`,
    )
    return models
  }

  const promise = fetchAndCache()
  setInflightRequest(cacheKey, promise)
  return promise
}
