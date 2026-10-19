import { BellRing } from 'lucide-react'
import { AdminListNotice } from './AdminListNotice'
import { AlertDeliveryWarning } from './AlertDeliveryWarning'
import { AlertRuleEditorDialog } from './AlertRuleEditorDialog'
import { AlertRuleKindLegend } from './AlertRuleKindLegend'
import { AlertRuleList } from './AlertRuleList'
import type { AlertRulesSectionProps } from './AlertRulesSectionProps'
import { ConfirmDeleteDialog } from './ConfirmDeleteDialog'
import { ListEmptyState } from './ListEmptyState'
import { SectionAddButton } from './SectionAddButton'
import { SettingsSection } from './SettingsSection'

/** Compliance alert rules, checked daily, saved the moment they change. */
export function AlertRulesSection({
  rules,
  webhooks,
}: Readonly<AlertRulesSectionProps>) {
  const { collection, editor, actions } = rules
  return (
    <SettingsSection
      anchorId="alert-rules"
      headingId="settings-alert-rules-heading"
      icon={<BellRing />}
      iconTone="warning"
      title="Alert rules"
      description="Checked once a day. A rule fires at most once per window and sends the auth.fail_rate_spike webhook event."
      actions={
        <SectionAddButton label="Add rule" onClick={editor.openCreate} />
      }
    >
      <AlertRuleKindLegend />
      <AlertDeliveryWarning webhooks={webhooks} />
      <AdminListNotice notice={actions.notice} error={collection.error} />
      {collection.items.length === 0 ? (
        <ListEmptyState
          loading={collection.loading}
          loadingLabel="Loading rules…"
          title="No alert rule yet"
          hint="A common start: a compliance drop of 10 pp over 7 days, for every domain."
        />
      ) : (
        <AlertRuleList rules={rules} />
      )}
      <AlertRuleEditorDialog editor={editor} />
      <ConfirmDeleteDialog
        target={actions.pendingDelete}
        noun="alert rule"
        consequence="Its condition is no longer checked."
        onCancel={actions.cancelDelete}
        onConfirm={() => {
          void actions.confirmDelete()
        }}
      />
    </SettingsSection>
  )
}
