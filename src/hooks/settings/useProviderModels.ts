'use client'

import type { AIProviderId, ProviderModelInfo } from '@/types/ai'
import type {
  ProviderModelsRequest,
  ProviderModelsSetters,
} from '@/types/settings'
import { useMemo, useRef, useState } from 'react'
import { useProviderModelsEffect } from './useProviderModelsEffect'
import { useProviderModelsRefetch } from './useProviderModelsRefetch'

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

  const request = useMemo<ProviderModelsRequest>(
    () => ({ apiKey, providerId, temporaryApiKey }),
    [apiKey, providerId, temporaryApiKey],
  )
  const setters = useMemo<ProviderModelsSetters>(
    () => ({ abortRef, setFetchedModels, setFetchedError, setIsLoading }),
    [],
  )
  useProviderModelsEffect(request, setters)
  const refetch = useProviderModelsRefetch(request, setters)

  return { models, isLoading, error, refetch }
}
