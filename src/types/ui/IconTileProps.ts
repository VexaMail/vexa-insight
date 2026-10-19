import type { ReactNode } from 'react'
import type { StatusTone } from './StatusTone'

export type IconTileProps = {
  readonly children: ReactNode
  readonly tone?: StatusTone
  readonly size?: 'sm' | 'md'
  readonly className?: string
}
