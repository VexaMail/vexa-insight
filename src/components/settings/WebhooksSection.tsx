import { Webhook } from 'lucide-react'
import { AdminListNotice } from './AdminListNotice'
import { ConfirmDeleteDialog } from './ConfirmDeleteDialog'
import { ListEmptyState } from './ListEmptyState'
import { SectionAddButton } from './SectionAddButton'
import { SettingsSection } from './SettingsSection'
import { WebhookEditorDialog } from './WebhookEditorDialog'
import { WebhookEndpointList } from './WebhookEndpointList'
import type { WebhooksSectionProps } from './WebhooksSectionProps'

/** Webhook endpoints, saved the moment they change. */
export function WebhooksSection({ webhooks }: Readonly<WebhooksSectionProps>) {
  const { collection, editor, actions } = webhooks
  return (
    <SettingsSection
      anchorId="webhooks"
      headingId="settings-webhooks-heading"
      icon={<Webhook />}
      iconTone="info"
      title="Webhooks"
      description="JSON POSTs to your own endpoints when an event happens. Changes here save immediately."
      actions={
        <SectionAddButton label="Add endpoint" onClick={editor.openCreate} />
      }
    >
      <AdminListNotice notice={actions.notice} error={collection.error} />
      {collection.items.length === 0 ? (
        <ListEmptyState
          loading={collection.loading}
          loadingLabel="Loading endpoints…"
          title="No endpoint configured"
          hint="Add a URL that accepts POST requests, pick its events, and include test.ping to check it from here."
        />
      ) : (
        <WebhookEndpointList webhooks={webhooks} />
      )}
      <WebhookEditorDialog editor={editor} />
      <ConfirmDeleteDialog
        target={actions.pendingDelete}
        noun="webhook endpoint"
        consequence="It stops receiving events at once."
        onCancel={actions.cancelDelete}
        onConfirm={() => {
          void actions.confirmDelete()
        }}
      />
    </SettingsSection>
  )
}
