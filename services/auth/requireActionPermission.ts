import type { Permission } from '@/types/auth'
import { requirePermission } from './requirePermission'

/**
 * Server-action guard: resolves the caller's permission exactly like
 * `requirePermission` (session role, or the shared API key's fixed
 * `API_KEY_PERMISSIONS`) but throws on denial instead of returning a
 * NextResponse, matching server-action semantics — Next.js surfaces the
 * thrown error to the caller as a failed action without leaking internals.
 */
export async function requireActionPermission(
  permission: Permission,
): Promise<void> {
  const denied = await requirePermission(permission)
  if (denied) {
    throw new Error(
      denied.status === 401 ? 'Authentication required' : 'Permission denied',
    )
  }
}
