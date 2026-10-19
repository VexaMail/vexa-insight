import type { ReactNode } from 'react'

export type RowActionButtonsProps = {
  /** Name of the row, for the buttons' accessible names. */
  readonly name: string
  readonly busy: boolean
  readonly onEdit: () => void
  readonly onDelete: () => void
  /** Extra buttons before Edit, e.g. a test send. */
  readonly children?: ReactNode
}
