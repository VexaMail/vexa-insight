import type { StatusTone } from '@/types/ui'
import type { ReactNode } from 'react'

export type IpEventStepProps = {
  readonly label: string
  readonly tone: StatusTone
  readonly verdict: string
  readonly children?: ReactNode
}
