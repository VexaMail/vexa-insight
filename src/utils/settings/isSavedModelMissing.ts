import type { ProviderModelInfo } from '@/types/ai'

/** True when a model is saved but the provider no longer lists it. */
export function isSavedModelMissing(
  model: string,
  models: readonly ProviderModelInfo[],
): boolean {
  return (
    model !== '' && models.length > 0 && !models.some((m) => m.id === model)
  )
}
