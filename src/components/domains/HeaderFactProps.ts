import type { ReactNode } from 'react'

export type HeaderFactProps = {
  readonly icon: ReactNode
  readonly label: string
  readonly value: ReactNode
  /** Small line under the value, e.g. the absolute date. */
  readonly hint?: ReactNode
  readonly title?: string | undefined
  readonly href?: string
}
