import { StatusPill } from '@/components/ui'
import { formatCount } from '@/utils/dashboard'
import type { IngestionFactsProps } from './IngestionFactsProps'

/** Mailboxes polled, and whether mail is arriving on schedule. */
export function IngestionFreshness({
  health,
}: Readonly<Pick<IngestionFactsProps, 'health'>>) {
  if (health.mailboxCount === 0) {
    return <span className="text-muted-foreground">No mailbox configured</span>
  }
  return (
    <span className="flex flex-wrap items-center gap-2">
      <span>
        {formatCount(health.mailboxCount)}{' '}
        {health.mailboxCount === 1 ? 'mailbox' : 'mailboxes'}
      </span>
      {health.state === 'healthy' ? (
        <StatusPill tone="success" dot>
          Up to date
        </StatusPill>
      ) : (
        <StatusPill tone="warning" dot>
          Behind
        </StatusPill>
      )}
    </span>
  )
}
