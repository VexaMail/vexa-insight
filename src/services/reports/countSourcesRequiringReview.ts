import { getDb, ipAddresses, normalizedEvents } from '@/lib/db'
import { eq, sql } from 'drizzle-orm'

/**
 * Distinct source IPs of one raw report where SPF or DKIM fails alignment.
 */
export async function countSourcesRequiringReview(
  rawReportId: number,
): Promise<number> {
  const [row] = await getDb()
    .select({
      sourcesRequiringReviewCount: sql<number>`
        cast(count(distinct ${ipAddresses.ip}) as integer)
      `,
    })
    .from(normalizedEvents)
    .innerJoin(ipAddresses, eq(normalizedEvents.ipAddressId, ipAddresses.id))
    .where(
      sql`${normalizedEvents.rawReportId} = ${rawReportId}
        and (${normalizedEvents.spfAligned} = 0 or ${normalizedEvents.dkimAligned} = 0)`,
    )

  return row?.sourcesRequiringReviewCount ?? 0
}
