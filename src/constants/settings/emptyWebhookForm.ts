import type { WebhookFormState } from '@/types/settings'

/** A new endpoint: enabled, subscribed to nothing yet. */
export const EMPTY_WEBHOOK_FORM: WebhookFormState = {
  name: '',
  url: '',
  enabled: true,
  events: [],
  secret: '',
  clearSecret: false,
  hasSecret: false,
}
