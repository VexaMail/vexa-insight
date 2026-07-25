import {
  getDb,
  ipAddresses,
  ipHostnameEnrichments,
  normalizedEventDkimResults,
  normalizedEventPolicyOverrides,
  normalizedEvents,
} from '@/lib/db'
import type { ReportSource } from '@/types/reports'
import { asc, eq, sql } from 'drizzle-orm'

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
  const db = getDb()

  const rows = await db
    .select({
      ip: ipAddresses.ip,
      countryCode: ipAddresses.countryCode,
      hostname: ipHostnameEnrichments.hostname,
      messageCount:
        sql<number>`cast(sum(${normalizedEvents.count}) as integer)`.as(
          'message_count',
        ),
      spfResult: normalizedEvents.spfResult,
      dkimResult: normalizedEvents.dkimResult,
      spfAligned: normalizedEvents.spfAligned,
      dkimAligned: normalizedEvents.dkimAligned,
      disposition: normalizedEvents.disposition,
    })
    .from(normalizedEvents)
    .innerJoin(ipAddresses, eq(normalizedEvents.ipAddressId, ipAddresses.id))
    .leftJoin(
      ipHostnameEnrichments,
      eq(ipAddresses.ip, ipHostnameEnrichments.ip),
    )
    .where(eq(normalizedEvents.rawReportId, rawReportId))
    .groupBy(
      ipAddresses.id,
      ipHostnameEnrichments.hostname,
      normalizedEvents.spfResult,
      normalizedEvents.dkimResult,
      normalizedEvents.spfAligned,
      normalizedEvents.dkimAligned,
      normalizedEvents.disposition,
    )
    .orderBy(sql`message_count desc`)

  // Distinct (ip, override type) pairs for the report, deduplicated in SQL.
  const overrideRows = await db
    .select({
      ip: ipAddresses.ip,
      type: normalizedEventPolicyOverrides.type,
    })
    .from(normalizedEventPolicyOverrides)
    .innerJoin(
      normalizedEvents,
      eq(normalizedEventPolicyOverrides.eventId, normalizedEvents.id),
    )
    .innerJoin(ipAddresses, eq(normalizedEvents.ipAddressId, ipAddresses.id))
    .where(eq(normalizedEvents.rawReportId, rawReportId))
    .groupBy(ipAddresses.ip, normalizedEventPolicyOverrides.type)

  // Ordered by event then result id so the first row per IP is deterministic.
  const dkimRows = await db
    .select({
      ip: ipAddresses.ip,
      domain: normalizedEventDkimResults.domain,
      selector: normalizedEventDkimResults.selector,
    })
    .from(normalizedEventDkimResults)
    .innerJoin(
      normalizedEvents,
      eq(normalizedEventDkimResults.eventId, normalizedEvents.id),
    )
    .innerJoin(ipAddresses, eq(normalizedEvents.ipAddressId, ipAddresses.id))
    .where(eq(normalizedEvents.rawReportId, rawReportId))
    .orderBy(asc(normalizedEvents.id), asc(normalizedEventDkimResults.id))

  const overridesByIp = new Map<string, string[]>()
  for (const row of overrideRows) {
    const existing = overridesByIp.get(row.ip)
    if (existing) {
      existing.push(row.type)
    } else {
      overridesByIp.set(row.ip, [row.type])
    }
  }

  const dkimByIp = new Map<string, { domain: string; selector: string }>()
  for (const row of dkimRows) {
    if (!dkimByIp.has(row.ip)) {
      dkimByIp.set(row.ip, { domain: row.domain, selector: row.selector })
    }
  }

  return rows.map((r) => {
    const dkim = dkimByIp.get(r.ip)

    return {
      ip: r.ip,
      hostname: r.hostname ?? null,
      countryCode: r.countryCode ?? null,
      messageCount: Number(r.messageCount),
      spfResult: r.spfResult,
      dkimResult: r.dkimResult,
      spfAligned: Boolean(r.spfAligned),
      dkimAligned: Boolean(r.dkimAligned),
      disposition: r.disposition,
      overrideTypes: overridesByIp.get(r.ip) ?? [],
      primaryDkimDomain: dkim?.domain ?? null,
      primaryDkimSelector: dkim?.selector ?? null,
    }
  })
}
