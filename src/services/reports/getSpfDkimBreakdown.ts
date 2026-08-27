import { getDb, normalizedEvents } from '@/lib/db'
import { getAllowedDomainIds } from '@/services/auth'
import type { SpfDkimBreakdown } from '@/types/reports'
import { toUnixSeconds } from '@/utils/dates'
import { and, eq, gte, inArray, lte, sql } from 'drizzle-orm'

/**
 * Returns SPF/DKIM pass/fail counts. Optionally for a single domain.
 */
export async function getSpfDkimBreakdown(
  domainId?: number,
  from?: Date,
  to?: Date,
): Promise<SpfDkimBreakdown> {
  const db = getDb()
  const base = db
    .select({
      spfPass: sql<number>`sum(case when ${normalizedEvents.spfResult} = 'pass' then ${normalizedEvents.count} else 0 end)`,
      spfFail: sql<number>`sum(case when ${normalizedEvents.spfResult} != 'pass' then ${normalizedEvents.count} else 0 end)`,
      dkimPass: sql<number>`sum(case when ${normalizedEvents.dkimResult} = 'pass' then ${normalizedEvents.count} else 0 end)`,
      dkimFail: sql<number>`sum(case when ${normalizedEvents.dkimResult} != 'pass' then ${normalizedEvents.count} else 0 end)`,
    })
    .from(normalizedEvents)
  const allowedIds = await getAllowedDomainIds()

  if (allowedIds !== null && allowedIds.length === 0) {
    return { spfPass: 0, spfFail: 0, dkimPass: 0, dkimFail: 0 }
  }

  const conditions = []
  if (domainId != null) {
    if (allowedIds !== null && !allowedIds.includes(domainId)) {
      return { spfPass: 0, spfFail: 0, dkimPass: 0, dkimFail: 0 }
    }
    conditions.push(eq(normalizedEvents.domainId, domainId))
  } else if (allowedIds !== null) {
    conditions.push(inArray(normalizedEvents.domainId, allowedIds))
  }

  if (from) {
    conditions.push(gte(normalizedEvents.reportEndDate, toUnixSeconds(from)))
  }
  if (to) {
    conditions.push(lte(normalizedEvents.reportEndDate, toUnixSeconds(to)))
  }

  if (conditions.length > 0) {
    base.where(and(...conditions))
  }

  const [row] = await base
  return {
    spfPass: Number(row?.spfPass ?? 0),
    spfFail: Number(row?.spfFail ?? 0),
    dkimPass: Number(row?.dkimPass ?? 0),
    dkimFail: Number(row?.dkimFail ?? 0),
  }
}
