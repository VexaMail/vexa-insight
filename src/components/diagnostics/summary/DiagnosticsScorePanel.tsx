import { gradeHeadlines } from '@/constants/diagnostics'
import {
  describeFindingsSummary,
  diagnosticsTabHref,
  scoreGradeTone,
} from '@/utils/diagnostics'
import Link from 'next/link'
import type { DiagnosticsSummaryProps } from './DiagnosticsSummaryProps'
import { GradePill } from './GradePill'
import { ScoreRing } from './ScoreRing'

/** Score ring, grade and one line on what it means; the breakdown a link away. */
export function DiagnosticsScorePanel({
  score,
  findings,
  base,
  actionable,
}: Readonly<DiagnosticsSummaryProps>) {
  return (
    <section
      aria-label="Security score"
      className="glass-card flex min-w-0 items-center gap-4 p-4"
    >
      <ScoreRing
        percentage={score.percentage}
        tone={scoreGradeTone(score.grade)}
        label="Security score"
      />
      <div className="min-w-0 space-y-1.5">
        <GradePill grade={score.grade} />
        <h2 className="text-foreground text-sm font-semibold">
          {gradeHeadlines[score.grade]}.
        </h2>
        <p
          className="text-muted-foreground text-xs"
          title={`${String(score.coreScore)}/100 core points, +${String(score.bonusScore)} bonus`}
        >
          Grade {score.grade}:{' '}
          {describeFindingsSummary(actionable, findings.length)}.
        </p>
        <Link
          href={diagnosticsTabHref({
            ...base,
            tab: 'runbook',
            anchor: 'score-breakdown',
          })}
          className="text-primary inline-block text-xs font-medium hover:underline print:hidden"
        >
          How the score is built
        </Link>
      </div>
    </section>
  )
}
