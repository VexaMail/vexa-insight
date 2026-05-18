import type { MetricsSnapshot } from '@/types/metrics'
import { formatPrometheusMetricLine } from './formatPrometheusMetricLine'

export function formatPrometheusOutput(snapshot: MetricsSnapshot): string {
  const lines: string[] = []

  lines.push('# HELP vexa_domains_total Number of distinct domains tracked.')
  lines.push('# TYPE vexa_domains_total gauge')
  lines.push(
    formatPrometheusMetricLine('vexa_domains_total', snapshot.domainsTotal),
  )

  lines.push(
    '# HELP vexa_ip_addresses_total Number of distinct source IPs seen.',
  )
  lines.push('# TYPE vexa_ip_addresses_total gauge')
  lines.push(
    formatPrometheusMetricLine(
      'vexa_ip_addresses_total',
      snapshot.ipAddressesTotal,
    ),
  )

  lines.push(
    '# HELP vexa_dmarc_reports_total Number of DMARC aggregate reports ingested.',
  )
  lines.push('# TYPE vexa_dmarc_reports_total counter')
  lines.push(
    formatPrometheusMetricLine(
      'vexa_dmarc_reports_total',
      snapshot.rawReportsTotal,
    ),
  )

  lines.push(
    '# HELP vexa_dmarc_events_total Number of normalized DMARC events stored.',
  )
  lines.push('# TYPE vexa_dmarc_events_total counter')
  lines.push(
    formatPrometheusMetricLine(
      'vexa_dmarc_events_total',
      snapshot.normalizedEventsTotal,
    ),
  )

  lines.push(
    '# HELP vexa_dmarc_events_by_spf_auth Normalized DMARC events partitioned by SPF auth result.',
  )
  lines.push('# TYPE vexa_dmarc_events_by_spf_auth counter')
  for (const [result, value] of Object.entries(snapshot.eventsBySpfAuth)) {
    lines.push(
      formatPrometheusMetricLine('vexa_dmarc_events_by_spf_auth', value, {
        result,
      }),
    )
  }

  lines.push(
    '# HELP vexa_dmarc_events_by_disposition Normalized DMARC events partitioned by policy disposition.',
  )
  lines.push('# TYPE vexa_dmarc_events_by_disposition counter')
  for (const [disposition, value] of Object.entries(
    snapshot.eventsByDisposition,
  )) {
    lines.push(
      formatPrometheusMetricLine('vexa_dmarc_events_by_disposition', value, {
        disposition,
      }),
    )
  }

  lines.push(
    '# HELP vexa_ingest_last_run_timestamp_seconds Unix timestamp of the last ingest run.',
  )
  lines.push('# TYPE vexa_ingest_last_run_timestamp_seconds gauge')
  lines.push(
    formatPrometheusMetricLine(
      'vexa_ingest_last_run_timestamp_seconds',
      snapshot.ingestLastRunTimestampSeconds ?? 0,
    ),
  )

  lines.push(
    '# HELP vexa_ingest_running 1 if an ingest job is currently running.',
  )
  lines.push('# TYPE vexa_ingest_running gauge')
  lines.push(
    formatPrometheusMetricLine('vexa_ingest_running', snapshot.ingestIsRunning),
  )

  lines.push(
    '# HELP vexa_ingest_last_run_processed Number of items processed in the most recent ingest run.',
  )
  lines.push('# TYPE vexa_ingest_last_run_processed gauge')
  lines.push(
    formatPrometheusMetricLine(
      'vexa_ingest_last_run_processed',
      snapshot.ingestLastSuccessTotal,
    ),
  )

  lines.push(
    '# HELP vexa_ingest_last_run_errors Number of errors in the most recent ingest run.',
  )
  lines.push('# TYPE vexa_ingest_last_run_errors gauge')
  lines.push(
    formatPrometheusMetricLine(
      'vexa_ingest_last_run_errors',
      snapshot.ingestLastErrorCount,
    ),
  )

  return lines.join('\n') + '\n'
}
