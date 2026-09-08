import type { PrometheusLabelledMetric } from '@/types/metrics'
import { formatPrometheusMetricLine } from './formatPrometheusMetricLine'

/** HELP, TYPE and one value line per label value of a partitioned series. */
export function formatPrometheusLabelledMetric(
  metric: PrometheusLabelledMetric,
): string[] {
  return [
    `# HELP ${metric.name} ${metric.help}`,
    `# TYPE ${metric.name} ${metric.type}`,
    ...Object.entries(metric.values).map(([value, count]) =>
      formatPrometheusMetricLine(metric.name, count, {
        [metric.label]: value,
      }),
    ),
  ]
}
