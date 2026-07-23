import type {
  SettingsConfigFormProps,
  SettingsFormState,
  SettingsPublic,
} from '@/types/settings'
import { generateApiKey, getSettingsFormState } from '@/utils/settings'
import { useState } from 'react'
import type { ImapAccountFormEntry } from '../../types/settings/ImapAccountFormEntry'

export function useSettingsConfig(
  initialData: SettingsConfigFormProps['initialData'],
) {
  const [apiKey, setApiKey] = useState(initialData?.secretKey ?? '')
  const [form, setForm] = useState<SettingsFormState>(() =>
    getSettingsFormState(initialData),
  )
  const [saveStatus, setSaveStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle')
  const [message, setMessage] = useState('')

  function handleCopyApiKey() {
    if (!apiKey.trim()) return
    void navigator.clipboard.writeText(apiKey)
    setMessage('API key copied to clipboard.')
    setSaveStatus('success')
    setTimeout(() => setMessage(''), 2000)
  }

  function handleGenerateNewApiKey() {
    setForm((prev) => ({ ...prev, secretKeyNew: generateApiKey() }))
  }

  async function handleTestConnection(accountId: number) {
    if (!apiKey.trim()) return
    try {
      const res = await fetch('/api/v1/imap/test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': apiKey,
        },
        body: JSON.stringify({ accountId }),
      })
      const json = (await res.json()) as
        { data?: { message?: string } } | { error?: { message?: string } }
      if (res.ok) {
        setMessage((json as { data: { message: string } }).data.message)
        setSaveStatus('success')
      } else {
        setMessage((json as { error: { message: string } }).error.message)
        setSaveStatus('error')
      }
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
      imapAccounts: [
        ...prev.imapAccounts,
        {
          id: 0,
          label: '',
          server: '',
          port: 993,
          username: '',
          passwordMasked: false,
          passwordNew: '',
          fetchIncludeTrash: false,
          fetchIncludeAllFolders: false,
          postProcessAction: 'none',
          postProcessFolder: null,
          moveToTrashAfterProcess: false,
          markAsReadAfterProcess: false,
        },
      ],
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
      const payload: Record<string, unknown> = {
        imapAccounts: form.imapAccounts.map((acc) => ({
          ...(acc.id > 0 ? { id: acc.id } : {}),
          label: acc.label,
          server: acc.server,
          port: acc.port,
          username: acc.username,
          fetchIncludeTrash: acc.fetchIncludeTrash ?? false,
          fetchIncludeAllFolders: acc.fetchIncludeAllFolders ?? false,
          postProcessAction: acc.postProcessAction ?? 'none',
          postProcessFolder: acc.postProcessFolder ?? null,
          moveToTrashAfterProcess: acc.moveToTrashAfterProcess ?? false,
          markAsReadAfterProcess: acc.markAsReadAfterProcess ?? false,
          ...(acc.passwordNew?.trim() ? { password: acc.passwordNew } : {}),
        })),
        ingestionIntervalMinutes: form.ingestionIntervalMinutes,
        ingestionDaysBack: form.ingestionDaysBack,
        ingestionIncludeTrash: form.ingestionIncludeTrash,
        ingestionIncludeAllFolders: form.ingestionIncludeAllFolders,
        backendCorsOrigins: form.backendCorsOrigins,
        environment: form.environment,
        ipHostnameLookupEnabled: form.ipHostnameLookupEnabled,
        ipHostnameRefreshIntervalHours: form.ipHostnameRefreshIntervalHours,
        ipHostnameTimeoutMs: form.ipHostnameTimeoutMs,
        ipHostnameMaxRetries: form.ipHostnameMaxRetries,
        ipHostnameRetryBackoffMinutes: form.ipHostnameRetryBackoffMinutes,
        ipHostnameBatchSize: form.ipHostnameBatchSize,
        ipHostnameManualRefreshEnabled: form.ipHostnameManualRefreshEnabled,
        ipHostnameAllowPrivateIps: form.ipHostnameAllowPrivateIps,
        ipHostnameNegativeCacheHours: form.ipHostnameNegativeCacheHours,
      }
      if (form.secretKeyNew.trim()) payload.secretKey = form.secretKeyNew
      const res = await fetch('/api/v1/admin/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': apiKey,
        },
        body: JSON.stringify(payload),
      })
      const json = (await res.json()) as
        { data?: SettingsPublic } | { error?: { message?: string } }
      if (!res.ok) {
        const err = json as { error?: { message?: string } }
        setMessage(err.error?.message ?? `Error ${res.status}`)
        setSaveStatus('error')
        return
      }
      const data = (json as { data: SettingsPublic }).data
      setForm({
        ...data,
        imapAccounts: data.imapAccounts.map((a) => ({
          ...a,
          passwordNew: '',
        })),
        secretKeyNew: '',
      })
      if (form.secretKeyNew.trim()) setApiKey(form.secretKeyNew)
      setSaveStatus('success')
      setMessage('Settings saved.')
    } catch {
      setMessage('Request failed.')
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
