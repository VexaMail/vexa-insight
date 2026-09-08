import type { ReactNode } from 'react'

export type SortHeaderButtonProps = {
  readonly label: ReactNode
  readonly active: boolean
  readonly dir: 'asc' | 'desc'
  readonly onSort: () => void
}
