import type { ReactNode } from 'react'

export type HealthFactProps = {
  readonly label: string
  readonly children: ReactNode
  /** Full value on hover, e.g. the absolute time behind "3 hours ago". */
  readonly title?: string | undefined
}
