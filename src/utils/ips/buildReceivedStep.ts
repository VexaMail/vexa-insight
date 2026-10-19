import type { BuildIpEventStepsParams, IpEventStepData } from '@/types/ips'
import { formatMessageCount } from '../../formatters/ips/formatMessageCount'
import { formatUtcDateTime } from '../../formatters/ips/formatUtcDateTime'

/**
 * The first stage of an event: the mail arriving from the source. Aggregate
 * reports date a window, not a message, so the time is the window's start.
 */
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
    ],
    at: formatUtcDateTime(row.observedAt),
  }
}
