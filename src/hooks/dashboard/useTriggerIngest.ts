'use client'

import type { UseTriggerIngestReturn } from '@/types/dashboard'
import { triggerPoll } from '@/utils/ingest'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

/**
 * Starts one ingestion run through the admin endpoint the ingest page uses,
 * then refreshes the server-rendered overview so the panel shows the run.
 */
export function useTriggerIngest(apiKey: string): UseTriggerIngestReturn {
  const router = useRouter()
  const [status, setStatus] = useState<UseTriggerIngestReturn['status']>('idle')
  const [message, setMessage] = useState('')

  function trigger(): void {
    setStatus('loading')
    void (async () => {
      const result = await triggerPoll(apiKey, false)
      setStatus(result.status)
      setMessage(result.message)
      if (result.status === 'success') router.refresh()
    })()
  }

  return { status, message, trigger }
}
