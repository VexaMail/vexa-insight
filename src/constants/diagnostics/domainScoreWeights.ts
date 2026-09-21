/**
 * Points each protocol can contribute. SPF, DKIM and DMARC add up to the full
 * 100; the rest is optional hardening on top, capped by computeDomainScore.
 */
export const domainScoreWeights = {
  spf: 25,
  dkim: 25,
  dmarc: 50,
  mtaSts: 5,
  tlsRpt: 3,
  bimi: 2,
} as const
