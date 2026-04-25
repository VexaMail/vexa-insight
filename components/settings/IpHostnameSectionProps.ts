export type IpHostnameSectionProps = {
  enabled: boolean
  refreshIntervalHours: number
  timeoutMs: number
  maxRetries: number
  retryBackoffMinutes: number
  batchSize: number
  manualRefreshEnabled: boolean
  allowPrivateIps: boolean
  negativeCacheHours: number
  onChange: (key: string, value: boolean | number) => void
}
