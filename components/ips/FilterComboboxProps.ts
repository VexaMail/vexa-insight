export type FilterComboboxProps = Readonly<{
  value: string
  onChange: (value: string) => void
  items: { value: string; label: string; code?: string }[]
  placeholder: string
  emptyText: string
  renderIcon?: (code: string) => React.ReactNode
}>
