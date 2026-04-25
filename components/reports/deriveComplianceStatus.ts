/**
 * Maps a compliance rate percentage to a metric status.
 * - >= 95%: healthy (all traffic properly aligned)
 * - >= 80%: degraded (some sources need attention)
 * - < 80%: critical (significant alignment failures)
 */
export function deriveComplianceStatus(
  rate: number,
): 'healthy' | 'degraded' | 'critical' {
  if (rate >= 95) return 'healthy'
  if (rate >= 80) return 'degraded'
  return 'critical'
}
