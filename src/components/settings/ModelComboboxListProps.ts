import type { ProviderModelInfo } from '@/types/ai'
import type { RefObject } from 'react'

export type ModelComboboxListProps = {
  readonly listRef: RefObject<HTMLDivElement | null>
  readonly listboxId: string
  readonly models: readonly ProviderModelInfo[]
  readonly query: string
  readonly value: string | undefined
  readonly highlightIndex: number
  readonly onSelect: (id: string) => void
  readonly onClear: () => void
}
