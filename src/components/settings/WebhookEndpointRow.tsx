import { IconTile } from '@/components/ui'
import { KeyRound, Webhook } from 'lucide-react'
import { WebhookDeliveryStatus } from './WebhookDeliveryStatus'
import { WebhookEndpointRowControls } from './WebhookEndpointRowControls'
import type { WebhookEndpointRowProps } from './WebhookEndpointRowProps'
import { WebhookEndpointUrl } from './WebhookEndpointUrl'
import { WebhookEventChips } from './WebhookEventChips'

/** One endpoint: target, subscriptions, signing, last delivery and controls. */
export function WebhookEndpointRow(props: Readonly<WebhookEndpointRowProps>) {
  const { endpoint } = props
  return (
    <li className="grid grid-cols-[auto_minmax(0,1fr)] items-start gap-3 px-4 py-4 sm:grid-cols-[auto_minmax(0,1fr)_auto]">
      <IconTile size="sm" tone={endpoint.enabled ? 'info' : 'unknown'}>
        <Webhook />
      </IconTile>
      <div className="min-w-0 space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-foreground text-sm font-medium">{endpoint.name}</p>
          {endpoint.enabled ? null : (
            <span className="text-muted-foreground text-xs">Paused</span>
          )}
        </div>
        <WebhookEndpointUrl url={endpoint.url} />
        <WebhookEventChips events={endpoint.events} />
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <WebhookDeliveryStatus endpoint={endpoint} />
          <span className="text-muted-foreground inline-flex items-center gap-1.5 text-xs">
            <KeyRound className="h-3.5 w-3.5" />
            {endpoint.secret === null ? (
              'Unsigned'
            ) : (
              <>
                Signed
                <span className="font-mono">{endpoint.secret}</span>
              </>
            )}
          </span>
        </div>
      </div>
      <WebhookEndpointRowControls {...props} />
    </li>
  )
}
