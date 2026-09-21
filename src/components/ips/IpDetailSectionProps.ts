import type { ReactNode } from 'react'

export type IpDetailSectionProps = {
  readonly title: string
  /** Search, filter and sort controls, shown under the heading. */
  readonly toolbar?: ReactNode
  readonly children: ReactNode
}
