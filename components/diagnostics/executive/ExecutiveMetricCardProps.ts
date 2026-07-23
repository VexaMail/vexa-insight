export type ExecutiveMetricCardProps = {
  label: string
  value: string
  status:
    'healthy' | 'degraded' | 'critical' | 'enforcing' | 'monitoring' | 'missing'
}
