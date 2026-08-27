import type { AIProviderId } from '../../../contracts/AiProviderId'
import type { ProviderModelInfo } from '../../../contracts/ProviderModelInfo'

/**
 * Creates a normalized ProviderModelInfo from raw provider data.
 */
export function normalizeProviderModel(
  id: string,
  name: string,
  providerId: AIProviderId,
  description?: string,
  deprecated?: boolean,
): ProviderModelInfo {
  return {
    id,
    name: name || id,
    providerId,
    ...(description ? { description } : {}),
    ...(deprecated ? { deprecated } : {}),
  }
}
