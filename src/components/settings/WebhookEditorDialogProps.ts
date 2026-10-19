import type {
  EditorDialogState,
  WebhookEndpointPublic,
  WebhookFormState,
} from '@/types/settings'

export type WebhookEditorDialogProps = {
  readonly editor: EditorDialogState<WebhookFormState, WebhookEndpointPublic>
}
