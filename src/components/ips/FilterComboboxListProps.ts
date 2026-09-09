import type { ReactNode } from 'react'
import type { FilterComboboxItem } from './FilterComboboxItem'

export type FilterComboboxListProps = Readonly<{
  value: string
  items: FilterComboboxItem[]
  placeholder: string
  emptyText: string
  renderIcon: ((code: string) => ReactNode) | undefined
  onSelect: (value: string) => void
}>
