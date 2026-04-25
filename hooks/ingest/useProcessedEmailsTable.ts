import { useListState } from '@/hooks/core'

import { useState } from 'react'
import type { ProcessedEmail } from '../../types/ingest/ProcessedEmail'

export function useProcessedEmailsTable(emails: ProcessedEmail[]) {
  const setScope = useListState((s) => s.setScope)
  const [viewingEmail, setViewingEmail] = useState<ProcessedEmail | null>(null)
  const [contentLoading, setContentLoading] = useState(false)
  const [fileContent, setFileContent] = useState<string | null>(null)
  const [contentError, setContentError] = useState<string | null>(null)

  function handleViewEmail(email: ProcessedEmail) {
    setScope(emails.map((e) => e.messageId))
    setViewingEmail(email)
    setContentLoading(true)
    setFileContent(null)
    setContentError(null)
    const fetchContent = async () => {
      try {
        const res = await fetch(
          `/api/v1/processed-messages/content?messageId=${encodeURIComponent(email.messageId)}`,
        )
        const resData = (await res.json()) as {
          error?: { message: string }
          data?: { rawXml: string }
        }
        if (resData.error) {
          setContentError(resData.error.message)
        } else {
          setFileContent(resData.data?.rawXml ?? null)
        }
      } catch {
        setContentError('Failed to fetch file content')
      } finally {
        setContentLoading(false)
      }
    }
    void fetchContent()
  }

  return {
    viewingEmail,
    setViewingEmail,
    contentLoading,
    fileContent,
    contentError,
    handleViewEmail,
  }
}
