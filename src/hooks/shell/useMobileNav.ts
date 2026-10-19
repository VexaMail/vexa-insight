'use client'

import type { UseMobileNavReturn } from '@/types/shell'
import { useCallback, useState } from 'react'

/** Open state of the phone navigation drawer. */
export function useMobileNav(): UseMobileNavReturn {
  const [open, setOpen] = useState(false)
  const close = useCallback(() => {
    setOpen(false)
  }, [])
  return { open, setOpen, close }
}
