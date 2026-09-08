import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui'

/** Priority and exchange of every MX record of the domain. */
export function MxRecordList({
  records,
}: Readonly<{ records: { priority: number; exchange: string }[] }>) {
  return (
    <div className="flex flex-col gap-2">
      <h4 className="text-foreground text-sm font-semibold tracking-wider uppercase">
        MX Records
      </h4>
      <div className="flex-1 overflow-hidden rounded-md border">
        <Table>
          <TableHeader className="bg-muted/30">
            <TableRow>
              <TableHead className="text-foreground w-[80px] font-semibold">
                Priority
              </TableHead>
              <TableHead className="text-foreground font-semibold">
                Exchange Server
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {records.length > 0 ? (
              records.map((mx) => (
                <TableRow key={`${String(mx.priority)}:${mx.exchange}`}>
                  <TableCell className="text-xs font-medium">
                    {mx.priority}
                  </TableCell>
                  <TableCell className="font-mono text-xs">
                    {mx.exchange}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={2}
                  className="text-muted-foreground text-xs italic"
                >
                  No MX records found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
