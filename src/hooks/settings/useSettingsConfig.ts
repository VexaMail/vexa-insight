import type {
  ImapAccountFormEntry,
  SettingsConfigFormProps,
  SettingsFormState,
  SettingsSaveStatus,
} from '@/types/settings'
import {
  generateApiKey,
  getSettingsFormState,
  newImapAccountEntry,
  saveSettings,
  testImapConnection,
  toSavedFormState,
} from '@/utils/settings'
import { useState } from 'react'

export function useSettingsConfig(
  initialData: SettingsConfigFormProps['initialData'],
) {
  const [apiKey, setApiKey] = useState(initialData?.secretKey ?? '')
  const [form, setForm] = useState<SettingsFormState>(() =>
    getSettingsFormState(initialData),
  )
  const [saveStatus, setSaveStatus] = useState<SettingsSaveStatus>('idle')
  const [message, setMessage] = useState('')

  function handleCopyApiKey() {
    if (!apiKey.trim()) return
    void navigator.clipboard.writeText(apiKey)
    setMessage('API key copied to clipboard.')
    setSaveStatus('success')
    setTimeout(() => {
      setMessage('')
    }, 2000)
  }

  function handleGenerateNewApiKey() {
    setForm((prev) => ({ ...prev, secretKeyNew: generateApiKey() }))
  }

  async function handleTestConnection(accountId: number) {
    if (!apiKey.trim()) return
    try {
      const result = await testImapConnection(accountId, apiKey)
      setMessage(result.message)
      setSaveStatus(result.ok ? 'success' : 'error')
    } catch {
      setMessage('Test request failed.')
      setSaveStatus('error')
    }
  }

  function handleImapUpdate(
    index: number,
    updates: Partial<ImapAccountFormEntry>,
  ) {
    setForm((prev) => ({
      ...prev,
      imapAccounts: prev.imapAccounts.map((a, i) =>
        i === index ? { ...a, ...updates } : a,
      ),
    }))
  }

  function handleImapAdd() {
    setForm((prev) => ({
      ...prev,
      imapAccounts: [...prev.imapAccounts, newImapAccountEntry()],
    }))
  }

  function handleImapRemove(index: number) {
    setForm((prev) => ({
      ...prev,
      imapAccounts: prev.imapAccounts.filter((_, i) => i !== index),
    }))
  }

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
    handleCopyApiKey,
    handleGenerateNewApiKey,
    handleTestConnection,
    handleImapUpdate,
    handleImapAdd,
    handleImapRemove,
    handleSubmit,
  }
}
