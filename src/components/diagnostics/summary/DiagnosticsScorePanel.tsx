import { gradeLabels } from '@/constants/diagnostics'
import { STATUS_TONE_TEXT_CLASSES } from '@/constants/ui'
import { cn } from '@/lib/utils'
import { diagnosticsTabHref, scoreGradeTone } from '@/utils/diagnostics'
import Link from 'next/link'
import type { DiagnosticsSummaryProps } from './DiagnosticsSummaryProps'
import { ScoreFigure } from './ScoreFigure'
import { ScoreSummaryText } from './ScoreSummaryText'

/** Score ring and figure, the grade word and one paragraph on what it means. */
export function DiagnosticsScorePanel(
  props: Readonly<DiagnosticsSummaryProps>,
) {
  const { score, base } = props
  const tone = scoreGradeTone(score.grade)
  return (
    <section aria-label="Security score" className="glass-card min-w-0 p-4">
      <h2 className="text-muted-foreground text-sm font-medium">
        Security score
      </h2>
      <div className="mt-3 flex items-center gap-4">
        <ScoreFigure percentage={score.percentage} tone={tone} />
        <div className="min-w-0 space-y-1">
          <p
            title={`Grade ${score.grade}`}
            className={cn(
              'text-xl font-semibold',
              STATUS_TONE_TEXT_CLASSES[tone],
            )}
          >
            {gradeLabels[score.grade]}
          </p>
          <ScoreSummaryText {...props} />
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
      </div>
    </section>
  )
}
