import type { StatusTone } from '@/types/ui'
import type { ReactNode } from 'react'

export type ReportFactProps = {
  readonly icon: ReactNode
  readonly label: string
  readonly tone?: StatusTone
  readonly children: ReactNode
}
