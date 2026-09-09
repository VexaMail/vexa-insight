import type { User } from '@/types/users'
import type { ColumnDef } from '@tanstack/react-table'
import { AllowedDomainsCell } from '../AllowedDomainsCell'

export const allowedDomainsColumn: ColumnDef<User> = {
  accessorKey: 'allowedDomains',
  header: 'Domains Access',
  cell: ({ row }) => (
    <AllowedDomainsCell allowedDomains={row.original.allowedDomains} />
  ),
}
