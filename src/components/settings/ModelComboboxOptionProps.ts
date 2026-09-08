import type { ReactNode } from 'react'

export type ModelComboboxOptionProps = {
  readonly selected: boolean
  readonly highlighted: boolean
  readonly onSelect: () => void
  readonly children: ReactNode
}
