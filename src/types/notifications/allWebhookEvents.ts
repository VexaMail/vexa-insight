import type { WebhookEvent } from './WebhookEvent'

export const ALL_WEBHOOK_EVENTS: WebhookEvent[] = [
  'ingest.failed',
  'unauthorized_source.detected',
  'update.available',
  'auth.fail_rate_spike',
  'snds.reputation_alert',
  'tls.failure_detected',
  'failure_report.received',
  'reports.stopped',
  'test.ping',
]
