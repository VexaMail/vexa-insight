import type { WebhookFormState } from '@/types/settings'
import type { Dispatch, SetStateAction } from 'react'

export type WebhookFieldsProps = {
  readonly form: WebhookFormState
  readonly setForm: Dispatch<SetStateAction<WebhookFormState>>
}
