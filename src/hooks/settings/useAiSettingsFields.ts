'use client'

import type { AIProviderId } from '@/types/ai'
import type {
  AiSettingsFieldHandlers,
  AiSettingsFormState,
} from '@/types/settings'
import type { Dispatch, SetStateAction } from 'react'
import { useCallback } from 'react'

/** Field handlers of the AI settings form, one per editable field. */
export function useAiSettingsFields(
  setForm: Dispatch<SetStateAction<AiSettingsFormState>>,
): AiSettingsFieldHandlers {
  const handleProviderChange = useCallback(
    (providerId: AIProviderId | null) => {
      setForm((prev) => ({ ...prev, providerId }))
    },
    [setForm],
  )

  const handleApiKeyChange = useCallback(
    (value: string) => {
      setForm((prev) => ({ ...prev, apiKey: value }))
    },
    [setForm],
  )

  const handleModelChange = useCallback(
    (value: string) => {
      setForm((prev) => ({ ...prev, model: value }))
    },
    [setForm],
  )

  return { handleProviderChange, handleApiKeyChange, handleModelChange }
}
