import type { dataTableFeatures } from '@/lib/dataTableFeatures'
import type { IpSummaryData } from '@/types/ips'
import type { Table } from '@tanstack/react-table'

export type IpsTableToolbarProps = {
  readonly table: Table<typeof dataTableFeatures, IpSummaryData>
}
