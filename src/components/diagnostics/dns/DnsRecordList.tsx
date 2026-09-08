import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui'
import type { DnsRecordListProps } from './DnsRecordListProps'

/** Single-column table of one DNS record kind. */
export function DnsRecordList({
  title,
  columnLabel,
  emptyLabel,
  values,
}: DnsRecordListProps) {
  return (
    <div className="flex flex-col gap-2">
      <h4 className="text-foreground text-sm font-semibold tracking-wider uppercase">
        {title}
      </h4>
      <div className="flex-1 overflow-hidden rounded-md border">
        <Table>
          <TableHeader className="bg-muted/30">
            <TableRow>
              <TableHead className="text-foreground font-semibold">
                {columnLabel}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {values.length > 0 ? (
              values.map((value) => (
                <TableRow key={value}>
                  <TableCell className="font-mono text-xs">{value}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell className="text-muted-foreground text-xs italic">
                  {emptyLabel}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
