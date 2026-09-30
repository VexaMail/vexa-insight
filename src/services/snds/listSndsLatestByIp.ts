import { getDb, sndsIpData } from '@/lib/db'
import type { SndsLatestIpRow } from '@/types/snds'
import { desc } from 'drizzle-orm'

/** The newest stored SNDS day for every IP, busiest first. */
export function listSndsLatestByIp(): SndsLatestIpRow[] {
  const rows = getDb()
    .select({
      ip: sndsIpData.ip,
      reportDate: sndsIpData.reportDate,
      filterResult: sndsIpData.filterResult,
      complaintRate: sndsIpData.complaintRate,
      trapHits: sndsIpData.trapHits,
      messageRecipients: sndsIpData.messageRecipients,
    })
    .from(sndsIpData)
    .orderBy(desc(sndsIpData.reportDate))
    .all()
  const latest = new Map<string, SndsLatestIpRow>()
  for (const row of rows) {
    if (!latest.has(row.ip)) latest.set(row.ip, row)
  }
  return [...latest.values()].sort(
    (a, b) => (b.messageRecipients ?? 0) - (a.messageRecipients ?? 0),
  )
}
