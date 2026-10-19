import { StatTile } from '@/components/ui'
import type { ReportsKpiStripProps } from '@/types/reports'
import { buildReportsKpiTiles } from '@/utils/reports'

/** Totals of every report the list filters match, above the list itself. */
export function ReportsKpiStrip({
  summary,
  windowLabel,
}: Readonly<ReportsKpiStripProps>) {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {buildReportsKpiTiles(summary, windowLabel).map((tile) => (
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
