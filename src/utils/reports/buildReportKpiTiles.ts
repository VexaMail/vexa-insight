import type {
  ReportKpiTileDefinition,
  ReportKpiTrends,
  ReportStats,
} from '@/types/reports'
import { complianceTone } from './complianceTone'
import { describeOutOf } from './describeOutOf'
import { rateCheck } from './rateCheck'

/**
 * The four report figures. DMARC compliance counts a message aligned on SPF
 * or DKIM, so it can read 100% while SPF alignment reads 0%; the volume tile
 * names the stricter share aligned on both.
 */
export function buildReportKpiTiles(
  stats: ReportStats,
  trends: ReportKpiTrends,
): ReportKpiTileDefinition[] {
  const total = stats.totalMessages
  return [
    {
      id: 'messages',
      label: 'Total messages',
      value: total === 0 ? 'No data' : total.toLocaleString('en-US'),
      hint: `Aligned on both: ${describeOutOf(stats.bothAlignedCount, total, 'message')}`,
      tone: 'neutral',
      accent: 'info',
      trend: trends.messages,
      trendKind: 'bars',
    },
    {
      id: 'spf',
      label: 'SPF aligned',
      hint: describeOutOf(stats.spfAlignedCount, total, 'message'),
      tone: 'neutral',
      trend: trends.spfAligned,
      ...rateCheck(stats.spfAlignedRate, total),
    },
    {
      id: 'dkim',
      label: 'DKIM aligned',
      hint: describeOutOf(stats.dkimAlignedCount, total, 'message'),
      tone: 'neutral',
      trend: trends.dkimAligned,
      ...rateCheck(stats.dkimAlignedRate, total),
    },
    {
      id: 'dmarc',
      label: 'DMARC compliance',
      hint: `${describeOutOf(stats.dmarcPassCount, total, 'message')}, aligned on SPF or DKIM`,
      tone: 'neutral',
      trend: trends.dmarcPass,
      ...rateCheck(stats.complianceRate, total),
      accent: complianceTone(stats.complianceRate, total),
    },
  ]
}
