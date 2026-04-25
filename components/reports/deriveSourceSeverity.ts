/**
 * Derives a severity level from SPF and DKIM alignment.
 * - Both aligned: healthy
 * - One misaligned: degraded
 * - Both misaligned: critical
 */
export function deriveSourceSeverity(
  spfAligned: boolean,
  dkimAligned: boolean,
): 'healthy' | 'degraded' | 'critical' {
  if (spfAligned && dkimAligned) return 'healthy'
  if (!spfAligned && !dkimAligned) return 'critical'
  return 'degraded'
}
