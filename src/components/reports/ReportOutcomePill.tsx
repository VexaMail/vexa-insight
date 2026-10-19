import { StatusPill } from '@/components/ui'
import type { ReportOutcomePillProps } from '@/types/reports'
import { describeDmarcOutcome, reportOutcomeLabel } from '@/utils/reports'

/** A report's DMARC outcome in words, with the counts behind it on hover. */
export function ReportOutcomePill({
  outcome,
}: Readonly<ReportOutcomePillProps>) {
  const pill = reportOutcomeLabel(outcome)
  const description = outcome
    ? describeDmarcOutcome(outcome)
    : 'No messages in this report'
  return (
    <span title={description} className="inline-flex">
      <StatusPill tone={pill.tone} dot>
        {pill.label}
      </StatusPill>
      <span className="sr-only">: {description}</span>
    </span>
  )
}
