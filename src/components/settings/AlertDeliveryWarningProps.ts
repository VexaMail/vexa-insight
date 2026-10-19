import type { WebhookEndpointPublic } from '@/types/settings'

export type AlertDeliveryWarningProps = {
  readonly webhooks: readonly WebhookEndpointPublic[]
}
