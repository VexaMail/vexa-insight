import type { ProviderModelInfo } from '../../../contracts/ProviderModelInfo'
import { providerModelInflightStore } from './providerModelInflightStore'

/**
 * Returns an in-flight promise for deduplication, or null.
 */
export function getInflightRequest(
  key: string,
): Promise<ProviderModelInfo[]> | null {
  return providerModelInflightStore.get(key) ?? null
}
