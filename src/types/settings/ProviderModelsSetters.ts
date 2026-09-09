import type { ProviderModelInfo } from '@/types/ai'
import type { RefObject } from 'react'

/** The state setters shared by the initial fetch and the manual refetch. */
export type ProviderModelsSetters = {
  readonly abortRef: RefObject<AbortController | null>
  readonly setFetchedModels: (models: ProviderModelInfo[]) => void
  readonly setFetchedError: (error: string | null) => void
  readonly setIsLoading: (loading: boolean) => void
}
