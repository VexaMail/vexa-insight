import { StatusPill } from '@/components/ui'
import { scoreGradeTone } from '@/utils/diagnostics'
import type { DiagnosticsOverviewRowProps } from './DiagnosticsOverviewRowProps'

/** Score figure and grade pill of one domain. */
export function OverviewScore({ row }: Readonly<DiagnosticsOverviewRowProps>) {
  if (!row.resolved) {
    return <StatusPill tone="unknown">No DNS answer</StatusPill>
  }
  return (
    <span className="inline-flex items-center gap-2">
      <span className="text-foreground font-mono text-sm tabular-nums">
        {row.score.percentage}%
      </span>
      <StatusPill tone={scoreGradeTone(row.score.grade)}>
        {row.score.grade}
      </StatusPill>
    </span>
  )
}
