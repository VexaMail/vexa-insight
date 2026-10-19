import type { ReactNode } from 'react'

export type ReportHeaderFactProps = {
  readonly icon: ReactNode
  /** Read to screen readers before the value. */
  readonly label: string
  readonly children: ReactNode
}
