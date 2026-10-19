import { AlertTriangle, CheckCircle2 } from 'lucide-react'
import type { AlertDeliveryWarningProps } from './AlertDeliveryWarningProps'
import { ArrowLinkButton } from './ArrowLinkButton'

/** Whether a fired rule reaches anyone: an enabled endpoint on the event. */
export function AlertDeliveryWarning({
  webhooks,
}: Readonly<AlertDeliveryWarningProps>) {
  const receivers = webhooks.filter(
    (w) => w.enabled && w.events.includes('auth.fail_rate_spike'),
  ).length
  return receivers === 0 ? (
    <div className="border-warning/30 bg-warning/10 mb-4 flex flex-col gap-3 rounded-md border px-3 py-2.5 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-warning flex items-start gap-2 text-xs">
        <AlertTriangle className="mt-px h-3.5 w-3.5 shrink-0" />
        <span>
          No enabled webhook subscribes to{' '}
          <code className="font-mono">auth.fail_rate_spike</code>, so a firing
          rule only updates its last-fired time.
        </span>
      </p>
      <ArrowLinkButton href="#webhooks" label="Open webhooks" />
    </div>
  ) : (
    <p className="text-muted-foreground mb-4 flex items-start gap-2 text-xs">
      <CheckCircle2 className="text-success mt-px h-3.5 w-3.5 shrink-0" />
      <span>
        Firing rules reach {receivers} enabled endpoint
        {receivers === 1 ? '' : 's'} subscribed to{' '}
        <code className="font-mono">auth.fail_rate_spike</code>.
      </span>
    </p>
  )
}
