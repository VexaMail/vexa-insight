'use client'

import { useCallback } from 'react'

/** Copy the raw report XML to the clipboard, or download it as a file. */
export function useXmlViewerActions(rawXml: string) {
  const handleCopy = useCallback(() => {
    void navigator.clipboard.writeText(rawXml)
  }, [rawXml])

  const handleDownload = useCallback(() => {
    const blob = new Blob([rawXml], { type: 'application/xml' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'dmarc-report.xml'
    a.click()
    URL.revokeObjectURL(url)
  }, [rawXml])

  return { handleCopy, handleDownload } as const
}
