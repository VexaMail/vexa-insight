import {
  getDb,
  ipAddresses,
  ipHostnameEnrichments,
  normalizedEventDkimResults,
  normalizedEventPolicyOverrides,
  normalizedEvents,
} from '@/lib/db'
import type { ReportSource } from '@/types/reports'
import { eq, sql } from 'drizzle-orm'

/**
 * Returns sending sources scoped to a single raw report.
 *
 * Enriched with policy override types and primary DKIM domain/selector.
 * Uses the same base predicate (rawReportId = ?) as getReportStats
 * to guarantee aggregate/row-level consistency.
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

  const eventIds = await db
    .select({ id: normalizedEvents.id })
    .from(normalizedEvents)
    .where(eq(normalizedEvents.rawReportId, rawReportId))

  const eventIdSet = new Set(eventIds.map((e) => e.id))

  const overrides =
    eventIdSet.size > 0
      ? await db
          .select({
            eventId: normalizedEventPolicyOverrides.eventId,
            type: normalizedEventPolicyOverrides.type,
          })
          .from(normalizedEventPolicyOverrides)
          .where(
            sql`${normalizedEventPolicyOverrides.eventId} in (${sql.join(
              [...eventIdSet].map((id) => sql`${id}`),
              sql`, `,
            )})`,
          )
      : []

  const dkimResults =
    eventIdSet.size > 0
      ? await db
          .select({
            eventId: normalizedEventDkimResults.eventId,
            domain: normalizedEventDkimResults.domain,
            selector: normalizedEventDkimResults.selector,
          })
          .from(normalizedEventDkimResults)
          .where(
            sql`${normalizedEventDkimResults.eventId} in (${sql.join(
              [...eventIdSet].map((id) => sql`${id}`),
              sql`, `,
            )})`,
          )
      : []

  const ipEventMap = await db
    .select({
      id: normalizedEvents.id,
      ip: ipAddresses.ip,
    })
    .from(normalizedEvents)
    .innerJoin(ipAddresses, eq(normalizedEvents.ipAddressId, ipAddresses.id))
    .where(eq(normalizedEvents.rawReportId, rawReportId))

  const ipToEventIds = new Map<string, number[]>()
  for (const row of ipEventMap) {
    const existing = ipToEventIds.get(row.ip)
    if (existing) {
      existing.push(row.id)
    } else {
      ipToEventIds.set(row.ip, [row.id])
    }
  }

  const overridesByEvent = new Map<number, string[]>()
  for (const o of overrides) {
    const existing = overridesByEvent.get(o.eventId)
    if (existing) {
      existing.push(o.type)
    } else {
      overridesByEvent.set(o.eventId, [o.type])
    }
  }

  const dkimByEvent = new Map<number, { domain: string; selector: string }>()
  for (const d of dkimResults) {
    if (!dkimByEvent.has(d.eventId)) {
      dkimByEvent.set(d.eventId, { domain: d.domain, selector: d.selector })
    }
  }

  return rows.map((r) => {
    const relatedEventIds = ipToEventIds.get(r.ip) ?? []

    const allOverrides = new Set<string>()
    for (const eid of relatedEventIds) {
      const types = overridesByEvent.get(eid)
      if (types) {
        for (const t of types) allOverrides.add(t)
      }
    }

    let primaryDkimDomain: string | null = null
    let primaryDkimSelector: string | null = null
    for (const eid of relatedEventIds) {
      const dkim = dkimByEvent.get(eid)
      if (dkim) {
        primaryDkimDomain = dkim.domain
        primaryDkimSelector = dkim.selector
        break
      }
    }

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
      overrideTypes: [...allOverrides],
      primaryDkimDomain,
      primaryDkimSelector,
    }
  })
}
