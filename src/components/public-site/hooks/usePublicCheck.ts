import type { SubmitEvent } from 'react'
import { useState } from 'react'
import type { PublicDomainReport } from '../../../types/public-check/PublicDomainReport'
import { fetchPublicReport } from '../fetchPublicReport'

export function usePublicCheck() {
  const [report, setReport] = useState<PublicDomainReport | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [pending, setPending] = useState(false)
  const submit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()
    const field = new FormData(event.currentTarget).get('domain')
    const domain = typeof field === 'string' ? field : ''
    setPending(true)
    setError(null)
    setReport(null)
    try {
      setReport(await fetchPublicReport(domain))
    } catch (failure) {
      setError(
        failure instanceof Error
          ? failure.message
          : 'The check could not finish. Please try again.',
      )
    } finally {
      setPending(false)
    }
  }
  return { report, error, pending, submit }
}
