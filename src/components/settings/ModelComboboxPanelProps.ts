import type { ProviderModelInfo } from '@/types/ai'
import type { UseModelComboboxReturn } from '@/types/settings'

export type ModelComboboxPanelProps = {
  readonly combobox: UseModelComboboxReturn
  readonly models: ProviderModelInfo[]
  readonly value: string
}
