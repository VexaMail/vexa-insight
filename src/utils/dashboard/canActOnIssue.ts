import type { IssueActionAccess } from '@/types/dashboard'
import { issueKeyDomain } from '@/utils/issues'

/**
 * Mirrors the events API: a writer may act on any issue when unrestricted,
 * otherwise only on issues about one of their domains.
 */
export function canActOnIssue(
  issueKey: string,
  access: IssueActionAccess,
): boolean {
  if (!access.canWrite) return false
  if (access.allowedDomains === null) return true
  const domain = issueKeyDomain(issueKey)
  return domain !== null && access.allowedDomains.has(domain)
}
