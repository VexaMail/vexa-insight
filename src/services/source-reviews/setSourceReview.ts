import { getDb, sourceReviews } from '@/lib/db'
import type { SetSourceReviewInput } from '@/types/source-reviews'

/** Records or replaces the operator's verdict on a source for a domain. */
export async function setSourceReview(
  input: SetSourceReviewInput,
  nowMs = Date.now(),
): Promise<void> {
  const values = {
    verdict: input.verdict,
    note: input.note ?? null,
    reviewedById: input.actor?.id ?? null,
    reviewedByName: input.actor?.name ?? null,
    reviewedAt: Math.floor(nowMs / 1000),
  }
  await getDb()
    .insert(sourceReviews)
    .values({ ip: input.ip, domainName: input.domainName, ...values })
    .onConflictDoUpdate({
      target: [sourceReviews.ip, sourceReviews.domainName],
      set: values,
    })
}
