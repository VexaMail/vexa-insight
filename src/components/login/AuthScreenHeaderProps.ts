import type { ReactNode } from 'react'

export type AuthScreenHeaderProps = {
  readonly eyebrow: string
  readonly title: string
  readonly description: ReactNode
  readonly icon?: ReactNode
}
