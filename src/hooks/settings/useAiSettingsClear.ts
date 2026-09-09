'use client'

import { CLEARED_AI_SETTINGS_FORM } from '@/constants/settings'
import type { AiSettingsActionContext } from '@/types/settings'
import { putAiSettings } from '@/utils/settings'
import { useCallback } from 'react'

/** Removes the stored provider configuration and resets the form. */
export function useAiSettingsClear({
  apiKey,
  setForm,
  stored,
  status,
}: AiSettingsActionContext): () => Promise<void> {
  const { setSaveStatus, setMessage, reportSuccess } = status
  const { setApiKeyMasked, setIsConfigured } = stored

  return useCallback(async () => {
    if (!apiKey.trim()) return
    setSaveStatus('loading')
    setMessage('')

    const result = await putAiSettings(apiKey, { providerId: null })
    if (!result.ok) {
      setMessage(
        result.message === 'Request failed.'
          ? result.message
          : 'Failed to clear settings.',
      )
      setSaveStatus('error')
      return
    }
    setForm(CLEARED_AI_SETTINGS_FORM)
    setApiKeyMasked(null)
    setIsConfigured(false)
    reportSuccess('AI configuration cleared.')
  }, [
    apiKey,
    setForm,
    setSaveStatus,
    setMessage,
    reportSuccess,
    setApiKeyMasked,
    setIsConfigured,
  ])
}
