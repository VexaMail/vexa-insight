import type { ReactNode } from 'react'

export type DomainRowActionProps = {
  readonly href: string
  readonly title: string
  readonly icon: ReactNode
  readonly onNavigate?: (() => void) | undefined
}
