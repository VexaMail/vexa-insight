import type { ReportKpiTilesProps } from '@/types/reports'
import { buildReportKpiTiles } from '@/utils/reports'
import { ReportKpiTile } from './ReportKpiTile'

/** Volume, SPF and DKIM alignment and the DMARC result of one report. */
export function ReportKpiTiles({
  stats,
  trends,
}: Readonly<ReportKpiTilesProps>) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {buildReportKpiTiles(stats, trends).map((tile) => (
        <ReportKpiTile key={tile.id} tile={tile} />
      ))}
    </div>
  )
}
