import { domainDiagnostics, domains, getDb } from '@/lib/db'
import type { DiagnosticsOverviewRow } from '@/types/diagnostics'
import { eq, inArray } from 'drizzle-orm'
import { diagnosticsOverviewCheckFromRow } from './diagnosticsOverviewCheckFromRow'

/**
 * Every domain in `domainIds` (all domains when null) with its stored DNS run,
 * read in one query and without any lookup.
 */
export async function listDiagnosticsOverviewRows(
  domainIds: readonly number[] | null,
): Promise<DiagnosticsOverviewRow[]> {
  if (domainIds !== null && domainIds.length === 0) return []
  const query = getDb()
    .select({ domain: domains, check: domainDiagnostics })
    .from(domains)
    .leftJoin(domainDiagnostics, eq(domainDiagnostics.domainId, domains.id))
  if (domainIds !== null) query.where(inArray(domains.id, [...domainIds]))
  const rows = await query
  return rows.map(({ domain, check }) => ({
    domainId: domain.id,
    domainName: domain.name,
    check: check ? diagnosticsOverviewCheckFromRow(check) : null,
  }))
}
