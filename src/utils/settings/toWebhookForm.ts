import type { WebhookEndpointPublic, WebhookFormState } from '@/types/settings'

/** The edit dialog's fields for a stored endpoint; the secret stays hidden. */
export function toWebhookForm(
  endpoint: WebhookEndpointPublic,
): WebhookFormState {
  return {
    name: endpoint.name,
    url: endpoint.url,
    enabled: endpoint.enabled,
    events: endpoint.events,
    secret: '',
    clearSecret: false,
    hasSecret: endpoint.secret !== null,
  }
}
