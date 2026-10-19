import { StatTile } from '@/components/ui'
import { REPORT_KPI_ICONS } from '@/constants/reports'
import type { ReportKpiTileProps } from '@/types/reports'
import { ReportKpiValue } from './ReportKpiValue'

/** One report KPI as a feature tile: icon square, figure, pill, sparkline. */
export function ReportKpiTile({ tile }: Readonly<ReportKpiTileProps>) {
  const Icon = REPORT_KPI_ICONS[tile.id]
  return (
    <StatTile
      variant="feature"
      label={tile.label}
      value={<ReportKpiValue value={tile.value} verdict={tile.verdict} />}
      hint={tile.hint}
      tone={tile.tone}
      accent={tile.accent ?? tile.tone}
      icon={<Icon />}
      trend={tile.trend}
      trendKind={tile.trendKind ?? 'line'}
    />
  )
}
