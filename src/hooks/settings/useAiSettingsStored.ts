'use client'

import type {
  AiSettingsFormState,
  AiSettingsStoredState,
} from '@/types/settings'
import type { Dispatch, SetStateAction } from 'react'
import { useCallback, useState } from 'react'
import { useAiSettingsLoader } from './useAiSettingsLoader'

/** Loads the stored provider settings into the form and tracks their state. */
export function useAiSettingsStored(
  apiKey: string,
  setForm: Dispatch<SetStateAction<AiSettingsFormState>>,
): AiSettingsStoredState {
  const [apiKeyMasked, setApiKeyMasked] = useState<string | null>(null)
  const [isConfigured, setIsConfigured] = useState(false)

  useAiSettingsLoader(
    apiKey,
    useCallback(
      (data) => {
        setForm((prev) => ({
          ...prev,
          providerId: data.providerId,
          model: data.model ?? '',
        }))
        setApiKeyMasked(data.apiKeyMasked)
        setIsConfigured(data.isConfigured)
      },
      [setForm],
    ),
  )

  return { apiKeyMasked, setApiKeyMasked, isConfigured, setIsConfigured }
}
