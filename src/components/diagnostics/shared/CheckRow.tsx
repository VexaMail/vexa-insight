import { TableCell, TableRow } from '@/components/ui'
import type { CheckRowProps } from './CheckRowProps'

/** One label/result row of a protocol check table. */
export function CheckRow({ label, children }: Readonly<CheckRowProps>) {
  return (
    <TableRow>
      <TableCell className="text-xs font-medium">{label}</TableCell>
      <TableCell className="text-xs">{children}</TableCell>
    </TableRow>
  )
}
