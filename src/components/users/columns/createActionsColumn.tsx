import type { dataTableFeatures } from '@/lib/dataTableFeatures'
import type { User } from '@/types/users'
import type { ColumnDef } from '@tanstack/react-table'
import type { GetUsersColumnsParams } from '../GetUsersColumnsParams'

/** Edit and delete buttons; a user cannot delete their own account. */
export function createActionsColumn({
  currentUserId,
  onEdit,
  onDelete,
}: GetUsersColumnsParams): ColumnDef<typeof dataTableFeatures, User> {
  return {
    id: 'actions',
    header: '',
    cell: ({ row }) => (
      <div className="flex justify-end gap-2">
        <button
          className="border-input bg-background hover:bg-accent hover:text-accent-foreground inline-flex h-9 items-center justify-center rounded-md border px-3 text-sm font-medium transition-colors"
          type="button"
          onClick={() => {
            onEdit(row.original)
          }}
        >
          Edit
        </button>
        <button
          className="bg-destructive text-destructive-foreground hover:bg-destructive/90 inline-flex h-9 items-center justify-center rounded-md px-3 text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50"
          type="button"
          disabled={row.original.id === currentUserId}
          onClick={() => {
            void onDelete(row.original.id)
          }}
        >
          Delete
        </button>
      </div>
    ),
  }
}
