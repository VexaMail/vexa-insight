'use client'

import type { ModelComboboxOpenState } from '@/types/settings'
import { useCallback, useState } from 'react'

/** Open flag and highlighted row; the query resets when either changes. */
export function useModelComboboxOpenState(
  setRawQuery: (q: string) => void,
): ModelComboboxOpenState {
  const [isOpen, setIsOpen] = useState(false)
  const [highlightIndex, setHighlightIndex] = useState(-1)

  const setQuery = useCallback(
    (q: string) => {
      setRawQuery(q)
      setHighlightIndex(-1)
    },
    [setRawQuery],
  )

  const setOpen = useCallback(
    (open: boolean) => {
      setIsOpen(open)
      if (!open) {
        setRawQuery('')
        setHighlightIndex(-1)
      }
    },
    [setRawQuery],
  )

  const closeList = useCallback(() => {
    setIsOpen(false)
  }, [])

  return {
    isOpen,
    setIsOpen: setOpen,
    closeList,
    highlightIndex,
    setHighlightIndex,
    setQuery,
  }
}
