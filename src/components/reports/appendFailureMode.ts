import type { ReportStats } from '@/types/reports'

/**
 * Appends the primary failure mode sentence if SPF/DKIM gap > 15%.
 */
export function appendFailureMode(parts: string[], stats: ReportStats): void {
  const spfGap = stats.spfAlignedRate - stats.dkimAlignedRate
  const dkimGap = stats.dkimAlignedRate - stats.spfAlignedRate

  if (dkimGap > 15) {
    parts.push('Primary failure mode: SPF misalignment.')
  } else if (spfGap > 15) {
    parts.push('Primary failure mode: DKIM misalignment.')
  }
}
