import type { ProcessedEmailMetaProps } from '@/types/ingest'
import { formatPollStatusTime } from '@/utils/format'

/** Identity and timing of one processed email. */
export function ProcessedEmailMeta({ email }: ProcessedEmailMetaProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <div>
        <div className="text-muted-foreground text-xs font-medium">
          Message ID
        </div>
        <p className="text-foreground mt-1 font-mono text-sm break-all">
          {email.messageId}
        </p>
      </div>
      <div>
        <div className="text-muted-foreground text-xs font-medium">Account</div>
        <p className="text-foreground mt-1 text-sm">
          {email.accountLabel ?? '—'}
        </p>
      </div>
      <div>
        <div className="text-muted-foreground text-xs font-medium">
          Processed At
        </div>
        <p className="text-foreground mt-1 text-sm">
          {formatPollStatusTime(email.processedAt)}
        </p>
      </div>
    </div>
  )
}
