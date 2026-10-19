import { FindingActions } from './FindingActions'
import { FindingRecommendation } from './FindingRecommendation'
import { FindingSeverityPill } from './FindingSeverityPill'
import type { FindingsListProps } from './FindingsListProps'
import { FindingState } from './FindingState'

/** Phone findings: the same facts as the table, stacked per check. */
export function FindingCards({ findings, base }: Readonly<FindingsListProps>) {
  return (
    <ul className="divide-border divide-y md:hidden">
      {findings.map((finding) => (
        <li key={finding.id} className="space-y-2.5 px-4 py-3">
          <div className="flex items-center justify-between gap-2">
            <span className="text-foreground text-sm font-semibold">
              {finding.check}
            </span>
            <FindingSeverityPill severity={finding.severity} />
          </div>
          <FindingState finding={finding} />
          <FindingRecommendation finding={finding} />
          <FindingActions finding={finding} base={base} />
        </li>
      ))}
    </ul>
  )
}
