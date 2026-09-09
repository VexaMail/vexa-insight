import type { UseApiKeyActionsParams } from '@/types/settings'
import { generateApiKey, testImapConnection } from '@/utils/settings'

/** Copy, regenerate and test-connection handlers bound to the current key. */
export function useApiKeyActions({
  apiKey,
  setForm,
  setMessage,
  setSaveStatus,
}: UseApiKeyActionsParams) {
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

  return { handleCopyApiKey, handleGenerateNewApiKey, handleTestConnection }
}
