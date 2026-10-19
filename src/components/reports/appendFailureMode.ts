import type { ReportStats } from '@/types/reports'

/**
 * Names the weaker mechanism when SPF and DKIM alignment differ by more than
 * 15 points: DMARC then rests on the other one alone.
 */
export function appendFailureMode(parts: string[], stats: ReportStats): void {
  const spfGap = stats.spfAlignedRate - stats.dkimAlignedRate
  const dkimGap = stats.dkimAlignedRate - stats.spfAlignedRate

  if (dkimGap > 15) {
    parts.push(
      `SPF aligns for ${String(stats.spfAlignedRate)}% of messages, so DMARC relies on DKIM.`,
    )
  } else if (spfGap > 15) {
    parts.push(
      `DKIM aligns for ${String(stats.dkimAlignedRate)}% of messages, so DMARC relies on SPF.`,
    )
  }
}
