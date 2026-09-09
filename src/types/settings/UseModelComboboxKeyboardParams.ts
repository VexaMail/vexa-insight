import type { ProviderModelInfo } from '@/types/ai'

export type UseModelComboboxKeyboardParams = {
  readonly filtered: ProviderModelInfo[]
  readonly highlightIndex: number
  readonly setHighlightIndex: (update: (prev: number) => number) => void
  readonly onSelect: (modelId: string) => void
  readonly onClose: () => void
}
