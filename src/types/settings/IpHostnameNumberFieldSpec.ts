/** Declarative description of one numeric IP-to-hostname lookup setting. */
export type IpHostnameNumberFieldSpec = {
  readonly id: string
  readonly label: string
  readonly min: number
  readonly max: number
  readonly step: number | undefined
  /** Value applied when the input is cleared or not a number. */
  readonly fallback: number
  /** Column of `app_settings` the change is reported against. */
  readonly settingKey: string
  /** Prop of `IpHostnameSectionProps` holding the current value. */
  readonly valueKey:
    | 'refreshIntervalHours'
    | 'negativeCacheHours'
    | 'timeoutMs'
    | 'maxRetries'
    | 'retryBackoffMinutes'
    | 'batchSize'
}
