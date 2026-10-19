/** Sparkline series of the ranked tables, keyed by domain id or by IP. */
export type RankedTrends = {
  domains: Record<string, number[]>
  sources: Record<string, number[]>
}
