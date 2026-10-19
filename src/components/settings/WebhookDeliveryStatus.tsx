import { StatusPill } from '@/components/ui'
import { formatRelativeDate } from '@/utils/format'
import { webhookDeliveryTone } from '@/utils/settings'
import { Check, X } from 'lucide-react'
import type { WebhookDeliveryStatusProps } from './WebhookDeliveryStatusProps'

/** The endpoint's last delivery: HTTP status, when, attempts and the error. */
export function WebhookDeliveryStatus({
  endpoint,
}: Readonly<WebhookDeliveryStatusProps>) {
  const { lastDispatchAt, lastStatus, lastError, lastAttempts } = endpoint
  if (lastDispatchAt === null) {
    return (
      <StatusPill tone="unknown" dot>
        No delivery yet
      </StatusPill>
    )
  }
  const tone = webhookDeliveryTone(lastStatus)
  const when = formatRelativeDate(Date.parse(lastDispatchAt) / 1000)
  const attempts = lastAttempts ?? 1
  return (
    <div className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1 text-xs">
      <StatusPill
        tone={tone}
        variant="solid"
        icon={tone === 'success' ? <Check /> : <X />}
        {...(lastError === null ? {} : { title: lastError })}
      >
        <span className="font-mono">
          {lastStatus === 'error' ? 'Failed' : `HTTP ${lastStatus ?? '?'}`}
        </span>
      </StatusPill>
      <span className="text-muted-foreground" title={lastDispatchAt}>
        {when.relative} · {attempts} attempt{attempts === 1 ? '' : 's'}
      </span>
      {lastError ? (
        <span
          className="text-danger min-w-0 truncate font-mono"
          title={lastError}
        >
          {lastError}
        </span>
      ) : null}
    </div>
  )
}
