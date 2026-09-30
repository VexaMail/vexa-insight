/**
 * Limits of the enforcement readiness check.
 * - `minMessages`, `minReportDays`: below either there is too little to judge.
 * - `legitimatePassRate`: a source passing at least this share of its mail is
 *   a real sender whose failures are a configuration gap.
 * - `maxLegitimateFailureRate`: legitimate failing mail, as a share of all
 *   mail, above which enforcing would lose real mail.
 * - `topSources`: failing sources listed.
 */
export const ENFORCEMENT_THRESHOLDS = {
  minMessages: 100,
  minReportDays: 7,
  legitimatePassRate: 0.5,
  maxLegitimateFailureRate: 0.005,
  topSources: 10,
} as const
