import type {
  SettingsConfigFormProps,
  SettingsSaveStatus,
} from '@/types/settings'
import { saveSettings, toSavedFormState } from '@/utils/settings'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useApiKeyActions } from './useApiKeyActions'
import { useImapAccountsForm } from './useImapAccountsForm'
import { useSettingsFormState } from './useSettingsFormState'

export function useSettingsConfig(
  initialData: SettingsConfigFormProps['initialData'],
) {
  const router = useRouter()
  // Read-only since ADR 0010: the key is the environment's, and the page has
  // no way to change it.
  const apiKey = initialData?.apiToken ?? ''
  const { form, setForm, isDirty, markSaved } =
    useSettingsFormState(initialData)
  const [saveStatus, setSaveStatus] = useState<SettingsSaveStatus>('idle')
  const [message, setMessage] = useState('')

  const apiKeyActions = useApiKeyActions({
    apiKey,
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
      const saved = toSavedFormState(await saveSettings(form, apiKey))
      setForm(saved)
      markSaved(saved)
      router.refresh()
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
    isDirty,
    saveStatus,
    message,
    ...apiKeyActions,
    ...imapActions,
    handleSubmit,
  }
}
