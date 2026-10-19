import { StatusPill } from '@/components/ui'
import type { dataTableFeatures } from '@/lib/dataTableFeatures'
import type { User } from '@/types/users'
import type { ColumnDef } from '@tanstack/react-table'
import { Shield, ShieldCheck } from 'lucide-react'

export const roleColumn: ColumnDef<typeof dataTableFeatures, User> = {
  accessorKey: 'role',
  header: 'Role',
  cell: ({ row }) => (
    <StatusPill tone={row.original.role === 'admin' ? 'info' : 'neutral'}>
      {row.original.role === 'admin' ? (
        <ShieldCheck className="h-3.5 w-3.5" aria-hidden />
      ) : (
        <Shield className="h-3.5 w-3.5" aria-hidden />
      )}
      <span className="capitalize">{row.original.role}</span>
    </StatusPill>
  ),
}
