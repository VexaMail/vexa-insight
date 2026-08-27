import { getDb, users } from '@/lib/db'
import { recordAuditEvent } from '@/services/audit'
import { getSession, hashPassword, revokeUserSessions } from '@/services/auth'
import { and, count, eq, ne } from 'drizzle-orm'

export async function updateUser(
  id: string,
  data: {
    username?: string | undefined
    role?: string | undefined
    allowedDomains?: string[] | undefined
    password?: string | undefined
  },
) {
  const db = getDb()

  if (data.role && data.role !== 'admin') {
    // Check if lowering role. Is this user currently an admin?
    const currentUser = db.select().from(users).where(eq(users.id, id)).get()
    if (currentUser?.role === 'admin') {
      // Are there other admins?
      const admins = db
        .select({ count: count() })
        .from(users)
        .where(and(eq(users.role, 'admin'), ne(users.id, id)))
        .get()
      if (!admins || admins.count === 0) {
        throw new Error('Cannot downgrade the last admin.')
      }
    }
  }

  const updateData: Record<string, unknown> = {
    updatedAt: new Date(),
  }

  if (data.username) updateData.username = data.username
  if (data.role) updateData.role = data.role
  if (data.allowedDomains !== undefined) {
    updateData.allowedDomains = JSON.stringify(data.allowedDomains)
  }
  if (data.password) updateData.passwordHash = hashPassword(data.password)

  await db.update(users).set(updateData).where(eq(users.id, id))

  // A new password must not leave the old cookies working, so every session
  // for this account goes -- including the caller's own when they changed
  // their own password.
  if (data.password) {
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

  return { success: true }
}
