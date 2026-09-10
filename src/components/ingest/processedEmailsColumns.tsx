import type { dataTableFeatures } from '@/lib/dataTableFeatures'
import type { ProcessedEmail } from '@/types/ingest'
import type { ColumnDef } from '@tanstack/react-table'
import { createProcessedEmailActionsColumn } from './createProcessedEmailActionsColumn'
import type { GetProcessedEmailsColumnsParams } from './GetProcessedEmailsColumnsParams'
import { processedEmailInfoColumns } from './processedEmailInfoColumns'

export function getProcessedEmailsColumns({
  onViewEmail,
}: GetProcessedEmailsColumnsParams): ColumnDef<
  typeof dataTableFeatures,
  ProcessedEmail
>[] {
  return [
    ...processedEmailInfoColumns,
    createProcessedEmailActionsColumn(onViewEmail),
  ]
}
