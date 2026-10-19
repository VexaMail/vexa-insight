import type { IpLogRow } from '@/types/IpLogRow'
import type { IpEventFilter } from '@/types/ips'

/** The events whose DMARC outcome (SPF or DKIM aligned) matches the filter. */
export function filterIpEvents(
  rows: readonly IpLogRow[],
  filter: IpEventFilter,
): IpLogRow[] {
  if (filter === 'all') return [...rows]
  return rows.filter((row) => {
    const pass = row.spfResult === 'pass' || row.dkimResult === 'pass'
    return filter === 'pass' ? pass : !pass
  })
}
