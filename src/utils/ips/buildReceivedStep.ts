import type { BuildIpEventStepsParams, IpEventStepData } from '@/types/ips'
import { formatRelativeDate } from '@/utils/format'
import { formatMessageCount } from '../../formatters/ips/formatMessageCount'

/** The first stage of an event: the mail arriving from the source. */
export function buildReceivedStep({
  row,
  ip,
  hostname,
}: BuildIpEventStepsParams): IpEventStepData {
  return {
    kind: 'received',
    title: `Email received from ${ip}`,
    tone: 'info',
    verdict: null,
    lines: [
      hostname ? `via ${hostname}` : 'No reverse DNS',
      `${formatMessageCount(row.count)} as ${row.headerFrom}`,
      `Report window from ${formatRelativeDate(row.observedAt).absolute}`,
    ],
  }
}
