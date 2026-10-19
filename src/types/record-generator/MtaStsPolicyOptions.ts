export type MtaStsPolicyOptions = {
  readonly mode: 'testing' | 'enforce' | 'none'
  /** MX host names or `*.` patterns the policy allows. */
  readonly mx: readonly string[]
  /** Seconds; RFC 8461 allows up to 31557600. */
  readonly maxAge: number
}
