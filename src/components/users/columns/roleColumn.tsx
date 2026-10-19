import { StatusPill } from '@/components/ui'
import type { dataTableFeatures } from '@/lib/dataTableFeatures'
import type { User } from '@/types/users'
import type { ColumnDef } from '@tanstack/react-table'
import { Eye, ShieldCheck } from 'lucide-react'

export const roleColumn: ColumnDef<typeof dataTableFeatures, User> = {
  accessorKey: 'role',
  header: 'Role',
  cell: ({ row }) => (
    <StatusPill
      tone={row.original.role === 'admin' ? 'info' : 'neutral'}
      icon={row.original.role === 'admin' ? <ShieldCheck /> : <Eye />}
    >
      <span className="capitalize">{row.original.role}</span>
    </StatusPill>
  ),
}
