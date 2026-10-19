import type { WebhookEvent } from '@/types/notifications'

/** One line per webhook event, shown beside its checkbox. */
export const WEBHOOK_EVENT_DESCRIPTIONS: Record<WebhookEvent, string> = {
  'ingest.failed': 'An ingestion run failed.',
  'unauthorized_source.detected':
    'A report shows IPs aligned on neither SPF nor DKIM.',
  'update.available': 'A newer release was published.',
  'auth.fail_rate_spike': 'An alert rule fired.',
  'snds.reputation_alert': 'SNDS flagged one of your sending IPs.',
  'tls.failure_detected': 'A TLS-RPT report shows failed sessions.',
  'failure_report.received': 'A forensic (RUF) report arrived.',
  'reports.stopped': 'A domain stopped receiving reports.',
  'dns.record_changed': 'A DNS record changed since the last lookup.',
  'test.ping': 'Test deliveries sent from this page.',
}
