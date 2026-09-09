'use client'

import { CLEARED_AI_SETTINGS_FORM } from '@/constants/settings'
import type { AiSettingsFormState } from '@/types/settings'
import { useState } from 'react'
import { useAiSettingsClear } from './useAiSettingsClear'
import { useAiSettingsFields } from './useAiSettingsFields'
import { useAiSettingsSave } from './useAiSettingsSave'
import { useAiSettingsStatus } from './useAiSettingsStatus'
import { useAiSettingsStored } from './useAiSettingsStored'

export function useAiSettings(apiKey: string) {
  const [form, setForm] = useState<AiSettingsFormState>(
    CLEARED_AI_SETTINGS_FORM,
  )
  const stored = useAiSettingsStored(apiKey, setForm)
  const status = useAiSettingsStatus()
  const fields = useAiSettingsFields(setForm)
  const context = { apiKey, form, setForm, stored, status }
  const handleSave = useAiSettingsSave(context)
  const handleClear = useAiSettingsClear(context)

  return {
    form,
    apiKeyMasked: stored.apiKeyMasked,
    isConfigured: stored.isConfigured,
    saveStatus: status.saveStatus,
    message: status.message,
    ...fields,
    handleSave,
    handleClear,
  }
}
