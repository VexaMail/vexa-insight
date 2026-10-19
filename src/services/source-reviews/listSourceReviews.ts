import { getDb, sourceReviews } from '@/lib/db'
import type { SourceReview, SourceReviewFilter } from '@/types/source-reviews'
import { desc, eq } from 'drizzle-orm'

/** Verdicts recorded for one domain (`domainName`) or one IP (`ip`). */
export async function listSourceReviews(
  filter: SourceReviewFilter,
): Promise<SourceReview[]> {
  const where = filter.ip
    ? eq(sourceReviews.ip, filter.ip)
    : eq(sourceReviews.domainName, filter.domainName ?? '')
  return getDb()
    .select({
      ip: sourceReviews.ip,
      domainName: sourceReviews.domainName,
      verdict: sourceReviews.verdict,
      note: sourceReviews.note,
      reviewedByName: sourceReviews.reviewedByName,
      reviewedAt: sourceReviews.reviewedAt,
    })
    .from(sourceReviews)
    .where(where)
    .orderBy(desc(sourceReviews.reviewedAt))
}
