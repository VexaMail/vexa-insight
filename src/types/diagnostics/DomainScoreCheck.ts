export type DomainScoreCheck = {
  /** Stable identifier of the protocol this check scores. */
  id: 'spf' | 'dkim' | 'dmarc' | 'mtaSts' | 'tlsRpt' | 'bimi'
  label: string
  /** Points earned by the domain for this check. */
  earned: number
  /** Points this check can award at most. */
  max: number
  /** Core checks make up the 100-point base; bonus checks only add on top. */
  weight: 'core' | 'bonus'
  /** One sentence explaining the points, and what would raise them. */
  detail: string
}
