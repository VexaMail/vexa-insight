import type { ProviderModelInfo } from '../../../contracts/ProviderModelInfo'

/**
 * Removes duplicate models by ID, keeping the first occurrence.
 */
export function deduplicateProviderModels(
  models: ProviderModelInfo[],
): ProviderModelInfo[] {
  const seen = new Set<string>()
  return models.filter((m) => {
    if (seen.has(m.id)) return false
    seen.add(m.id)
    return true
  })
}
