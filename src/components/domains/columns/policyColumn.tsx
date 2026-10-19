'use client'

import { SortableHeaderButton } from '@/components/ui'
import type { dataTableFeatures } from '@/lib/dataTableFeatures'
import type { DomainsTableRow } from '@/types/domains'
import type { ColumnDef } from '@tanstack/react-table'
import { DomainPolicyChip } from '../DomainPolicyChip'

/** The `p=` value the latest report about the domain quoted. */
export const policyColumn: ColumnDef<
  typeof dataTableFeatures,
  DomainsTableRow
> = {
  id: 'policy',
  accessorFn: (row) => row.policy?.policy ?? '',
  header: ({ column }) => (
    <SortableHeaderButton column={column} label="Policy" />
  ),
  cell: ({ row }) => <DomainPolicyChip policy={row.original.policy} />,
  enableGlobalFilter: false,
}
