import { recordAuditEvent } from '@/services/audit'
import { getSession, revokeUserSessions } from '@/services/auth'

/**
 * A new password must not leave the old cookies working, so every session
 * for this account goes -- including the caller's own when they changed
 * their own password.
 */
export async function revokeSessionsForPasswordChange(
  id: string,
): Promise<void> {
  // Read the actor first: revoking may delete the caller's own session.
  const session = await getSession()
  const revoked = await revokeUserSessions(id)
  await recordAuditEvent({
    action: 'auth.sessions.revoked',
    actorId: session?.user.id ?? null,
    actorEmail: session?.user.username ?? null,
    targetType: 'user',
    targetId: id,
    metadata: { reason: 'password_change', revoked },
  })
}
