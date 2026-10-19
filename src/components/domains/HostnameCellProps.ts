import type { SenderIdentity } from '@/types/senders'

export type HostnameCellProps = {
  readonly hostname: string | null
  /** The named sending service, shown under the hostname when recognised. */
  readonly sender?: SenderIdentity | undefined
  readonly isRefreshing: boolean
  readonly onRefresh: () => void
}
