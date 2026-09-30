import { getDb, sndsIpData } from '@/lib/db'

/** The report dates that already have SNDS rows stored. */
export function listStoredSndsDates(): Set<string> {
  const rows = getDb()
    .selectDistinct({ reportDate: sndsIpData.reportDate })
    .from(sndsIpData)
    .all()
  return new Set(rows.map((r) => r.reportDate))
}
