import { StatTile } from '@/components/ui'
import type { ReportKpiTilesProps } from '@/types/reports'
import { buildReportKpiTiles } from '@/utils/reports'

/** DMARC compliance, SPF and DKIM alignment, review count and volume. */
export function ReportKpiTiles({
  stats,
  sourceCount,
}: Readonly<ReportKpiTilesProps>) {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-5">
      {buildReportKpiTiles(stats, sourceCount).map((tile) => (
        <StatTile
          key={tile.label}
          label={tile.label}
          value={tile.value}
          hint={tile.hint}
          tone={tile.tone}
        />
      ))}
    </div>
  )
}
