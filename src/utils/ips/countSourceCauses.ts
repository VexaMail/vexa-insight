import type { IpSourceRow, SourceCauseCounts } from '@/types/ips'

/** How many sources fall under each cause. */
export function countSourceCauses(
  rows: readonly IpSourceRow[],
): SourceCauseCounts {
  const counts: SourceCauseCounts = {
    'dmarc-pass': 0,
    forwarding: 0,
    'spf-unaligned': 0,
    failing: 0,
    unknown: 0,
  }
  for (const row of rows) counts[row.cause] += 1
  return counts
}
