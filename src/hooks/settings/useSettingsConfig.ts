import type {
  SettingsConfigFormProps,
  SettingsFormState,
  SettingsSaveStatus,
} from '@/types/settings'
import {
  getSettingsFormState,
  saveSettings,
  toSavedFormState,
} from '@/utils/settings'
import { useState } from 'react'
import { useApiKeyActions } from './useApiKeyActions'
import { useImapAccountsForm } from './useImapAccountsForm'

export function useSettingsConfig(
  initialData: SettingsConfigFormProps['initialData'],
) {
  const [apiKey, setApiKey] = useState(initialData?.secretKey ?? '')
  const [form, setForm] = useState<SettingsFormState>(() =>
    getSettingsFormState(initialData),
  )
  const [saveStatus, setSaveStatus] = useState<SettingsSaveStatus>('idle')
  const [message, setMessage] = useState('')

  const apiKeyActions = useApiKeyActions({
    apiKey,
    setForm,
    setMessage,
    setSaveStatus,
  })
  const imapActions = useImapAccountsForm(setForm)

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault()
    if (!apiKey.trim()) return
    setSaveStatus('loading')
    setMessage('')
    try {
      const saved = await saveSettings(form, apiKey)
      setForm(toSavedFormState(saved))
      if (form.secretKeyNew.trim()) setApiKey(form.secretKeyNew)
      setSaveStatus('success')
      setMessage('Settings saved.')
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Request failed.')
      setSaveStatus('error')
    }
  }

  return {
    apiKey,
    form,
    setForm,
    saveStatus,
    message,
    ...apiKeyActions,
    ...imapActions,
    handleSubmit,
  }
}
