'use client'

import {
  ALERT_RULES_API_PATH,
  EMPTY_ALERT_RULE_FORM,
} from '@/constants/settings'
import type { AlertRule } from '@/types/alerts'
import type { UseAlertRulesSectionReturn } from '@/types/settings'
import { toAlertRuleForm, toAlertRulePayload } from '@/utils/settings'
import { useAdminCollection } from './useAdminCollection'
import { useEditorDialog } from './useEditorDialog'
import { useRowActions } from './useRowActions'

/** Alert rules: the list, the editor and row actions. */
export function useAlertRulesSection(): UseAlertRulesSectionReturn {
  const collection = useAdminCollection<AlertRule>(ALERT_RULES_API_PATH)
  const editor = useEditorDialog({
    basePath: ALERT_RULES_API_PATH,
    emptyForm: EMPTY_ALERT_RULE_FORM,
    toForm: toAlertRuleForm,
    toPayload: toAlertRulePayload,
    onSaved: collection.reload,
  })
  const actions = useRowActions(ALERT_RULES_API_PATH, collection.reload)
  return { collection, editor, actions }
}
