'use client'

import type { UseMenuStateReturn } from '@/types/ips'
import { useCallback, useState } from 'react'

/** Open state of a popover menu, closed again when an item is chosen. */
export function useMenuState(): UseMenuStateReturn {
  const [open, setOpen] = useState(false)
  const close = useCallback(() => {
    setOpen(false)
  }, [])
  return { open, setOpen, close }
}
