import type { ReactNode } from 'react'
import type { StatusTone } from './StatusTone'

export type StatusPillProps = {
  readonly tone: StatusTone
  readonly children: ReactNode
  readonly dot?: boolean
  readonly className?: string
}
