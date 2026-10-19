import type { RowActionsState, WebhookEndpointPublic } from '@/types/settings'

export type WebhookEndpointRowProps = {
  readonly endpoint: WebhookEndpointPublic
  readonly actions: RowActionsState
  readonly onEdit: () => void
  readonly onTest: () => void
}
