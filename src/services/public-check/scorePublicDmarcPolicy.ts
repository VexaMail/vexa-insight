import type { PublicDmarcPolicy } from '../../types/public-check/PublicDmarcPolicy'

export function scorePublicDmarcPolicy(policy: PublicDmarcPolicy): number {
  if (!policy.valid) return 0
  const bonus =
    policy.policy === 'reject' ? 20 : policy.policy === 'quarantine' ? 10 : 0
  return 30 + Math.round((bonus * policy.percentage) / 100)
}
