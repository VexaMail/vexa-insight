import type { AlertRule } from '@/types/alerts'
import type { AdminCollectionState } from './AdminCollectionState'
import type { AlertRuleFormState } from './AlertRuleFormState'
import type { EditorDialogState } from './EditorDialogState'
import type { RowActionsState } from './RowActionsState'

export type UseAlertRulesSectionReturn = {
  readonly collection: AdminCollectionState<AlertRule>
  readonly editor: EditorDialogState<AlertRuleFormState, AlertRule>
  readonly actions: RowActionsState
}
