import type {
  UseAlertRulesSectionReturn,
  WebhookEndpointPublic,
} from '@/types/settings'

export type AlertRulesSectionProps = {
  readonly rules: UseAlertRulesSectionReturn
  /** The webhook endpoints, to say whether a firing rule reaches anyone. */
  readonly webhooks: readonly WebhookEndpointPublic[]
}
