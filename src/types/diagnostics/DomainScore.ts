import type { DomainScoreCheck } from './DomainScoreCheck'

export type DomainScore = {
  grade: 'A' | 'B' | 'C' | 'D' | 'F'
  /** Final score, core plus bonus, capped at 100. */
  percentage: number
  /** SPF, DKIM and DMARC only, out of 100. */
  coreScore: number
  /** Extra points from MTA-STS, TLS-RPT and BIMI, before the cap. */
  bonusScore: number
  checks: DomainScoreCheck[]
}
