import type { ReactNode } from 'react'

export type HeaderFactProps = {
  readonly icon: ReactNode
  readonly label: string
  readonly value: ReactNode
  readonly title?: string | undefined
  readonly href?: string
}
