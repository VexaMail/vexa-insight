import type { ProviderModelInfo } from '../../../contracts/ProviderModelInfo'

/**
 * In-flight request store for deduplication of concurrent model fetches.
 */
export const providerModelInflightStore = new Map<
  string,
  Promise<ProviderModelInfo[]>
>()
