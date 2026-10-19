import { getDb, sourceReviews } from '@/lib/db'
import { and, eq, inArray } from 'drizzle-orm'

/** IPs an operator marked legitimate or a forwarder for this domain. */
export async function getTrustedSourceIps(
  domainName: string,
): Promise<Set<string>> {
  const rows = await getDb()
    .select({ ip: sourceReviews.ip })
    .from(sourceReviews)
    .where(
      and(
        eq(sourceReviews.domainName, domainName.toLowerCase()),
        inArray(sourceReviews.verdict, ['legitimate', 'forwarder']),
      ),
    )
  return new Set(rows.map((row) => row.ip))
}
