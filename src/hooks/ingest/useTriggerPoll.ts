import { triggerPoll } from '@/utils/ingest'
import { useState } from 'react'

import { useIngestContext } from './useIngestContext'

export function useTriggerPoll(initialApiKey: string) {
  const setRunRequested = useIngestContext((s) => s.setRunRequested)
  const setActiveTab = useIngestContext((s) => s.setActiveTab)
  const [apiKey, setApiKey] = useState(() => initialApiKey)
  const [status, setStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle')
  const [message, setMessage] = useState('')

  async function run(fullRescan: boolean) {
    setStatus('loading')
    setMessage('')
    setActiveTab('pollResults')
    setRunRequested(true)

    const result = await triggerPoll(apiKey, fullRescan)
    if (result.status === 'error') {
      setRunRequested(false)
    }
    setMessage(result.message)
    setStatus(result.status)
  }

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault()
    await run(false)
  }

  async function handleFullRescan() {
    await run(true)
  }

  return {
    apiKey,
    setApiKey,
    status,
    message,
    handleSubmit,
    handleFullRescan,
  }
}
