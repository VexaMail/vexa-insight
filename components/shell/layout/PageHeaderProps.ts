import type { ReactNode } from 'react'

export type PageHeaderProps = {
  readonly eyebrow?: ReactNode
  readonly title: ReactNode
  readonly description?: ReactNode
  readonly back?: ReactNode
  readonly actions?: ReactNode
  readonly meta?: ReactNode
}
