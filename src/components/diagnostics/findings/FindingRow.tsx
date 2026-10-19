import { TableCell, TableRow } from '@/components/ui'
import { FindingActions } from './FindingActions'
import { FindingCheckCell } from './FindingCheckCell'
import type { FindingLinkProps } from './FindingLinkProps'
import { FindingRecommendation } from './FindingRecommendation'
import { FindingSeverityPill } from './FindingSeverityPill'
import { FindingState } from './FindingState'
import { FindingSteps } from './FindingSteps'

/** One check, then its folded correction flow across the whole table width. */
export function FindingRow({ finding, base }: Readonly<FindingLinkProps>) {
  return (
    <>
      <TableRow className="border-b-0 align-top hover:bg-transparent">
        <TableCell className="pt-3 pb-1 pl-4 align-top">
          <FindingSeverityPill severity={finding.severity} />
        </TableCell>
        <TableCell className="pt-3 pb-1 align-top">
          <FindingCheckCell finding={finding} />
        </TableCell>
        <TableCell className="max-w-0 pt-3 pb-1 align-top">
          <FindingState finding={finding} />
        </TableCell>
        <TableCell className="pt-3 pb-1 align-top">
          <FindingRecommendation finding={finding} />
        </TableCell>
        <TableCell className="pt-3 pr-4 pb-1 align-top">
          <FindingActions finding={finding} base={base} />
        </TableCell>
      </TableRow>
      <TableRow className="hover:bg-transparent">
        <TableCell colSpan={5} className="px-4 pt-0 pb-3">
          <FindingSteps finding={finding} />
        </TableCell>
      </TableRow>
    </>
  )
}
