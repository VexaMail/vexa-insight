import type { dataTableFeatures } from '@/lib/dataTableFeatures'
import type { ColumnDef } from '@tanstack/react-table'
import { createSourceIpColumn } from './columns/createSourceIpColumn'
import { senderColumn } from './columns/senderColumn'
import { sourceCountColumn } from './columns/sourceCountColumn'
import type { GetDomainSourcesColumnsParams } from './GetDomainSourcesColumnsParams'
import type { SourceRow } from './SourceRow'

export function getDomainSourcesColumns(
  params: GetDomainSourcesColumnsParams,
): ColumnDef<typeof dataTableFeatures, SourceRow>[] {
  return [createSourceIpColumn(params), senderColumn, sourceCountColumn]
}
