import type { TopIpSender } from './TopIpSender'

export type UseTopIpSendersTableReturn = {
  readonly ips: TopIpSender[]
  readonly maxMessages: number
  readonly refreshingIps: ReadonlySet<string>
  readonly handleRefreshClick: (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => void
  readonly isLoading: boolean
}
