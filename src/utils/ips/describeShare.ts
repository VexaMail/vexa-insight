import { formatMessageCount } from '../../formatters/ips/formatMessageCount'

/** "every message", "no message" or "12 of 40 messages". */
export function describeShare(count: number, total: number): string {
  if (count >= total) return 'every message'
  if (count === 0) return 'no message'
  return `${count.toLocaleString('en-US')} of ${formatMessageCount(total)}`
}
