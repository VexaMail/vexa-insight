import type { ProviderModelInfo } from '../../../contracts/ProviderModelInfo'

/**
 * Sorts provider models alphabetically by name (case-insensitive).
 */
export function sortProviderModels(
  models: ProviderModelInfo[],
): ProviderModelInfo[] {
  return [...models].sort((a, b) =>
    a.name.localeCompare(b.name, undefined, { sensitivity: 'base' }),
  )
}
