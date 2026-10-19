import { WebhookEndpointRow } from './WebhookEndpointRow'
import type { WebhooksSectionProps } from './WebhooksSectionProps'

/** The endpoint rows, edge to edge inside the section panel. */
export function WebhookEndpointList({
  webhooks,
}: Readonly<WebhooksSectionProps>) {
  const { collection, editor, actions, sendTest } = webhooks
  return (
    <ul className="border-border divide-border -mx-4 -mb-4 divide-y border-t first:-mt-4 first:border-t-0">
      {collection.items.map((endpoint) => (
        <WebhookEndpointRow
          key={endpoint.id}
          endpoint={endpoint}
          actions={actions}
          onEdit={() => {
            editor.openEdit(endpoint)
          }}
          onTest={() => {
            void sendTest(endpoint.id)
          }}
        />
      ))}
    </ul>
  )
}
