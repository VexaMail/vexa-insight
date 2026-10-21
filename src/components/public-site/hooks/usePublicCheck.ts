import type { SubmitEvent } from 'react'
import { useState } from 'react'
import { updatePublicDomainUrl } from '../updatePublicDomainUrl'
import { usePublicDomainHistory } from './usePublicDomainHistory'
import { usePublicReportRequest } from './usePublicReportRequest'

export function usePublicCheck(initialDomain: string) {
  const request = usePublicReportRequest()
  const [domain, setDomain] = useState(initialDomain)
  usePublicDomainHistory({
    initialDomain,
    load: request.load,
    reset: request.reset,
    setDomain,
  })
  const submit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()
    const field = new FormData(event.currentTarget).get('domain')
    const result = await request.load(typeof field === 'string' ? field : '')
    if (result) {
      setDomain(result.domain)
      updatePublicDomainUrl(result.domain)
    }
  }
  return {
    report: request.report,
    error: request.error,
    pending: request.pending,
    domain,
    submit,
  }
}
