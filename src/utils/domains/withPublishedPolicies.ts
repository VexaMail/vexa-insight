import type { DomainListRow, PublishedDmarcPolicy } from '@/types/domains'
import type { DomainSummary } from '@/types/reports'

/** Domain summaries with the policy each one last published. */
export function withPublishedPolicies(
  domains: readonly DomainSummary[],
  policies: ReadonlyMap<number, PublishedDmarcPolicy>,
): DomainListRow[] {
  return domains.map((domain) => ({
    ...domain,
    policy: policies.get(domain.domainId) ?? null,
  }))
}
