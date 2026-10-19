/** What a published `p=` value does to failing mail, in a few words. */
export function policyModeLabel(policy: string | null): string {
  if (policy === 'reject') return 'Rejects failing mail'
  if (policy === 'quarantine') return 'Quarantines failing mail'
  if (policy === 'none') return 'Monitoring only'
  return 'Policy not reported'
}
