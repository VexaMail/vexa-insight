import { domains, getDb } from '@/lib/db'
import type { TlsReport } from '@/types/tlsrpt'
import { inArray } from 'drizzle-orm'

/**
 * Whether any policy domain of a TLS report is a domain this instance already
 * monitors. The HTTPS receiver is unauthenticated, as RFC 8460 requires, so
 * this keeps it from storing reports about anybody else's domains.
 */
export function hasKnownPolicyDomain(report: TlsReport): boolean {
  const names = [...new Set(report.policies.map((p) => p.policyDomain))]
  if (names.length === 0) return false
  const row = getDb()
    .select({ id: domains.id })
    .from(domains)
    .where(inArray(domains.name, names))
    .limit(1)
    .get()
  return row !== undefined
}
