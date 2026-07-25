export type SpfTreeNode = {
  domain: string
  record: string | null
  /** Lookup mechanisms a receiver will evaluate, ignored `redirect=` excluded. */
  mechanisms: string[]
  children: SpfTreeNode[]
  lookupCount: number
  missingRecord: boolean
  cycleDetected: boolean
  exceedsLookupLimit: boolean
  /**
   * Target of a `redirect=` the receiver must ignore because the record also
   * has an `all` mechanism (RFC 7208 section 6.1). Dead configuration: it is
   * neither followed nor counted. Null when absent or live.
   */
  ignoredRedirect: string | null
  /**
   * Evaluated mechanisms whose target carries a macro (`%{...}`). They consume
   * a lookup but cannot be expanded, since the target depends on the sending
   * IP and sender address.
   */
  macroMechanisms: string[]
}
