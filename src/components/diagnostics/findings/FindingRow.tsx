import { TableCell, TableRow } from '@/components/ui'
import { FindingActions } from './FindingActions'
import { FindingCheckCell } from './FindingCheckCell'
import type { FindingLinkProps } from './FindingLinkProps'
import { FindingRecommendation } from './FindingRecommendation'
import { FindingSeverityPill } from './FindingSeverityPill'
import { FindingState } from './FindingState'

export function FindingRow({ finding, base }: Readonly<FindingLinkProps>) {
  return (
    <TableRow className="align-top">
      <TableCell className="py-3 pl-4 align-top">
        <FindingSeverityPill severity={finding.severity} />
      </TableCell>
      <TableCell className="py-3 align-top">
        <FindingCheckCell finding={finding} />
      </TableCell>
      <TableCell className="max-w-0 py-3 align-top">
        <FindingState finding={finding} />
      </TableCell>
      <TableCell className="py-3 align-top">
        <FindingRecommendation finding={finding} />
      </TableCell>
      <TableCell className="py-3 pr-4 align-top">
        <FindingActions finding={finding} base={base} />
      </TableCell>
    </TableRow>
  )
}
