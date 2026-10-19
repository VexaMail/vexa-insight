import type { ReportKpiTileDefinition, ReportStats } from '@/types/reports'
import { complianceTone } from './complianceTone'
import { describeOutOf } from './describeOutOf'

/**
 * The five report figures. DMARC compliance counts a message aligned on SPF
 * or DKIM, so it can read 100% while SPF alignment reads 0%; the total tile
 * names the stricter share aligned on both.
 */
export function buildReportKpiTiles(
  stats: ReportStats,
  sourceCount: number,
): ReportKpiTileDefinition[] {
  const total = stats.totalMessages
  const noData = total === 0
  const rate = (value: number) => (noData ? 'No data' : `${String(value)}%`)
  const review = stats.sourcesRequiringReviewCount

  return [
    {
      label: 'DMARC compliance',
      value: rate(stats.complianceRate),
      hint: `${describeOutOf(stats.dmarcPassCount, total, 'message')}, aligned on SPF or DKIM`,
      tone: complianceTone(stats.complianceRate, total),
    },
    {
      label: 'SPF aligned',
      value: rate(stats.spfAlignedRate),
      hint: describeOutOf(stats.spfAlignedCount, total, 'message'),
      tone: 'neutral',
    },
    {
      label: 'DKIM aligned',
      value: rate(stats.dkimAlignedRate),
      hint: describeOutOf(stats.dkimAlignedCount, total, 'message'),
      tone: 'neutral',
    },
    {
      label: 'Sources requiring review',
      value: noData ? 'No data' : String(review),
      hint: `${describeOutOf(review, sourceCount, 'source')}, SPF or DKIM unaligned`,
      tone: review > 0 ? 'warning' : 'success',
    },
    {
      label: 'Total messages',
      value: noData ? 'No data' : total.toLocaleString('en-US'),
      hint: `Aligned on both: ${describeOutOf(stats.bothAlignedCount, total, 'message')}`,
      tone: 'neutral',
    },
  ]
}
