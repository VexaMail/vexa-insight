'use client'

import type { ProviderModelInfo } from '@/types/ai'
import type { UseModelComboboxReturn } from '@/types/settings'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useModelFilter } from './useModelFilter'

/**
 * Manages all state and logic for the ModelCombobox component.
 */
export function useModelCombobox(
  models: ProviderModelInfo[],
  value: string,
  onChange: (modelId: string) => void,
): UseModelComboboxReturn {
  const [isOpen, setIsOpen] = useState(false)
  const [highlightIndex, setHighlightIndex] = useState(-1)
  const { query, setQuery, filtered } = useModelFilter(models)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  const selectedModel = models.find((m) => m.id === value)
  const displayLabel = selectedModel?.name ?? (value || 'Default (auto)')

  const handleSelect = useCallback(
    (modelId: string) => {
      onChange(modelId)
      setQuery('')
      setIsOpen(false)
    },
    [onChange, setQuery],
  )

  const handleClear = useCallback(() => {
    onChange('')
    setQuery('')
    setIsOpen(false)
  }, [onChange, setQuery])

  const wrappedSetQuery = useCallback(
    (q: string) => {
      setQuery(q)
      setHighlightIndex(-1)
    },
    [setQuery],
  )

  const wrappedSetIsOpen = useCallback(
    (open: boolean) => {
      setIsOpen(open)
      if (!open) {
        setQuery('')
        setHighlightIndex(-1)
      }
    },
    [setQuery],
  )

  const handleKeyDown = useCallback(
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
        if (item) handleSelect(item.id)
      } else if (e.key === 'Escape') {
        wrappedSetIsOpen(false)
      }
    },
    [filtered, highlightIndex, handleSelect, wrappedSetIsOpen],
  )

  // Scroll highlighted item into view
  useEffect(() => {
    if (highlightIndex < 0 || !listRef.current) return
    const el = listRef.current.children[highlightIndex] as
      | HTMLElement
      | undefined
    el?.scrollIntoView({ block: 'nearest' })
  }, [highlightIndex])

  return {
    isOpen,
    setIsOpen: wrappedSetIsOpen,
    query,
    setQuery: wrappedSetQuery,
    filtered,
    highlightIndex,
    displayLabel,
    inputRef,
    listRef,
    handleSelect,
    handleClear,
    handleKeyDown,
  }
}
