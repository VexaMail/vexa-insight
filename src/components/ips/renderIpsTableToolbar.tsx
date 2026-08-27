import type { IpSummaryData } from '@/types/ips'
import type { Table } from '@tanstack/react-table'
import type { ReactNode } from 'react'
import { IpsTableToolbar } from './IpsTableToolbar'

export function renderIpsTableToolbar(table: Table<IpSummaryData>): ReactNode {
  return <IpsTableToolbar table={table} />
}
