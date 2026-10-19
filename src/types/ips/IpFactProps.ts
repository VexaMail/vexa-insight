import type { StatusTone } from '@/types/ui'
import type { ReactNode } from 'react'

export type IpFactProps = {
  readonly label: string
  readonly icon: ReactNode
  readonly tone?: StatusTone
  readonly children: ReactNode
}
