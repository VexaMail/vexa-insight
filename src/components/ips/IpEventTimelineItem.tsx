import type { IpEventTimelineItemProps } from '@/types/ips'
import { resultTone } from '@/utils/ips'
import { IpEventHeading } from './IpEventHeading'
import { IpEventReportLink } from './IpEventReportLink'
import { IpEventSteps } from './IpEventSteps'
import { IpEventTimelineDot } from './IpEventTimelineDot'

/** One event: when, for which domain, SPF, DKIM and DMARC, and its report. */
export function IpEventTimelineItem({
  row,
}: Readonly<IpEventTimelineItemProps>) {
  const dmarc =
    row.spfResult === 'pass' || row.dkimResult === 'pass' ? 'pass' : 'fail'
  return (
    <li className="relative pl-6">
      <IpEventTimelineDot tone={resultTone(dmarc)} />
      <IpEventHeading row={row} />
      <IpEventSteps row={row} dmarc={dmarc} />
      <IpEventReportLink row={row} />
    </li>
  )
}
