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

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault()
    setStatus('loading')
    setMessage('')
    setActiveTab('pollResults')
    setRunRequested(true)
    try {
      const res = await fetch('/api/v1/admin/trigger-poll', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': apiKey,
        },
      })
      const json = (await res.json()) as
        | {
            data?: {
              success?: boolean
              processed?: number
              ingested?: number
              errors?: number
            }
          }
        | { error?: { message?: string } }
      if (!res.ok) {
        setRunRequested(false)
        const err = json as { error?: { message?: string } }
        setMessage(err.error?.message ?? `Error ${res.status}`)
        setStatus('error')
        return
      }
      const data = json as {
        data?: {
          success?: boolean
          processed?: number
          ingested?: number
          errors?: number
        }
      }
      setMessage(
        data.data?.success
          ? `Processed ${data.data.processed ?? 0}, ingested ${data.data.ingested ?? 0}.`
          : `Done with ${data.data?.errors ?? 0} errors.`,
      )
      setStatus('success')
    } catch {
      setRunRequested(false)
      setMessage('Request failed.')
      setStatus('error')
    }
  }

  return {
    apiKey,
    setApiKey,
    status,
    message,
    handleSubmit,
  }
}
