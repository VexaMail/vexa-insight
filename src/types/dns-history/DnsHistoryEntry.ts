export type DnsHistoryEntry = {
  readonly id: number
  readonly recordKind: string
  readonly value: string | null
  /** Unix seconds. */
  readonly observedAt: number
  readonly source: 'scheduled' | 'manual'
}
