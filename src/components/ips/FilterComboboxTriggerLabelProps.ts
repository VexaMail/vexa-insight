import type { ReactNode } from 'react'
import type { FilterComboboxItem } from './FilterComboboxItem'

export type FilterComboboxTriggerLabelProps = Readonly<{
  selectedItem: FilterComboboxItem | undefined
  placeholder: string
  renderIcon: ((code: string) => ReactNode) | undefined
}>
