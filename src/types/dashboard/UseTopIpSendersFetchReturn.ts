import type { Dispatch, SetStateAction } from 'react'
import type { TopIpSender } from './TopIpSender'

export type UseTopIpSendersFetchReturn = {
  readonly ips: TopIpSender[]
  readonly setIps: Dispatch<SetStateAction<TopIpSender[]>>
  readonly isLoading: boolean
}
