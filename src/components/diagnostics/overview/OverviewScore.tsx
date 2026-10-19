import { StatusPill } from '@/components/ui'
import { scoreGradeTone } from '@/utils/diagnostics'
import { CircleHelp, Loader2 } from 'lucide-react'
import { GradePill } from '../summary/GradePill'
import { ScoreRing } from '../summary/ScoreRing'
import type { DiagnosticsOverviewRowProps } from './DiagnosticsOverviewRowProps'

/** Score ring and grade pill of one domain. */
export function OverviewScore({ row }: Readonly<DiagnosticsOverviewRowProps>) {
  const { check } = row
  if (!check) {
    return (
      <StatusPill
        tone="unknown"
        icon={<Loader2 className="animate-spin motion-reduce:animate-none" />}
      >
        Checking
      </StatusPill>
    )
  }
  if (!check.resolved) {
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
        percentage={check.percentage}
        tone={scoreGradeTone(check.grade)}
      />
      <span className="sr-only">{check.percentage}%</span>
      <GradePill grade={check.grade} />
    </span>
  )
}
