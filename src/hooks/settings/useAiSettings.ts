'use client'

import type { AIProviderId, AIProviderSettingsPublic } from '@/types/ai'
import type {
  AiSettingsFormState,
  AiSettingsSaveStatus,
} from '@/types/settings'
import { useCallback, useEffect, useState } from 'react'

export function useAiSettings(apiKey: string) {
  const [form, setForm] = useState<AiSettingsFormState>({
    providerId: null,
    apiKey: '',
    model: '',
  })
  const [apiKeyMasked, setApiKeyMasked] = useState<string | null>(null)
  const [isConfigured, setIsConfigured] = useState(false)
  const [saveStatus, setSaveStatus] = useState<AiSettingsSaveStatus>('idle')
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (!apiKey.trim()) return
    const controller = new AbortController()
    const load = async () => {
      try {
        const res = await fetch('/api/v1/admin/ai-settings', {
          headers: { 'X-API-Key': apiKey },
          signal: controller.signal,
        })
        if (!res.ok) return
        const json = (await res.json()) as { data: AIProviderSettingsPublic }
        setForm((prev) => ({
          ...prev,
          providerId: json.data.providerId,
          model: json.data.model ?? '',
        }))
        setApiKeyMasked(json.data.apiKeyMasked)
        setIsConfigured(json.data.isConfigured)
      } catch {
        // silently ignore fetch errors during load
      }
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

  const handleSave = useCallback(async () => {
    if (!apiKey.trim()) return
    setSaveStatus('validating')
    setMessage('')

    try {
      const res = await fetch('/api/v1/admin/ai-settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': apiKey,
        },
        body: JSON.stringify({
          providerId: form.providerId,
          apiKey: form.apiKey.trim() || undefined,
          model: form.model.trim() || null,
        }),
      })

      const json = (await res.json()) as
        { data: AIProviderSettingsPublic } | { error: { message: string } }

      if (!res.ok) {
        const err = json as { error: { message: string } }
        setMessage(err.error.message)
        setSaveStatus('error')
        return
      }

      const data = (json as { data: AIProviderSettingsPublic }).data
      setForm((prev) => ({
        ...prev,
        apiKey: '',
        model: data.model ?? '',
        providerId: data.providerId,
      }))
      setApiKeyMasked(data.apiKeyMasked)
      setIsConfigured(data.isConfigured)
      setSaveStatus('success')
      setMessage('AI settings saved successfully.')
      setTimeout(() => {
        setMessage('')
        setSaveStatus('idle')
      }, 3000)
    } catch {
      setMessage('Request failed.')
      setSaveStatus('error')
    }
  }, [apiKey, form])

  const handleClear = useCallback(async () => {
    if (!apiKey.trim()) return
    setSaveStatus('loading')
    setMessage('')

    try {
      const res = await fetch('/api/v1/admin/ai-settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': apiKey,
        },
        body: JSON.stringify({ providerId: null }),
      })

      if (res.ok) {
        setForm({ providerId: null, apiKey: '', model: '' })
        setApiKeyMasked(null)
        setIsConfigured(false)
        setSaveStatus('success')
        setMessage('AI configuration cleared.')
        setTimeout(() => {
          setMessage('')
          setSaveStatus('idle')
        }, 3000)
      } else {
        setMessage('Failed to clear settings.')
        setSaveStatus('error')
      }
    } catch {
      setMessage('Request failed.')
      setSaveStatus('error')
    }
  }, [apiKey])

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
