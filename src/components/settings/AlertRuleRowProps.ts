import type { AlertRule } from '@/types/alerts'
import type { RowActionsState } from '@/types/settings'

export type AlertRuleRowProps = {
  readonly rule: AlertRule
  readonly actions: RowActionsState
  readonly onEdit: () => void
}
