import type { TopIpSender } from '@/types/dashboard'
import type { MouseEvent } from 'react'

export type TopIpSenderRowProps = {
  readonly sender: TopIpSender
  readonly maxMessages: number
  readonly isRefreshing: boolean
  readonly onRefresh: (event: MouseEvent) => void
}
