import { FindingActions } from './FindingActions'
import { FindingCheckCell } from './FindingCheckCell'
import { FindingRecommendation } from './FindingRecommendation'
import { FindingSeverityPill } from './FindingSeverityPill'
import type { FindingsListProps } from './FindingsListProps'
import { FindingState } from './FindingState'

/** Phone findings: the same facts as the table, stacked per check. */
export function FindingCards({ findings, base }: Readonly<FindingsListProps>) {
  return (
    <ul className="divide-border divide-y md:hidden">
      {findings.map((finding) => (
        <li key={finding.id} className="space-y-3 px-4 py-3">
          <div className="flex items-start justify-between gap-2">
            <FindingCheckCell finding={finding} />
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
