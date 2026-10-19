/** The steps from monitoring a domain to rejecting spoofed mail. */
export type EnforcementStageKey =
  'observe' | 'identify' | 'fix' | 'quarantine' | 'reject'
