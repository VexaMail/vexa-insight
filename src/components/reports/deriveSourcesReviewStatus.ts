/**
 * Maps the count of sources requiring review to a metric status.
 * - 0: healthy (no sources need attention)
 * - 1-2: degraded (a few sources need review)
 * - 3+: critical (multiple sources need investigation)
 */
export function deriveSourcesReviewStatus(
  count: number,
): 'healthy' | 'degraded' | 'critical' {
  if (count === 0) return 'healthy'
  if (count <= 2) return 'degraded'
  return 'critical'
}
