import type { ReportsKpiStripProps } from '@/types/reports'
import { buildReportsKpiTiles } from '@/utils/reports'
import { ReportKpiTile } from './ReportKpiTile'

/** Totals of every report the list filters match, above the list itself. */
export function ReportsKpiStrip({
  summary,
  trends,
  windowLabel,
}: Readonly<ReportsKpiStripProps>) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {buildReportsKpiTiles(summary, trends, windowLabel).map((tile) => (
        <ReportKpiTile key={tile.id} tile={tile} />
      ))}
    </div>
  )
}
