import type { PublishedDmarcPolicy } from '@/types/domains'

/** "DMARC monitoring (p=none)", "DMARC enforcing (p=reject)" and the like. */
export function policySubtitle(policy: PublishedDmarcPolicy | null): string {
  const value = policy?.policy ?? null
  if (value === null) return 'No DMARC policy reported yet'
  const pct =
    policy?.pct != null && policy.pct < 100 ? `, pct=${String(policy.pct)}` : ''
  const mode = value === 'none' ? 'monitoring' : 'enforcing'
  return `DMARC ${mode} (p=${value}${pct})`
}
