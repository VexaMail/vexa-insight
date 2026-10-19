import type { AlertRuleEditorDialogProps } from './AlertRuleEditorDialogProps'
import { AlertRuleIdentityFields } from './AlertRuleIdentityFields'
import { AlertRuleKindField } from './AlertRuleKindField'
import { AlertRuleNumberFields } from './AlertRuleNumberFields'
import { EditorDialogShell } from './EditorDialogShell'

/** Create or edit one alert rule. */
export function AlertRuleEditorDialog({
  editor,
}: Readonly<AlertRuleEditorDialogProps>) {
  return (
    <EditorDialogShell
      open={editor.open}
      title={editor.editingId === null ? 'Add alert rule' : 'Edit alert rule'}
      description="A matching domain sends auth.fail_rate_spike to the webhooks subscribed to it."
      error={editor.error}
      saving={editor.saving}
      onClose={editor.close}
      onSubmit={() => {
        void editor.submit()
      }}
    >
      <AlertRuleIdentityFields form={editor.form} setForm={editor.setForm} />
      <AlertRuleKindField form={editor.form} setForm={editor.setForm} />
      <AlertRuleNumberFields form={editor.form} setForm={editor.setForm} />
    </EditorDialogShell>
  )
}
