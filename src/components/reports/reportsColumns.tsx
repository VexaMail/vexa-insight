'use client'

import type { ColumnDef } from '@tanstack/react-table'
import { createActionsColumn } from './columns/createActionsColumn'
import { createDateRangeColumn } from './columns/createDateRangeColumn'
import { createOrgNameColumn } from './columns/createOrgNameColumn'
import { createReportIdColumn } from './columns/createReportIdColumn'
import { relatedDomainsColumn } from './columns/relatedDomainsColumn'
import type { GetReportsColumnsParams } from './GetReportsColumnsParams'
import type { ReportRow } from './ReportRow'

export function getReportsColumns(
  params: GetReportsColumnsParams,
): ColumnDef<ReportRow>[] {
  return [
    relatedDomainsColumn,
    createReportIdColumn(params),
    createOrgNameColumn(params),
    createDateRangeColumn(params),
    createActionsColumn(params),
  ]
}
