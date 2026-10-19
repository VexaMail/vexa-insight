import { StatusPill } from '@/components/ui'
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
      <div className="flex min-w-0 items-center gap-2">
        <span className="bg-accent text-muted-foreground flex h-7 w-7 shrink-0 items-center justify-center rounded-full">
          <UserIcon className="h-3.5 w-3.5" aria-hidden />
        </span>
        <span className="text-foreground truncate font-medium">
          {row.original.username}
        </span>
        {row.original.id === currentUserId && (
          <StatusPill tone="neutral" className="h-5 px-1.5 text-[11px]">
            You
          </StatusPill>
        )}
      </div>
    ),
  }
}
