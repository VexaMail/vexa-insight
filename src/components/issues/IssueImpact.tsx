import { formatCount, formatRate } from '@/utils/dashboard'
import type { IssueImpactProps } from './IssueImpactProps'

/** Messages an issue touches, with the share failing DMARC under it. */
export function IssueImpact({ issue }: Readonly<IssueImpactProps>) {
  if (issue.impactMessages === null) {
    return <span className="text-muted-foreground">n/a</span>
  }
  return (
    <span className="flex flex-col @xl:items-end">
      <span className="text-foreground whitespace-nowrap">
        {formatCount(issue.impactMessages)} msgs
      </span>
      {issue.impactRate === null ? null : (
        <span className="text-danger text-xs whitespace-nowrap">
          {formatRate(issue.impactRate)} fail
        </span>
      )}
    </span>
  )
}
