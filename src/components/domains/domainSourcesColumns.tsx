import type { dataTableFeatures } from '@/lib/dataTableFeatures'
import type { ColumnDef } from '@tanstack/react-table'
import { authPairColumn } from './columns/authPairColumn'
import { classificationColumn } from './columns/classificationColumn'
import { createHostnameColumn } from './columns/createHostnameColumn'
import { createSourceIpColumn } from './columns/createSourceIpColumn'
import { dmarcColumn } from './columns/dmarcColumn'
import { lastSeenColumn } from './columns/lastSeenColumn'
import { sourceCountColumn } from './columns/sourceCountColumn'
import { sourceOpenColumn } from './columns/sourceOpenColumn'
import type { GetDomainSourcesColumnsParams } from './GetDomainSourcesColumnsParams'
import type { SourceRow } from './SourceRow'

export function getDomainSourcesColumns(
  params: GetDomainSourcesColumnsParams,
): ColumnDef<typeof dataTableFeatures, SourceRow>[] {
  return [
    createSourceIpColumn(),
    createHostnameColumn(params),
    sourceCountColumn,
    authPairColumn('spf'),
    authPairColumn('dkim'),
    dmarcColumn,
    classificationColumn,
    lastSeenColumn,
    sourceOpenColumn,
  ]
}
