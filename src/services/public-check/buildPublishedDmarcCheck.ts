import type { PublicCheck } from '../../types/public-check/PublicCheck'
import { parsePublicDmarcPolicy } from './parsePublicDmarcPolicy'
import { scorePublicDmarcPolicy } from './scorePublicDmarcPolicy'

export function buildPublishedDmarcCheck(record: string): PublicCheck {
  const policy = parsePublicDmarcPolicy(record)
  const monitoring = policy.policy === 'none' || policy.percentage === 0
  return {
    name: 'DMARC',
    status: !policy.valid
      ? 'attention'
      : monitoring || policy.percentage < 100
        ? 'info'
        : 'pass',
    points: scorePublicDmarcPolicy(policy),
    summary: policy.valid
      ? `Valid DMARC record: p=${policy.policy ?? 'unknown'}; policy percentage ${String(policy.percentage)}%.`
      : 'The DMARC record needs correction.',
    recommendation: !policy.valid
      ? policy.issues.join(' ')
      : monitoring
        ? 'Monitoring mode is a valid policy, not a configuration error. It requests no quarantine or rejection. Collect reports and confirm legitimate senders before tightening enforcement.'
        : 'This is a published policy, not proof that messages pass authentication. Monitor aggregate reports before changing it.',
    records: [record],
  }
}
