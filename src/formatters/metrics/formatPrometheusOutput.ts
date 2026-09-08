import {
  PROMETHEUS_COUNT_METRICS,
  PROMETHEUS_INGEST_METRICS,
} from '@/constants/metrics'
import type { MetricsSnapshot } from '@/types/metrics'
import { formatPrometheusLabelledMetric } from './formatPrometheusLabelledMetric'
import { formatPrometheusScalarMetric } from './formatPrometheusScalarMetric'

/** The whole metrics endpoint body, in Prometheus text exposition format. */
export function formatPrometheusOutput(snapshot: MetricsSnapshot): string {
  const lines = [
    ...PROMETHEUS_COUNT_METRICS.flatMap((metric) =>
      formatPrometheusScalarMetric(metric, snapshot),
    ),
    ...formatPrometheusLabelledMetric({
      name: 'vexa_dmarc_events_by_spf_auth',
      help: 'Normalized DMARC events partitioned by SPF auth result.',
      type: 'counter',
      label: 'result',
      values: snapshot.eventsBySpfAuth,
    }),
    ...formatPrometheusLabelledMetric({
      name: 'vexa_dmarc_events_by_disposition',
      help: 'Normalized DMARC events partitioned by policy disposition.',
      type: 'counter',
      label: 'disposition',
      values: snapshot.eventsByDisposition,
    }),
    ...PROMETHEUS_INGEST_METRICS.flatMap((metric) =>
      formatPrometheusScalarMetric(metric, snapshot),
    ),
  ]

  return lines.join('\n') + '\n'
}
