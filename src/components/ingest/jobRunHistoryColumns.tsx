import type { dataTableFeatures } from '@/lib/dataTableFeatures'
import type { ColumnDef } from '@tanstack/react-table'
import { createJobRunProcessedColumn } from './createJobRunProcessedColumn'
import { createJobRunStatusColumn } from './createJobRunStatusColumn'
import type { GetJobRunHistoryColumnsParams } from './GetJobRunHistoryColumnsParams'
import { jobRunErrorCountColumn } from './jobRunErrorCountColumn'
import { jobRunIngestedColumn } from './jobRunIngestedColumn'
import type { JobRunRow } from './JobRunRow'
import { jobRunRunAtColumn } from './jobRunRunAtColumn'

export function getJobRunHistoryColumns(
  params: GetJobRunHistoryColumnsParams,
): ColumnDef<typeof dataTableFeatures, JobRunRow>[] {
  return [
    jobRunRunAtColumn,
    createJobRunStatusColumn(params),
    createJobRunProcessedColumn(params),
    jobRunIngestedColumn,
    jobRunErrorCountColumn,
  ]
}
