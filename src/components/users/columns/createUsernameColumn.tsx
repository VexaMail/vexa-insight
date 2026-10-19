import { IconTile, StatusPill } from '@/components/ui'
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
      <div className="flex min-w-0 items-center gap-2.5">
        <IconTile
          size="sm"
          tone={row.original.role === 'admin' ? 'info' : 'neutral'}
        >
          <UserIcon />
        </IconTile>
        <span className="text-foreground truncate font-medium">
          {row.original.username}
        </span>
        {row.original.id === currentUserId && (
          <StatusPill tone="success" className="h-5 px-1.5 text-[11px]">
            You
          </StatusPill>
        )}
      </div>
    ),
  }
}
