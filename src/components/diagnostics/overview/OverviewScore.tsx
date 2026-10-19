import { StatusPill } from '@/components/ui'
import { scoreGradeTone } from '@/utils/diagnostics'
import { CircleHelp } from 'lucide-react'
import { GradePill } from '../summary/GradePill'
import { ScoreRing } from '../summary/ScoreRing'
import type { DiagnosticsOverviewRowProps } from './DiagnosticsOverviewRowProps'

/** Score ring and grade pill of one domain. */
export function OverviewScore({ row }: Readonly<DiagnosticsOverviewRowProps>) {
  if (!row.resolved) {
    return (
      <StatusPill tone="unknown" icon={<CircleHelp />}>
        No DNS answer
      </StatusPill>
    )
  }
  return (
    <span className="inline-flex items-center gap-2.5">
      <ScoreRing
        size="sm"
        percentage={row.score.percentage}
        tone={scoreGradeTone(row.score.grade)}
      />
      <span className="sr-only">{row.score.percentage}%</span>
      <GradePill grade={row.score.grade} />
    </span>
  )
}
