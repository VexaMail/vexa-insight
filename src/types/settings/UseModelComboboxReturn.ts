import type { ProviderModelInfo } from '@/types/ai'
import type { RefObject } from 'react'

/**
 * Return type of the useModelCombobox hook.
 */
export type UseModelComboboxReturn = {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  query: string
  setQuery: (q: string) => void
  filtered: ProviderModelInfo[]
  highlightIndex: number
  displayLabel: string
  inputRef: RefObject<HTMLInputElement | null>
  listRef: RefObject<HTMLDivElement | null>
  handleSelect: (modelId: string) => void
  handleClear: () => void
  handleKeyDown: (e: React.KeyboardEvent) => void
}
