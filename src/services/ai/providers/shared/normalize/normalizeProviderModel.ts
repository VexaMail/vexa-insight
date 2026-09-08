import type { NormalizeProviderModelInput } from '../../../contracts/NormalizeProviderModelInput'
import type { ProviderModelInfo } from '../../../contracts/ProviderModelInfo'

/**
 * Creates a normalized ProviderModelInfo from raw provider data.
 */
export function normalizeProviderModel({
  id,
  name,
  providerId,
  description,
  deprecated,
}: NormalizeProviderModelInput): ProviderModelInfo {
  return {
    id,
    name: name || id,
    providerId,
    ...(description ? { description } : {}),
    ...(deprecated ? { deprecated } : {}),
  }
}
