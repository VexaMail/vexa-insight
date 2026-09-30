export type WebhookEvent =
  | 'ingest.failed'
  | 'unauthorized_source.detected'
  | 'update.available'
  | 'auth.fail_rate_spike'
  | 'snds.reputation_alert'
  | 'tls.failure_detected'
  | 'failure_report.received'
  | 'test.ping'
