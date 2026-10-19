export type AlertMatch = {
  readonly domain: string
  /** DMARC pass rate in the last window, percent with one decimal. */
  readonly currentRate: number
  /** Same for the window before it; null for a floor rule. */
  readonly previousRate: number | null
  readonly messages: number
}
