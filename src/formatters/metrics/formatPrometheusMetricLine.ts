import { escapeLabelValue } from './escapeLabelValue'

export function formatPrometheusMetricLine(
  name: string,
  value: number,
  labels?: Record<string, string>,
): string {
  if (!labels || Object.keys(labels).length === 0) {
    return `${name} ${String(value)}`
  }
  const labelStr = Object.entries(labels)
    .map(([k, v]) => `${k}="${escapeLabelValue(v)}"`)
    .join(',')
  return `${name}{${labelStr}} ${String(value)}`
}
