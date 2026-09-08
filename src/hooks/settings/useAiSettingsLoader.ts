'use client'

import type { AIProviderSettingsPublic } from '@/types/ai'
import { fetchAiSettings } from '@/utils/settings'
import { useEffect, useRef } from 'react'

/**
 * Load the stored AI settings once an admin key is available and hand them to
 * `onLoaded`. The callback is held in a ref so a caller that rebuilds it does
 * not trigger another request.
 */
export function useAiSettingsLoader(
  apiKey: string,
  onLoaded: (data: AIProviderSettingsPublic) => void,
): void {
  const onLoadedRef = useRef(onLoaded)

  useEffect(() => {
    onLoadedRef.current = onLoaded
  }, [onLoaded])

  useEffect(() => {
    if (!apiKey.trim()) return

    const controller = new AbortController()
    void (async () => {
      const data = await fetchAiSettings(apiKey, controller.signal)
      if (data) onLoadedRef.current(data)
    })()

    return () => {
      controller.abort()
    }
  }, [apiKey])
}
