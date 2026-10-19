import { StatusPill } from '@/components/ui'
import { gradeHeadlines } from '@/constants/diagnostics'
import {
  describeFindingsSummary,
  diagnosticsTabHref,
  scoreGradeTone,
} from '@/utils/diagnostics'
import Link from 'next/link'
import type { DiagnosticsSummaryProps } from './DiagnosticsSummaryProps'
import { ScoreFigure } from './ScoreFigure'
import { ScoreMeter } from './ScoreMeter'

/** Score, grade and one line on what it means; the breakdown is a link away. */
export function DiagnosticsScorePanel({
  score,
  findings,
  base,
  actionable,
}: Readonly<DiagnosticsSummaryProps>) {
  const tone = scoreGradeTone(score.grade)
  return (
    <section
      aria-label="Security score"
      className="glass-card flex min-w-0 flex-col gap-3 p-4"
    >
      <div className="flex items-center justify-between gap-3">
        <p className="text-muted-foreground font-mono text-[11px] tracking-[0.16em] uppercase">
          Security score
        </p>
        <StatusPill tone={tone} dot>
          Grade {score.grade}
        </StatusPill>
      </div>
      <ScoreFigure score={score} tone={tone} />
      <ScoreMeter percentage={score.percentage} tone={tone} />
      <p className="text-foreground text-sm">
        <span className="font-medium">{gradeHeadlines[score.grade]}</span>:{' '}
        {describeFindingsSummary(actionable, findings.length)}.
      </p>
      <Link
        href={diagnosticsTabHref({
          ...base,
          tab: 'runbook',
          anchor: 'score-breakdown',
        })}
        className="text-primary mt-auto text-xs font-medium hover:underline print:hidden"
      >
        How the score is built
      </Link>
    </section>
  )
}
