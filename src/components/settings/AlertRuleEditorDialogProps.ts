import type { AlertRule } from '@/types/alerts'
import type { AlertRuleFormState, EditorDialogState } from '@/types/settings'

export type AlertRuleEditorDialogProps = {
  readonly editor: EditorDialogState<AlertRuleFormState, AlertRule>
}
