import type { ReactNode } from 'react'

export type IpSummaryListProps = {
  readonly title: string
  readonly icon: ReactNode
  readonly viewAllHref: string
  readonly isEmpty: boolean
  readonly emptyText: string
  readonly children: ReactNode
}
