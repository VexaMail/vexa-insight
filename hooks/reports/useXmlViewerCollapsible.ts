'use client'

import { useCallback, useState } from 'react'

/**
 * Manages collapsible XML viewer state: open/close, copy, download.
 */
export function useXmlViewerCollapsible(rawXml: string | null) {
  const [isOpen, setIsOpen] = useState(false)

  const handleToggle = useCallback(
    (e: React.SyntheticEvent<HTMLDetailsElement>) => {
      setIsOpen((e.target as HTMLDetailsElement).open)
    },
    [],
  )

  const handleCopy = useCallback(() => {
    if (rawXml) {
      void navigator.clipboard.writeText(rawXml)
    }
  }, [rawXml])

  const handleDownload = useCallback(() => {
    if (!rawXml) return
    const blob = new Blob([rawXml], { type: 'application/xml' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'dmarc-report.xml'
    a.click()
    URL.revokeObjectURL(url)
  }, [rawXml])

  return { isOpen, handleToggle, handleCopy, handleDownload } as const
}
