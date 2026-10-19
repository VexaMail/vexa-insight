import type { dataTableFeatures } from '@/lib/dataTableFeatures'
import type { User } from '@/types/users'
import type { ColumnDef } from '@tanstack/react-table'
import { AllowedDomainsCell } from '../AllowedDomainsCell'

export const allowedDomainsColumn: ColumnDef<typeof dataTableFeatures, User> = {
  accessorKey: 'allowedDomains',
  header: () => <span className="whitespace-nowrap">Domain access</span>,
  cell: ({ row }) => (
    <AllowedDomainsCell allowedDomains={row.original.allowedDomains} />
  ),
}
