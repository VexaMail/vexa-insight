'use client'

import type {
  ProviderModelsRequest,
  ProviderModelsSetters,
} from '@/types/settings'
import { fetchProviderModels } from '@/utils/ai'
import { useCallback } from 'react'

/** Manual reload of the models list; unlike the effect it never leaves loading on. */
export function useProviderModelsRefetch(
  request: ProviderModelsRequest,
  setters: ProviderModelsSetters,
): () => Promise<void> {
  return useCallback(async () => {
    const { providerId } = request
    const { abortRef, setFetchedModels, setFetchedError, setIsLoading } =
      setters
    if (!providerId) {
      setFetchedModels([])
      return
    }
    abortRef.current?.abort()
    const controller = new AbortController()
    abortRef.current = controller
    setIsLoading(true)
    setFetchedError(null)
    try {
      const result = await fetchProviderModels({
        ...request,
        providerId,
        signal: controller.signal,
      })
      setFetchedModels(result.models)
      setFetchedError(result.error)
    } catch (err) {
      if (err instanceof DOMException && err.name === 'AbortError') return
      setFetchedError('Failed to load models')
      setFetchedModels([])
    } finally {
      setIsLoading(false)
    }
  }, [request, setters])
}
