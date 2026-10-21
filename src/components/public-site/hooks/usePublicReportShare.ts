import { publicSiteUrl } from '@/constants/public-site'
import { useState } from 'react'
import { writePublicReportClipboard } from '../writePublicReportClipboard'

export function usePublicReportShare(domain: string) {
  const [feedback, setFeedback] = useState('')
  const url = `${publicSiteUrl}/${encodeURIComponent(domain)}`
  const copy = async () => {
    setFeedback('Copying report link…')
    try {
      await writePublicReportClipboard(url)
      setFeedback('Report link copied')
    } catch {
      setFeedback('Copy the report link below')
    }
  }
  return { url, feedback, copy }
}
