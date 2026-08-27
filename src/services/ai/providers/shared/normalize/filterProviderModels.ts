import type { ProviderModelInfo } from '../../../contracts/ProviderModelInfo'

/**
 * Filters provider models by inclusion/exclusion rules.
 */
export function filterProviderModels(
  models: ProviderModelInfo[],
  includePatterns?: RegExp[],
  excludePatterns?: RegExp[],
): ProviderModelInfo[] {
  let filtered = models

  if (includePatterns && includePatterns.length > 0) {
    filtered = filtered.filter((m) => includePatterns.some((p) => p.test(m.id)))
  }

  if (excludePatterns && excludePatterns.length > 0) {
    filtered = filtered.filter(
      (m) => !excludePatterns.some((p) => p.test(m.id)),
    )
  }

  return filtered
}
