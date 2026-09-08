import type { MetricsSnapshot, PrometheusScalarMetric } from '@/types/metrics'
import { formatPrometheusMetricLine } from './formatPrometheusMetricLine'

/** HELP, TYPE and value lines of one unlabelled series. */
export function formatPrometheusScalarMetric(
  metric: PrometheusScalarMetric,
  snapshot: MetricsSnapshot,
): string[] {
  return [
    `# HELP ${metric.name} ${metric.help}`,
    `# TYPE ${metric.name} ${metric.type}`,
    formatPrometheusMetricLine(metric.name, metric.read(snapshot)),
  ]
}
