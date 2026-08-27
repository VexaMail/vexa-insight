/**
 * Health status a metric card renders. Shared by the diagnostics executive
 * summary, the report KPI cards and the generic `KpiCard` primitive, so it
 * lives here rather than inside any one of those slices: the style maps in
 * `constants/metrics` key on it, and a UI primitive must not reach into a
 * feature slice to find out what statuses exist.
 */
export type MetricStatus =
  'healthy' | 'degraded' | 'critical' | 'enforcing' | 'monitoring' | 'missing'
