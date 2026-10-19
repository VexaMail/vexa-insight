import { getDb, sourceReviews } from '@/lib/db'
import { and, eq } from 'drizzle-orm'

/** Removes the verdict, so the source is classified from its results again. */
export async function clearSourceReview(
  ip: string,
  domainName: string,
): Promise<void> {
  await getDb()
    .delete(sourceReviews)
    .where(
      and(eq(sourceReviews.ip, ip), eq(sourceReviews.domainName, domainName)),
    )
}
