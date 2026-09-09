import type { User } from '@/types/users'
import type { ColumnDef } from '@tanstack/react-table'
import { Shield, ShieldAlert } from 'lucide-react'

export const roleColumn: ColumnDef<User> = {
  accessorKey: 'role',
  header: 'Role',
  cell: ({ row }) => (
    <span className="flex items-center gap-1.5 text-xs">
      {row.original.role === 'admin' ? (
        <ShieldAlert className="text-warning h-4 w-4" />
      ) : (
        <Shield className="text-muted-foreground h-4 w-4" />
      )}
      {row.original.role.toUpperCase()}
    </span>
  ),
}
