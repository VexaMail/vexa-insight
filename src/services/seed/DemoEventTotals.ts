export type DemoEventTotals = {
  readonly count: number
  /** True when SPF or DKIM passed, so the count adds to the passed total. */
  readonly passed: boolean
}
