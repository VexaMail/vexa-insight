'use client'

import {
  AI_SETTINGS_MESSAGE_MS,
  CLEARED_AI_SETTINGS_FORM,
} from '@/constants/settings'
import type {
  AiSettingsFormState,
  AiSettingsSaveStatus,
} from '@/types/settings'
import { putAiSettings } from '@/utils/settings'
import { useCallback, useState } from 'react'
import { useAiSettingsFields } from './useAiSettingsFields'
import { useAiSettingsLoader } from './useAiSettingsLoader'

export function useAiSettings(apiKey: string) {
  const [form, setForm] = useState<AiSettingsFormState>(
    CLEARED_AI_SETTINGS_FORM,
  )
  const [apiKeyMasked, setApiKeyMasked] = useState<string | null>(null)
  const [isConfigured, setIsConfigured] = useState(false)
  const [saveStatus, setSaveStatus] = useState<AiSettingsSaveStatus>('idle')
  const [message, setMessage] = useState('')
  const fields = useAiSettingsFields(setForm)
  useAiSettingsLoader(
    apiKey,
    useCallback((data) => {
      setForm((prev) => ({
        ...prev,
        providerId: data.providerId,
        model: data.model ?? '',
      }))
      setApiKeyMasked(data.apiKeyMasked)
      setIsConfigured(data.isConfigured)
    }, []),
  )

  const reportSuccess = useCallback((text: string) => {
    setSaveStatus('success')
    setMessage(text)
    setTimeout(() => {
      setMessage('')
      setSaveStatus('idle')
    }, AI_SETTINGS_MESSAGE_MS)
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
    ...fields,
    handleSave,
    handleClear,
  }
}
