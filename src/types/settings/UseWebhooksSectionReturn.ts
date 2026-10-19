import type { AdminCollectionState } from './AdminCollectionState'
import type { EditorDialogState } from './EditorDialogState'
import type { RowActionsState } from './RowActionsState'
import type { WebhookEndpointPublic } from './WebhookEndpointPublic'
import type { WebhookFormState } from './WebhookFormState'

export type UseWebhooksSectionReturn = {
  readonly collection: AdminCollectionState<WebhookEndpointPublic>
  readonly editor: EditorDialogState<WebhookFormState, WebhookEndpointPublic>
  readonly actions: RowActionsState
  readonly sendTest: (id: number) => Promise<void>
}
