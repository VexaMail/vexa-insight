'use client'

import type { UseModelComboboxKeyboardParams } from '@/types/settings'
import { useCallback } from 'react'

/** Arrow, Enter and Escape handling for the model list. */
export function useModelComboboxKeyboard({
  filtered,
  highlightIndex,
  setHighlightIndex,
  onSelect,
  onClose,
}: UseModelComboboxKeyboardParams): (e: React.KeyboardEvent) => void {
  return useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setHighlightIndex((prev) => (prev < filtered.length - 1 ? prev + 1 : 0))
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setHighlightIndex((prev) => (prev > 0 ? prev - 1 : filtered.length - 1))
      } else if (e.key === 'Enter' && highlightIndex >= 0) {
        e.preventDefault()
        const item = filtered[highlightIndex]
        if (item) onSelect(item.id)
      } else if (e.key === 'Escape') {
        onClose()
      }
    },
    [filtered, highlightIndex, setHighlightIndex, onSelect, onClose],
  )
}
