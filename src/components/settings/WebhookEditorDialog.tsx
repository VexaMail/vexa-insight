import { EditorDialogShell } from './EditorDialogShell'
import type { WebhookEditorDialogProps } from './WebhookEditorDialogProps'
import { WebhookEndpointFields } from './WebhookEndpointFields'
import { WebhookEventsField } from './WebhookEventsField'
import { WebhookSecretField } from './WebhookSecretField'

/** Create or edit one webhook endpoint. */
export function WebhookEditorDialog({
  editor,
}: Readonly<WebhookEditorDialogProps>) {
  const isEdit = editor.editingId !== null
  return (
    <EditorDialogShell
      open={editor.open}
      title={isEdit ? 'Edit webhook endpoint' : 'Add webhook endpoint'}
      description="Each event is POSTed as JSON; with a secret, the body is signed with HMAC-SHA256."
      error={editor.error}
      saving={editor.saving}
      onClose={editor.close}
      onSubmit={() => {
        void editor.submit()
      }}
    >
      <WebhookEndpointFields form={editor.form} setForm={editor.setForm} />
      <WebhookEventsField form={editor.form} setForm={editor.setForm} />
      <WebhookSecretField form={editor.form} setForm={editor.setForm} />
    </EditorDialogShell>
  )
}
