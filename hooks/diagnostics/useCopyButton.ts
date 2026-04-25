'use client'

import { useCallback, useState } from 'react'

export function useCopyButton(text: string) {
  const [copied, setCopied] = useState(false)

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [text])

  return { copied, handleCopy }
}
