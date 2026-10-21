import { publicSiteUrl } from '@/constants/public-site'
import { useState } from 'react'
import { writePublicReportClipboard } from '../writePublicReportClipboard'

export function usePublicReportShare(domain: string, selector?: string) {
  const [feedback, setFeedback] = useState('')
  const url = `${publicSiteUrl}/${encodeURIComponent(domain)}${selector ? `?selector=${encodeURIComponent(selector)}` : ''}`
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
