'use client'

import type { AIProviderId, ProviderModelInfo } from '@/types/ai'
import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * Fetches available models from the provider API for the settings dropdown.
 */
export function useProviderModels(
  apiKey: string,
  providerId: AIProviderId | null,
  temporaryApiKey: string,
) {
  const [models, setModels] = useState<ProviderModelInfo[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const abortRef = useRef<AbortController | null>(null)

  const fetchModels = useCallback(async () => {
    if (!providerId) {
      setModels([])
      return
    }

    abortRef.current?.abort()
    const controller = new AbortController()
    abortRef.current = controller

    setIsLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/v1/admin/ai-models', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': apiKey,
        },
        body: JSON.stringify({
          providerId,
          ...(temporaryApiKey.trim() ? { apiKey: temporaryApiKey.trim() } : {}),
        }),
        signal: controller.signal,
      })

      if (!res.ok) {
        const json = (await res.json()) as {
          error: { message: string }
        }
        setError(json.error.message)
        setModels([])
        return
      }

      const json = (await res.json()) as { data: ProviderModelInfo[] }
      setModels(json.data)
    } catch (err) {
      if (err instanceof DOMException && err.name === 'AbortError') return
      setError('Failed to load models')
      setModels([])
    } finally {
      setIsLoading(false)
    }
  }, [apiKey, providerId, temporaryApiKey])

  useEffect(() => {
    if (!providerId) {
      setModels([])
      setError(null)
      return
    }
    void fetchModels()
    return () => abortRef.current?.abort()
  }, [providerId, fetchModels])

  return { models, isLoading, error, refetch: fetchModels }
}
