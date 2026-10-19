import { getAllowedDomainNames, getSession } from '@/services/auth'
import type { IssueActionAccess } from '@/types/dashboard'
import { hasPermission } from '@/utils/auth'

/**
 * What the issues events API will accept from this viewer, so the queue only
 * offers actions that will succeed. The API still checks every request.
 */
export async function getIssueActionAccess(): Promise<IssueActionAccess> {
  const session = await getSession()
  const canWrite = session
    ? hasPermission(session.user.role, 'reports:write')
    : false
  return { canWrite, allowedDomains: await getAllowedDomainNames() }
}
