import type { Permission } from '@/types/auth'
import { hasPermission } from '@/utils/auth'
import { NextResponse } from 'next/server'
import { getSession } from './getSession'

/**
 * Route-handler helper: returns null when the current session has the
 * required permission, otherwise a ready-to-return 401/403 NextResponse.
 *
 * Lives under `services/` (not `utils/`) because it depends on
 * `getSession`, which reads cookies and the DB — both are server
 * concerns the shared layer is not allowed to import.
 */
export async function requirePermission(
  permission: Permission,
): Promise<NextResponse<{ error: { code: string; message: string } }> | null> {
  const session = await getSession()
  if (!session) {
    return NextResponse.json(
      { error: { code: 'UNAUTHORIZED', message: 'Authentication required' } },
      { status: 401 },
    )
  }
  if (!hasPermission(session.user.role, permission)) {
    return NextResponse.json(
      { error: { code: 'FORBIDDEN', message: 'Permission denied' } },
      { status: 403 },
    )
  }
  return null
}
