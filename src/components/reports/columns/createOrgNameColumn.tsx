'use client'

import { SortHeaderButton } from '@/components/ui'
import type { ColumnDef } from '@tanstack/react-table'
import type { GetReportsColumnsParams } from '../GetReportsColumnsParams'
import type { ReportRow } from '../ReportRow'

export function createOrgNameColumn({
  dispatch,
  sortKey,
  sortDir,
}: GetReportsColumnsParams): ColumnDef<ReportRow> {
  return {
    accessorKey: 'orgName',
    header: () => (
      <SortHeaderButton
        label="Organization"
        active={sortKey === 'orgName'}
        dir={sortDir}
        onSort={() => {
          dispatch({ type: 'SET_SORT', payload: { key: 'orgName' } })
        }}
      />
    ),
    cell: ({ row }) => (
      <span className="text-muted-foreground text-sm">
        {row.getValue('orgName')}
      </span>
    ),
  }
}
