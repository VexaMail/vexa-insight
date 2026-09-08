'use client'

import { CLEARED_AI_SETTINGS_FORM } from '@/constants/settings'
import type { AIProviderId } from '@/types/ai'
import type {
  AiSettingsFormState,
  AiSettingsSaveStatus,
} from '@/types/settings'
import { fetchAiSettings, putAiSettings } from '@/utils/settings'
import { useCallback, useEffect, useState } from 'react'

export function useAiSettings(apiKey: string) {
  const [form, setForm] = useState<AiSettingsFormState>(
    CLEARED_AI_SETTINGS_FORM,
  )
  const [apiKeyMasked, setApiKeyMasked] = useState<string | null>(null)
  const [isConfigured, setIsConfigured] = useState(false)
  const [saveStatus, setSaveStatus] = useState<AiSettingsSaveStatus>('idle')
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (!apiKey.trim()) return
    const controller = new AbortController()
    const load = async () => {
      const data = await fetchAiSettings(apiKey, controller.signal)
      if (!data) return
      setForm((prev) => ({
        ...prev,
        providerId: data.providerId,
        model: data.model ?? '',
      }))
      setApiKeyMasked(data.apiKeyMasked)
      setIsConfigured(data.isConfigured)
    }
    void load()
    return () => {
      controller.abort()
    }
  }, [apiKey])

  const handleProviderChange = useCallback(
    (providerId: AIProviderId | null) => {
      setForm((prev) => ({ ...prev, providerId }))
    },
    [],
  )

  const handleApiKeyChange = useCallback((value: string) => {
    setForm((prev) => ({ ...prev, apiKey: value }))
  }, [])

  const handleModelChange = useCallback((value: string) => {
    setForm((prev) => ({ ...prev, model: value }))
  }, [])

  const reportSuccess = useCallback((text: string) => {
    setSaveStatus('success')
    setMessage(text)
    setTimeout(() => {
      setMessage('')
      setSaveStatus('idle')
    }, 3000)
  }, [])

  const handleSave = useCallback(async () => {
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
  }, [apiKey, form, reportSuccess])

  const handleClear = useCallback(async () => {
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
  }, [apiKey, reportSuccess])

  return {
    form,
    apiKeyMasked,
    isConfigured,
    saveStatus,
    message,
    handleProviderChange,
    handleApiKeyChange,
    handleModelChange,
    handleSave,
    handleClear,
  }
}
