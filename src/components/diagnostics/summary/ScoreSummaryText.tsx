import { gradeHeadlines } from '@/constants/diagnostics'
import { describeFindingsSummary } from '@/utils/diagnostics'
import type { DiagnosticsSummaryProps } from './DiagnosticsSummaryProps'

/** One sentence: what the grade means and how many checks need action. */
export function ScoreSummaryText({
  score,
  findings,
  actionable,
}: Readonly<DiagnosticsSummaryProps>) {
  return (
    <p
      className="text-muted-foreground text-xs"
      title={`${String(score.coreScore)}/100 core points, +${String(score.bonusScore)} bonus`}
    >
      {gradeHeadlines[score.grade]}:{' '}
      {describeFindingsSummary(actionable, findings.length)}.
    </p>
  )
}
