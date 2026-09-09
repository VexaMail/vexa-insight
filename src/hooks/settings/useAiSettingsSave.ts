'use client'

import type { AiSettingsActionContext } from '@/types/settings'
import { putAiSettings } from '@/utils/settings'
import { useCallback } from 'react'

/** Validates and stores the provider, key and model currently in the form. */
export function useAiSettingsSave({
  apiKey,
  form,
  setForm,
  stored,
  status,
}: AiSettingsActionContext): () => Promise<void> {
  const { setSaveStatus, setMessage, reportSuccess } = status
  const { setApiKeyMasked, setIsConfigured } = stored

  return useCallback(async () => {
    if (!apiKey.trim()) return
    setSaveStatus('validating')
    setMessage('')

    const result = await putAiSettings(apiKey, {
      providerId: form.providerId,
      apiKey: form.apiKey.trim() || undefined,
      model: form.model.trim() || null,
    })
    if (!result.ok) {
      setMessage(result.message)
      setSaveStatus('error')
      return
    }
    if (result.data) {
      setForm((prev) => ({
        ...prev,
        apiKey: '',
        model: result.data?.model ?? '',
        providerId: result.data?.providerId ?? null,
      }))
      setApiKeyMasked(result.data.apiKeyMasked)
      setIsConfigured(result.data.isConfigured)
    }
    reportSuccess('AI settings saved successfully.')
  }, [
    apiKey,
    form,
    setForm,
    setSaveStatus,
    setMessage,
    reportSuccess,
    setApiKeyMasked,
    setIsConfigured,
  ])
}
