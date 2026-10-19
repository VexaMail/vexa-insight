import type { ReportOutcomePillProps } from '@/types/reports'
import { describeDmarcOutcome, reportOutcomeLabel } from '@/utils/reports'
import { ResultPill } from './ResultPill'

/** A report's DMARC outcome in words, with the counts behind it on hover. */
export function ReportOutcomePill({
  outcome,
}: Readonly<ReportOutcomePillProps>) {
  const pill = reportOutcomeLabel(outcome)
  const description = outcome
    ? describeDmarcOutcome(outcome)
    : 'No messages in this report'
  return (
    <span className="inline-flex">
      <ResultPill tone={pill.tone} title={description}>
        {pill.label}
      </ResultPill>
      <span className="sr-only">: {description}</span>
    </span>
  )
}
