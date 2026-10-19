import type { StatusTone } from '@/types/ui'
import type { ReactNode } from 'react'

export type ResultPillProps = {
  readonly tone: StatusTone
  readonly children: ReactNode
  readonly title?: string | undefined
}
