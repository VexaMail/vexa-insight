/** One sentence on what receivers do with failing mail under a `p=` value. */
export function policyEffectNote(policy: string | null): string {
  if (policy === 'none') {
    return 'This domain is in monitoring mode. No enforcement is applied.'
  }
  if (policy === 'quarantine') {
    return 'Receivers send failing mail to spam or quarantine.'
  }
  if (policy === 'reject') return 'Receivers refuse failing mail outright.'
  return 'No aggregate report has quoted a policy yet.'
}
