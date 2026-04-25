/** Derives DMARC enforcement posture from policy string. */
export function deriveDmarcPosture(policy: string | null): {
  label: string
  status: 'enforcing' | 'monitoring' | 'missing'
} {
  if (!policy) return { label: 'Not configured', status: 'missing' }
  if (policy === 'reject' || policy === 'quarantine') {
    return { label: `Enforcing (${policy})`, status: 'enforcing' }
  }
  return { label: 'Monitoring (none)', status: 'monitoring' }
}
