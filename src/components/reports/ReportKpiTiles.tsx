import type { ReportKpiTilesProps } from '@/types/reports'
import { buildReportKpiTiles } from '@/utils/reports'
import { ReportKpiTile } from './ReportKpiTile'

/**
 * Volume, SPF and DKIM alignment and the DMARC result of one report. The
 * small charts are not this report over time: they are the same receiver's
 * recent reports for the domain, so the caption says so, and with fewer than
 * two of them there is nothing to draw.
 */
export function ReportKpiTiles({
  stats,
  trends,
}: Readonly<ReportKpiTilesProps>) {
  const reports = trends.messages.length
  const shown =
    reports < 2
      ? { messages: [], spfAligned: [], dkimAligned: [], dmarcPass: [] }
      : trends
  return (
    <div className="space-y-2">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {buildReportKpiTiles(stats, shown).map((tile) => (
          <ReportKpiTile key={tile.id} tile={tile} />
        ))}
      </div>
      {reports < 2 ? null : (
        <p className="text-muted-foreground text-xs">
          Charts: the last {reports} reports from this receiver for this domain,
          oldest first; figures are this report only.
        </p>
      )}
    </div>
  )
}
