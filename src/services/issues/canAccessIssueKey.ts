import { getAllowedDomainNames } from '@/services/auth'
import { issueKeyDomain } from '@/utils/issues'

/**
 * Whether the caller may read or act on an issue. An unrestricted caller may
 * act on any; a caller limited to some domains only on issues about one of
 * them, so an issue not about a domain (ingestion, for one) is out of reach.
 */
export async function canAccessIssueKey(issueKey: string): Promise<boolean> {
  const allowed = await getAllowedDomainNames()
  if (allowed === null) return true
  const domain = issueKeyDomain(issueKey)
  return domain !== null && allowed.has(domain)
}
