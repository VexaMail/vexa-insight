import type { AlertRuleFormState } from '@/types/settings'
import type { Dispatch, SetStateAction } from 'react'

export type AlertRuleFieldsProps = {
  readonly form: AlertRuleFormState
  readonly setForm: Dispatch<SetStateAction<AlertRuleFormState>>
}
