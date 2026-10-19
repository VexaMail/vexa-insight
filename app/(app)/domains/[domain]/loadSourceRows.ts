import { getDomainSourceAuth } from '@/services/domains'
import { getDomainSources } from '@/services/reports'
import type { DomainSourceRow } from '@/types/domains'
import { toDomainSourceRow } from '@/utils/domains'

/** The sources of a domain with their auth counts, over an optional window. */
export async function loadSourceRows(
  domainId: number,
  days?: number,
): Promise<DomainSourceRow[]> {
  const [sources, auth] = await Promise.all([
    getDomainSources(domainId, days),
    getDomainSourceAuth(domainId, days),
  ])
  return sources.map((source) =>
    toDomainSourceRow(source, auth.get(source.sourceIp)),
  )
}
