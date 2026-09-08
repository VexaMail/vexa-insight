import type { ReportSource } from '@/types/reports'
import { queryOverrideTypesByIp } from './reportSources/queryOverrideTypesByIp'
import { queryPrimaryDkimByIp } from './reportSources/queryPrimaryDkimByIp'
import { queryReportSourceRows } from './reportSources/queryReportSourceRows'

/**
 * Returns sending sources scoped to a single raw report.
 *
 * Enriched with policy override types and primary DKIM domain/selector.
 * Uses the same base predicate (rawReportId = ?) as getReportStats
 * to guarantee aggregate/row-level consistency.
 *
 * Override types and the primary DKIM identity are resolved per source IP, not
 * per grouped row: two rows for the same IP that differ only on auth results
 * carry the same union of overrides. All three reads are scoped by
 * `rawReportId` and served by `event_raw_report_idx`.
 */
export async function getReportSources(
  rawReportId: number,
): Promise<ReportSource[]> {
  const rows = await queryReportSourceRows(rawReportId)
  const overridesByIp = await queryOverrideTypesByIp(rawReportId)
  const dkimByIp = await queryPrimaryDkimByIp(rawReportId)

  return rows.map((r) => {
    const dkim = dkimByIp.get(r.ip)

    return {
      ip: r.ip,
      hostname: r.hostname ?? null,
      countryCode: r.countryCode ?? null,
      messageCount: r.messageCount,
      spfResult: r.spfResult,
      dkimResult: r.dkimResult,
      spfAligned: r.spfAligned,
      dkimAligned: r.dkimAligned,
      disposition: r.disposition,
      overrideTypes: overridesByIp.get(r.ip) ?? [],
      primaryDkimDomain: dkim?.domain ?? null,
      primaryDkimSelector: dkim?.selector ?? null,
    }
  })
}
