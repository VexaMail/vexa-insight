import type { TopIpSender } from '@/types/dashboard'

export type UseTopIpSendersTableReturn = {
  readonly ips: TopIpSender[]
  readonly maxMessages: number
  readonly refreshingIps: ReadonlySet<string>
  readonly handleRefreshClick: (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => void
  readonly isLoading: boolean
}
