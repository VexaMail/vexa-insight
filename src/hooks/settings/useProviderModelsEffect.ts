'use client'

import type {
  ProviderModelsRequest,
  ProviderModelsSetters,
} from '@/types/settings'
import { fetchProviderModels } from '@/utils/ai'
import { useEffect } from 'react'

/** Loads the models whenever the provider or key changes, aborting stale runs. */
export function useProviderModelsEffect(
  request: ProviderModelsRequest,
  setters: ProviderModelsSetters,
): void {
  useEffect(() => {
    const { providerId } = request
    if (!providerId) return
    const { abortRef, setFetchedModels, setFetchedError, setIsLoading } =
      setters
    abortRef.current?.abort()
    const controller = new AbortController()
    abortRef.current = controller
    const run = async () => {
      try {
        await Promise.resolve()
        if (controller.signal.aborted) return
        setIsLoading(true)
        setFetchedError(null)
        const result = await fetchProviderModels({
          ...request,
          providerId,
          signal: controller.signal,
        })
        controller.signal.throwIfAborted()
        setFetchedModels(result.models)
        setFetchedError(result.error)
      } catch (err) {
        if (err instanceof DOMException && err.name === 'AbortError') return
        if (!controller.signal.aborted) {
          setFetchedError('Failed to load models')
          setFetchedModels([])
        }
      } finally {
        if (!controller.signal.aborted) setIsLoading(false)
      }
    }
    void run()
    return () => {
      controller.abort()
    }
  }, [request, setters])
}
