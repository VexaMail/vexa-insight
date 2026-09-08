import type { MetricsSnapshot } from './MetricsSnapshot'

/** One unlabelled Prometheus series and where its value comes from. */
export type PrometheusScalarMetric = {
  name: string
  help: string
  type: 'gauge' | 'counter'
  read: (snapshot: MetricsSnapshot) => number
}
