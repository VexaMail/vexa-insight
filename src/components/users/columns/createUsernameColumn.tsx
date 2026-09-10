import type { dataTableFeatures } from '@/lib/dataTableFeatures'
import type { User } from '@/types/users'
import type { ColumnDef } from '@tanstack/react-table'
import { UserIcon } from 'lucide-react'

/** The username, tagged "You" on the signed-in user's own row. */
export function createUsernameColumn(
  currentUserId: string,
): ColumnDef<typeof dataTableFeatures, User> {
  return {
    accessorKey: 'username',
    header: 'Username',
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <UserIcon className="text-muted-foreground h-4 w-4" />
        <span className="font-medium">{row.original.username}</span>
        {row.original.id === currentUserId && (
          <span className="bg-primary/20 text-primary ml-2 rounded-full px-2 py-0.5 text-[10px]">
            You
          </span>
        )}
      </div>
    ),
  }
}
