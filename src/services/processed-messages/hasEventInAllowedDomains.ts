import { getDb, normalizedEvents } from '@/lib/db'
import type { Column, SQL } from 'drizzle-orm'
import { and, eq, exists, inArray, sql } from 'drizzle-orm'

/**
 * SQL predicate that holds when the raw report referenced by `rawReportId`
 * has at least one normalized event in one of `allowedIds`. This is how a
 * raw report relates to domains, so it is the check every domain-scoped read
 * of `raw_reports` applies for a restricted caller (see getAllowedDomainIds).
 */
export function hasEventInAllowedDomains(
  rawReportId: Column,
  allowedIds: number[],
): SQL {
  const db = getDb()
  return exists(
    db
      .select({ one: sql`1` })
      .from(normalizedEvents)
      .where(
        and(
          eq(normalizedEvents.rawReportId, rawReportId),
          inArray(normalizedEvents.domainId, allowedIds),
        ),
      ),
  )
}
