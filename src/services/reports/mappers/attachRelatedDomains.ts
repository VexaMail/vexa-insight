import { domains, getDb, normalizedEvents } from '@/lib/db'
import type { ReportRow } from '@/types/reports'
import { eq, inArray } from 'drizzle-orm'

export async function attachRelatedDomains(
  reports: ReportRow[],
): Promise<ReportRow[]> {
  if (reports.length === 0) return reports

  const db = getDb()
  const reportIds = reports.map((r) => r.id)

  const related = await db
    .selectDistinct({
      rawReportId: normalizedEvents.rawReportId,
      domainId: domains.id,
      domainName: domains.name,
    })
    .from(normalizedEvents)
    .innerJoin(domains, eq(normalizedEvents.domainId, domains.id))
    .where(inArray(normalizedEvents.rawReportId, reportIds))

  const domainMap = new Map<
    number,
    { domainId: number; domainName: string }[]
  >()
  for (const row of related) {
    const list = domainMap.get(row.rawReportId) ?? []
    list.push({ domainId: row.domainId, domainName: row.domainName })
    domainMap.set(row.rawReportId, list)
  }

  return reports.map((r) => ({
    ...r,
    relatedDomains: domainMap.get(r.id) ?? [],
  }))
}
