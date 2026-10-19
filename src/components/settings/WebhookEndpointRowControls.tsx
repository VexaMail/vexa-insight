import { EnabledSwitch } from './EnabledSwitch'
import { RowActionButtons } from './RowActionButtons'
import type { WebhookEndpointRowProps } from './WebhookEndpointRowProps'
import { WebhookTestButton } from './WebhookTestButton'

/** Enable switch, test send, edit and delete of one endpoint. */
export function WebhookEndpointRowControls({
  endpoint,
  actions,
  onEdit,
  onTest,
}: Readonly<WebhookEndpointRowProps>) {
  const busy = actions.busyId === endpoint.id
  return (
    <div className="col-span-2 flex items-center justify-between gap-3 sm:col-span-1 sm:justify-end">
      <EnabledSwitch
        checked={endpoint.enabled}
        label={`Enable ${endpoint.name}`}
        disabled={busy}
        onChange={(enabled) => {
          void actions.toggleEnabled(endpoint.id, enabled)
        }}
      />
      <RowActionButtons
        name={endpoint.name}
        busy={busy}
        onEdit={onEdit}
        onDelete={() => {
          actions.askDelete({ id: endpoint.id, name: endpoint.name })
        }}
      >
        <WebhookTestButton endpoint={endpoint} busy={busy} onTest={onTest} />
      </RowActionButtons>
    </div>
  )
}
