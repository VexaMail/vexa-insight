import type { IpSummaryData } from '@/types/ips'
import { formatRelativeDate } from '@/utils/format'
import type { IpDetailStatProps } from './IpDetailStatProps'

/** The eight figures of the IP detail summary, in display order. */
export function buildIpDetailStats(data: IpSummaryData): IpDetailStatProps[] {
  const firstSeen = data.firstSeen ? formatRelativeDate(data.firstSeen) : null
  const lastSeen = data.lastSeen ? formatRelativeDate(data.lastSeen) : null
  const blocked = data.dispositionQuarantine + data.dispositionReject

  return [
    {
      label: 'Total Messages',
      value: data.totalMessages.toLocaleString(),
      kind: 'rate',
    },
    {
      label: 'Fully Aligned',
      value: `${data.fullyAlignedRate.toFixed(1)}%`,
      kind: 'rate',
    },
    {
      label: 'SPF Pass',
      value: `${data.spfPassRate.toFixed(1)}%`,
      kind: 'rate',
    },
    {
      label: 'DKIM Pass',
      value: `${data.dkimPassRate.toFixed(1)}%`,
      kind: 'rate',
    },
    {
      label: 'First Seen',
      value: firstSeen?.relative ?? 'Unknown',
      kind: 'seen',
      title: firstSeen?.absolute,
    },
    {
      label: 'Last Seen',
      value: lastSeen?.relative ?? 'Unknown',
      kind: 'seen',
      title: lastSeen?.absolute,
    },
    {
      label: 'Disposition: None',
      value: data.dispositionNone.toLocaleString(),
      kind: 'count',
    },
    {
      label: 'Quarantine / Reject',
      value: blocked.toLocaleString(),
      kind: 'count',
    },
  ]
}
