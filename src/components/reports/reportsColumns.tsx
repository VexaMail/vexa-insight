'use client'

import type { dataTableFeatures } from '@/lib/dataTableFeatures'
import type { ColumnDef } from '@tanstack/react-table'
import { createActionsColumn } from './columns/createActionsColumn'
import { createDateRangeColumn } from './columns/createDateRangeColumn'
import { createOrgNameColumn } from './columns/createOrgNameColumn'
import { createReportIdColumn } from './columns/createReportIdColumn'
import { dmarcStatusColumn } from './columns/dmarcStatusColumn'
import { failingColumn } from './columns/failingColumn'
import { messagesColumn } from './columns/messagesColumn'
import { relatedDomainsColumn } from './columns/relatedDomainsColumn'
import type { GetReportsColumnsParams } from './GetReportsColumnsParams'
import type { ReportRow } from './ReportRow'

export function getReportsColumns(
  params: GetReportsColumnsParams,
): ColumnDef<typeof dataTableFeatures, ReportRow>[] {
  return [
    dmarcStatusColumn,
    relatedDomainsColumn,
    createOrgNameColumn(params),
    createReportIdColumn(params),
    createDateRangeColumn(params),
    messagesColumn,
    failingColumn,
    createActionsColumn(params),
  ]
}
