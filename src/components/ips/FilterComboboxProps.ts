import type { FilterComboboxItem } from './FilterComboboxItem'

export type FilterComboboxProps = Readonly<{
  value: string
  onChange: (value: string) => void
  items: FilterComboboxItem[]
  placeholder: string
  emptyText: string
  renderIcon?: (code: string) => React.ReactNode
}>
