import { StatTile } from '@/components/ui'
import { CircleAlert, CircleCheck, Globe, TriangleAlert } from 'lucide-react'
import type { DiagnosticsOverviewSummaryProps } from './DiagnosticsOverviewSummaryProps'

/** How many domains are poor, fair or good, out of every domain checked. */
export function DiagnosticsOverviewSummary({
  counts,
}: Readonly<DiagnosticsOverviewSummaryProps>) {
  const outOf = `of ${String(counts.total)} domains`
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <StatTile
        variant="feature"
        label="Domains checked"
        value={counts.total}
        hint={`${String(counts.unresolved)} without a DNS answer`}
        icon={<Globe />}
      />
      <StatTile
        variant="feature"
        label="Poor (grade D or F)"
        value={counts.poor}
        hint={outOf}
        tone={counts.poor > 0 ? 'danger' : 'neutral'}
        accent="danger"
        icon={<CircleAlert />}
      />
      <StatTile
        variant="feature"
        label="Fair (grade C)"
        value={counts.fair}
        hint={outOf}
        tone={counts.fair > 0 ? 'warning' : 'neutral'}
        accent="warning"
        icon={<TriangleAlert />}
      />
      <StatTile
        variant="feature"
        label="Good (grade A or B)"
        value={counts.good}
        hint={outOf}
        tone="success"
        icon={<CircleCheck />}
      />
    </div>
  )
}
