import type { WebhookEndpointPublic } from '@/types/settings'

export type WebhookTestButtonProps = {
  readonly endpoint: WebhookEndpointPublic
  readonly busy: boolean
  readonly onTest: () => void
}
