import { useIngestContext } from './useIngestContext'

export function useAbortPoll(initialApiKey: string) {
  const abortStatus = useIngestContext((s) => s.abortStatus)
  const setAbortStatus = useIngestContext((s) => s.setAbortStatus)

  async function handleAbort() {
    if (!initialApiKey.trim()) return
    setAbortStatus('loading')
    try {
      const res = await fetch('/api/v1/admin/abort-poll', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': initialApiKey,
        },
      })
      if (!res.ok) {
        setAbortStatus('error')
        return
      }
    } catch {
      setAbortStatus('error')
    }
  }

  return { abortStatus, handleAbort }
}
