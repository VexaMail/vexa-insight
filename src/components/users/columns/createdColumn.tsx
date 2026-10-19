import type { dataTableFeatures } from '@/lib/dataTableFeatures'
import type { User } from '@/types/users'
import { formatRelativeDate } from '@/utils/format'
import type { ColumnDef } from '@tanstack/react-table'

/** When the account was created, relative, with the date on hover. */
export const createdColumn: ColumnDef<typeof dataTableFeatures, User> = {
  accessorKey: 'createdAt',
  header: 'Created',
  cell: ({ row }) => {
    const when = formatRelativeDate(Date.parse(row.original.createdAt) / 1000)
    return (
      <span
        className="text-muted-foreground font-mono text-xs whitespace-nowrap tabular-nums"
        title={row.original.createdAt}
      >
        {when.absolute}
      </span>
    )
  },
}
