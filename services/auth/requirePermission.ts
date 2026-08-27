import { API_KEY_PERMISSIONS } from '@/constants/auth'
import { hasValidApiKey } from '@/services/api/hasValidApiKey'
import type { Permission } from '@/types/auth'
import { hasPermission } from '@/utils/auth'
import { NextResponse } from 'next/server'
import { getSession } from './getSession'

/**
 * Route-handler helper: returns null when the current request has the
 * required permission, otherwise a ready-to-return 401/403 NextResponse.
 *
 * A session request is checked against its user's role. Without a session, a
 * valid shared API key (see `hasValidApiKey`) is checked against
 * `API_KEY_PERMISSIONS`, a fixed set that deliberately excludes user
 * management and audit-log access — one secret shared by every automation
 * client must not be able to escalate into account takeover.
 *
 * Lives under `services/` (not `utils/`) because it depends on
 * `getSession`, which reads cookies and the DB — both are server
 * concerns the shared layer is not allowed to import.
 */
export async function requirePermission(
  permission: Permission,
): Promise<NextResponse<{ error: { code: string; message: string } }> | null> {
  const session = await getSession()
  const keyIsValid = session ? false : await hasValidApiKey()
  if (!session && !keyIsValid) {
    return NextResponse.json(
      { error: { code: 'UNAUTHORIZED', message: 'Authentication required' } },
      { status: 401 },
    )
  }
  const granted = session
    ? hasPermission(session.user.role, permission)
    : API_KEY_PERMISSIONS.includes(permission)
  if (!granted) {
    return NextResponse.json(
      { error: { code: 'FORBIDDEN', message: 'Permission denied' } },
      { status: 403 },
    )
  }
  return null
}
