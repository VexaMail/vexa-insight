import { SortableHeaderButton } from '@/components/ui'
import { SOURCE_KIND_LABELS } from '@/constants/domains'
import type { dataTableFeatures } from '@/lib/dataTableFeatures'
import type { ColumnDef } from '@tanstack/react-table'
import { ClassificationCell } from '../ClassificationCell'
import type { SourceRow } from '../SourceRow'

/** How the source is read, labelled with its sender identity when known. */
export const classificationColumn: ColumnDef<
  typeof dataTableFeatures,
  SourceRow
> = {
  id: 'classification',
  accessorFn: (row) => row.sender?.name ?? SOURCE_KIND_LABELS[row.kind],
  header: ({ column }) => (
    <SortableHeaderButton column={column} label="Classification" />
  ),
  cell: ({ row }) => <ClassificationCell row={row.original} />,
}
