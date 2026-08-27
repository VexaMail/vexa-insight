import { domains, eventRollupDaily, getDb } from '@/lib/db'
import { getAllowedDomainIds } from '@/services/auth'
import type { DomainSummary } from '@/types/reports'
import { and, eq, sql } from 'drizzle-orm'
import { getRollupDayConditions } from './formatters/rollupDayConditions'

/**
 * Returns aggregated summary for a domain (total, passed, failed, pass rate).
 *
 * Reads pre-aggregated per-day totals from event_rollup_daily instead of
 * loading every normalized_events row into memory and summing in JS, which was
 * an unbounded per-request scan on high-traffic domains.
 */
export async function getDomainSummary(
  domainId: number,
  from?: Date,
  to?: Date,
): Promise<DomainSummary | null> {
  const db = getDb()
  const allowedIds = await getAllowedDomainIds()
  if (allowedIds !== null && !allowedIds.includes(domainId)) return null

  const domainRow = await db
    .select({ id: domains.id, name: domains.name })
    .from(domains)
    .where(eq(domains.id, domainId))
    .limit(1)
  if (!domainRow[0]) return null

  const conditions = [
    eq(eventRollupDaily.domainId, domainId),
    ...getRollupDayConditions(from, to),
  ]
  const [sums] = await db
    .select({
      total: sql<number>`coalesce(sum(${eventRollupDaily.totalCount}), 0)`,
      passed: sql<number>`coalesce(sum(${eventRollupDaily.passedCount}), 0)`,
    })
    .from(eventRollupDaily)
    .where(and(...conditions))

  const total = sums?.total ?? 0
  const passed = sums?.passed ?? 0
  return {
    domainId,
    domainName: domainRow[0].name,
    totalMessages: total,
    passedCount: passed,
    failedCount: total - passed,
    passRatePercent: total > 0 ? (passed / total) * 100 : 0,
  }
}
