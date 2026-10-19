import type { DnsHistoryEntry } from '@/types/dns-history'

export type DnsHistoryPanelProps = {
  readonly domainId: number
  readonly entries: readonly DnsHistoryEntry[]
}
