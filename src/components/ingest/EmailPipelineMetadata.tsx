'use client'

import type { EmailPipelineMetadataProps } from '@/types/ingest'
import { formatPollStatusTime } from '@/utils/format'

/** Renders nothing when neither timestamp is present. */
export function EmailPipelineMetadata({
  emailDate,
  processedAt,
}: EmailPipelineMetadataProps) {
  const hasEmailDate = emailDate !== undefined && emailDate !== ''
  const hasProcessedAt = processedAt !== undefined && processedAt !== ''
  if (!hasEmailDate && !hasProcessedAt) return null

  return (
    <dl className="border-border/50 text-muted-foreground mt-3 flex flex-wrap gap-x-4 gap-y-1 border-t pt-3 text-xs">
      {hasEmailDate ? (
        <div>
          <dt className="sr-only">Email date</dt>
          <dd>Email: {formatPollStatusTime(emailDate)}</dd>
        </div>
      ) : null}
      {hasProcessedAt ? (
        <div>
          <dt className="sr-only">Processed at</dt>
          <dd>Processed: {formatPollStatusTime(processedAt)}</dd>
        </div>
      ) : null}
    </dl>
  )
}
