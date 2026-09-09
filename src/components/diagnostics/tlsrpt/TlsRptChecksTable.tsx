import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui'
import { CheckRow } from '../shared'
import type { TlsRptChecksTableProps } from './TlsRptChecksTableProps'

export function TlsRptChecksTable({ tls }: Readonly<TlsRptChecksTableProps>) {
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
          <CheckRow label="Valid Record">{tls.valid ? 'Yes' : 'No'}</CheckRow>
          <TableRow>
            <TableCell className="align-top text-xs font-medium">
              Reporting Addresses (rua=)
            </TableCell>
            <TableCell className="text-xs">
              {tls.ruaAddresses.length > 0 ? (
                <ul className="flex flex-col gap-1">
                  {tls.ruaAddresses.map((rua) => (
                    <li key={rua} className="font-mono">
                      {rua}
                    </li>
                  ))}
                </ul>
              ) : (
                'None found'
              )}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}
