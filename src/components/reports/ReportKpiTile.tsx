import { StatTile } from '@/components/ui'
import { REPORT_KPI_ICONS } from '@/constants/reports'
import type { ReportKpiTileProps } from '@/types/reports'
import { ReportKpiVerdict } from './ReportKpiVerdict'

/** One report KPI as a feature tile: icon square, figure, pill, sparkline. */
export function ReportKpiTile({ tile }: Readonly<ReportKpiTileProps>) {
  const Icon = REPORT_KPI_ICONS[tile.id]
  return (
    <StatTile
      variant="feature"
      label={tile.label}
      value={tile.value}
      badge={tile.verdict ? <ReportKpiVerdict verdict={tile.verdict} /> : null}
      hint={tile.hint}
      tone={tile.tone}
      accent={tile.accent ?? tile.tone}
      icon={<Icon />}
      trend={tile.trend}
      trendKind={tile.trendKind ?? 'line'}
    />
  )
}
