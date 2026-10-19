import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui'
import { FindingRow } from './FindingRow'
import type { FindingsListProps } from './FindingsListProps'

/** Desktop findings: one row per check, most urgent first. */
export function FindingsTable({ findings, base }: Readonly<FindingsListProps>) {
  return (
    <div className="hidden md:block">
      <Table className="table-fixed text-[13px]">
        <TableHeader>
          <TableRow>
            <TableHead className="w-28 pl-4">Severity</TableHead>
            <TableHead className="w-[19%]">Check</TableHead>
            <TableHead className="w-[30%]">Current state</TableHead>
            <TableHead>Recommendation</TableHead>
            <TableHead className="w-48 pr-4">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {findings.map((finding) => (
            <FindingRow key={finding.id} finding={finding} base={base} />
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
