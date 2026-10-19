import { Button } from '@/components/ui'
import type { dataTableFeatures } from '@/lib/dataTableFeatures'
import type { User } from '@/types/users'
import type { ColumnDef } from '@tanstack/react-table'
import { Pencil, Trash2 } from 'lucide-react'
import type { GetUsersColumnsParams } from '../GetUsersColumnsParams'

/** Edit and delete buttons; a user cannot delete their own account. */
export function createActionsColumn({
  currentUserId,
  onEdit,
  onDelete,
}: GetUsersColumnsParams): ColumnDef<typeof dataTableFeatures, User> {
  return {
    id: 'actions',
    header: () => <span className="sr-only">Actions</span>,
    cell: ({ row }) => (
      <div className="flex justify-end gap-1.5">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => {
            onEdit(row.original)
          }}
        >
          <Pencil />
          Edit
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="text-danger hover:bg-danger/10 hover:text-danger"
          disabled={row.original.id === currentUserId}
          title={
            row.original.id === currentUserId
              ? 'You cannot delete your own account'
              : undefined
          }
          onClick={() => {
            void onDelete(row.original.id)
          }}
        >
          <Trash2 />
          Delete
        </Button>
      </div>
    ),
  }
}
