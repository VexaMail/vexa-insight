export type DnsRecordChange = {
  readonly recordKind: string
  /** Undefined when the record kind had never been observed before. */
  readonly previous: string | null | undefined
  readonly current: string | null
}
