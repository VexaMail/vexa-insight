import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui'
import { CheckRow } from '../shared'
import type { MtaStsChecksTableProps } from './MtaStsChecksTableProps'

export function MtaStsChecksTable({ mta }: Readonly<MtaStsChecksTableProps>) {
  return (
    <div className="overflow-hidden rounded-md border">
      <Table>
        <TableHeader className="bg-muted/30">
          <TableRow>
            <TableHead className="text-foreground w-[180px] font-semibold">
              Check
            </TableHead>
            <TableHead className="text-foreground font-semibold">
              Result
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <CheckRow label="Valid Record">{mta.valid ? 'Yes' : 'No'}</CheckRow>
          <CheckRow label="Policy File Accessible">
            {mta.policyFileAccessible ? 'Yes' : 'No'}
          </CheckRow>
          <CheckRow label="Mode">
            <span className="capitalize">{mta.mode ?? 'Unknown'}</span>
          </CheckRow>
          <CheckRow label="Max Age (seconds)">
            {mta.fileAge ?? 'Unknown'}
          </CheckRow>
          <CheckRow label="Policy MX Records">
            {mta.mxRecords.length > 0 ? (
              <ul className="list-inside list-disc">
                {mta.mxRecords.map((mx) => (
                  <li key={mx}>{mx}</li>
                ))}
              </ul>
            ) : (
              'None found'
            )}
          </CheckRow>
        </TableBody>
      </Table>
    </div>
  )
}
