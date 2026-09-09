'use client'

import type { ProviderModelInfo } from '@/types/ai'
import type { UseModelComboboxReturn } from '@/types/settings'
import { useCallback, useRef } from 'react'
import { useModelComboboxKeyboard } from './useModelComboboxKeyboard'
import { useModelComboboxOpenState } from './useModelComboboxOpenState'
import { useModelFilter } from './useModelFilter'
import { useScrollHighlightedChildIntoView } from './useScrollHighlightedChildIntoView'

/**
 * Manages all state and logic for the ModelCombobox component.
 */
export function useModelCombobox(
  models: ProviderModelInfo[],
  value: string,
  onChange: (modelId: string) => void,
): UseModelComboboxReturn {
  const { query, setQuery: setRawQuery, filtered } = useModelFilter(models)
  const open = useModelComboboxOpenState(setRawQuery)
  const { closeList, setIsOpen } = open
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  const selectedModel = models.find((m) => m.id === value)
  const displayLabel = selectedModel?.name ?? (value || 'Default (auto)')

  const handleSelect = useCallback(
    (modelId: string) => {
      onChange(modelId)
      setRawQuery('')
      closeList()
    },
    [onChange, setRawQuery, closeList],
  )

  const handleClear = useCallback(() => {
    onChange('')
    setRawQuery('')
    closeList()
  }, [onChange, setRawQuery, closeList])

  const handleKeyDown = useModelComboboxKeyboard({
    filtered,
    highlightIndex: open.highlightIndex,
    setHighlightIndex: open.setHighlightIndex,
    onSelect: handleSelect,
    onClose: useCallback(() => {
      setIsOpen(false)
    }, [setIsOpen]),
  })

  useScrollHighlightedChildIntoView(listRef, open.highlightIndex)

  return {
    isOpen: open.isOpen,
    setIsOpen,
    query,
    setQuery: open.setQuery,
    filtered,
    highlightIndex: open.highlightIndex,
    displayLabel,
    inputRef,
    listRef,
    handleSelect,
    handleClear,
    handleKeyDown,
  }
}
