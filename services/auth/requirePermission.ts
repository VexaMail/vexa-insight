import { getApiKeyRole } from '@/services/api'
import type { Permission } from '@/types/auth'
import { hasPermission } from '@/utils/auth'
import { NextResponse } from 'next/server'
import { getSession } from './getSession'

/**
 * Route-handler helper: returns null when the current request has the
 * required permission, otherwise a ready-to-return 401/403 NextResponse.
 *
 * The effective role comes from the session user; without a session, a
 * valid shared admin API key (see `getApiKeyRole`) acts as the `admin`
 * role so key-based automation keeps working on permission-gated routes.
 *
 * Lives under `services/` (not `utils/`) because it depends on
 * `getSession`, which reads cookies and the DB — both are server
 * concerns the shared layer is not allowed to import.
 */
export async function requirePermission(
  permission: Permission,
): Promise<NextResponse<{ error: { code: string; message: string } }> | null> {
  const session = await getSession()
  const role = session ? session.user.role : await getApiKeyRole()
  if (!role) {
    return NextResponse.json(
      { error: { code: 'UNAUTHORIZED', message: 'Authentication required' } },
      { status: 401 },
    )
  }
  if (!hasPermission(role, permission)) {
    return NextResponse.json(
      { error: { code: 'FORBIDDEN', message: 'Permission denied' } },
      { status: 403 },
    )
  }
  return null
}
