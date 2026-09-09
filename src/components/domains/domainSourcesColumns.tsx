import type { ColumnDef } from '@tanstack/react-table'
import { createSourceIpColumn } from './columns/createSourceIpColumn'
import { sourceCountColumn } from './columns/sourceCountColumn'
import type { GetDomainSourcesColumnsParams } from './GetDomainSourcesColumnsParams'
import type { SourceRow } from './SourceRow'

export function getDomainSourcesColumns(
  params: GetDomainSourcesColumnsParams,
): ColumnDef<SourceRow>[] {
  return [createSourceIpColumn(params), sourceCountColumn]
}
