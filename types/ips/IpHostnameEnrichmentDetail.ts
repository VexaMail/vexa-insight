import type { ipHostnameEnrichments } from '@/lib/db'

/**
 * Hostname enrichment detail returned by the ips/[ip]/hostname endpoint:
 * a subset of the enrichment row with `lookupError` exposed as `error`.
 */
export type IpHostnameEnrichmentDetail = Pick<
  typeof ipHostnameEnrichments.$inferSelect,
  'ip' | 'hostname' | 'lookupStatus' | 'lastLookupAt' | 'nextLookupAt'
> & { error: string | null }
