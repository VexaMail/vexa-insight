/** One Prometheus series partitioned by a single label. */
export type PrometheusLabelledMetric = {
  name: string
  help: string
  type: 'gauge' | 'counter'
  label: string
  values: Record<string, number>
}
