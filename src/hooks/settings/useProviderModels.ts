'use client'

import type { AIProviderId, ProviderModelInfo } from '@/types/ai'
import { fetchProviderModels } from '@/utils/ai'
import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * Fetches available models from the provider API for the settings dropdown.
 */
export function useProviderModels(
  apiKey: string,
  providerId: AIProviderId | null,
  temporaryApiKey: string,
) {
  const [fetchedModels, setFetchedModels] = useState<ProviderModelInfo[]>([])
  const [fetchedError, setFetchedError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const abortRef = useRef<AbortController | null>(null)

  const models = providerId ? fetchedModels : []
  const error = providerId ? fetchedError : null

  useEffect(() => {
    if (!providerId) return
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
          apiKey,
          providerId,
          temporaryApiKey,
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
  }, [apiKey, providerId, temporaryApiKey])

  const refetch = useCallback(async () => {
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
        apiKey,
        providerId,
        temporaryApiKey,
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
  }, [apiKey, providerId, temporaryApiKey])

  return { models, isLoading, error, refetch }
}
