export type DmarcRecordOptions = {
  readonly policy: 'none' | 'quarantine' | 'reject'
  /** Subdomain policy; omitted when it would equal `policy`. */
  readonly subdomainPolicy?: 'none' | 'quarantine' | 'reject' | undefined
  /** 1-100; omitted at 100, the default. */
  readonly percent?: number | undefined
  /** Aggregate report addresses, without `mailto:`. */
  readonly rua: readonly string[]
  /** Failure report addresses, without `mailto:`. */
  readonly ruf?: readonly string[] | undefined
  readonly strictDkim?: boolean | undefined
  readonly strictSpf?: boolean | undefined
  /** `fo=1` asks for a failure report when any mechanism fails. */
  readonly reportAnyFailure?: boolean | undefined
}
