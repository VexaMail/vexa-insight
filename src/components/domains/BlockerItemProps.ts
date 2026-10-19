import type { StatusTone } from '@/types/ui'
import type { ReactNode } from 'react'

export type BlockerItemProps = {
  readonly icon: ReactNode
  readonly count: number
  /** Colour of the count while it is above zero. */
  readonly tone: StatusTone
  readonly title: string
  readonly detail: string
  readonly href: string
  readonly action: string
}
