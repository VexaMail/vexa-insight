import type { ProviderModelInfo } from '@/types/ai'

/**
 * Props for the ModelCombobox searchable dropdown.
 */
export type ModelComboboxProps = {
  models: ProviderModelInfo[]
  value: string
  isLoading: boolean
  error: string | null
  savedModelMissing: boolean
  onChange: (modelId: string) => void
}
