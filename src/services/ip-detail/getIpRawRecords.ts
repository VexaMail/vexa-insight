import { getDb, rawReports } from '@/lib/db'
import type { IpRawRecord } from '@/types/ips'
import { extractIpRawRecords } from '@/utils/ips'
import { desc, inArray } from 'drizzle-orm'

/**
 * The aggregate report records of one source, read back from the stored XML
 * of the given reports. The ids come from the caller's scoped report list, so
 * no report outside the caller's domains is read.
 */
export async function getIpRawRecords(
  ip: string,
  reportIds: readonly number[],
): Promise<IpRawRecord[]> {
  if (reportIds.length === 0) return []
  const reports = await getDb()
    .select({
      reportDbId: rawReports.id,
      reportId: rawReports.reportId,
      orgName: rawReports.orgName,
      beginDate: rawReports.beginDate,
      rawXml: rawReports.rawXml,
    })
    .from(rawReports)
    .where(inArray(rawReports.id, [...reportIds]))
    .orderBy(desc(rawReports.endDate), desc(rawReports.id))
  return reports.flatMap(({ rawXml, ...meta }) =>
    extractIpRawRecords(rawXml, ip, meta),
  )
}
