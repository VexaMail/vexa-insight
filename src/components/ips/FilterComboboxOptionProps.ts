import type { ReactNode } from 'react'

export type FilterComboboxOptionProps = Readonly<{
  commandValue: string
  selected: boolean
  onSelect: () => void
  children: ReactNode
}>
