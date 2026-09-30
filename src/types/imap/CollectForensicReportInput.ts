import type { CollectMessageAttachmentsInput } from './CollectMessageAttachmentsInput'

/** A message whose MIME structure is an ARF failure report. */
export type CollectForensicReportInput = Omit<
  CollectMessageAttachmentsInput,
  'partIds'
>
