import { domains, getDb, normalizedEvents } from '@/lib/db'
import { getAllowedDomainIds } from '@/services/auth'
import type { DomainSummary } from '@/types/reports'
import { and, eq } from 'drizzle-orm'
import { getDateRangeConditions } from './formatters/dateRangeConditions'

/**
 * Returns aggregated summary for a domain (total, passed, failed, pass rate).
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
  const eventsQuery = db
    .select({
      count: normalizedEvents.count,
      spfResult: normalizedEvents.spfResult,
      dkimResult: normalizedEvents.dkimResult,
    })
    .from(normalizedEvents)

  const conditions = [
    eq(normalizedEvents.domainId, domainId),
    ...getDateRangeConditions(from, to),
  ]

  const events = await eventsQuery.where(and(...conditions))
  let total = 0
  let passed = 0
  for (const e of events) {
    total += e.count
    if (e.spfResult === 'pass' || e.dkimResult === 'pass') passed += e.count
  }
  return {
    domainId,
    domainName: domainRow[0].name,
    totalMessages: total,
    passedCount: passed,
    failedCount: total - passed,
    passRatePercent: total > 0 ? (passed / total) * 100 : 0,
  }
}
