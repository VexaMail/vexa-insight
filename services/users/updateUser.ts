import { getDb, users } from '@/lib/db'
import { hashPassword } from '@/services/auth'
import { and, count, eq, ne } from 'drizzle-orm'

export async function updateUser(
  id: string,
  data: {
    username?: string
    role?: string
    allowedDomains?: string[]
    password?: string
  },
) {
  const db = getDb()

  if (data.role && data.role !== 'admin') {
    // Check if lowering role. Is this user currently an admin?
    const currentUser = await db
      .select()
      .from(users)
      .where(eq(users.id, id))
      .get()
    if (currentUser?.role === 'admin') {
      // Are there other admins?
      const admins = await db
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
    updateData.allowedDomains = data.allowedDomains
      ? JSON.stringify(data.allowedDomains)
      : null
  }
  if (data.password) updateData.passwordHash = hashPassword(data.password)

  await db.update(users).set(updateData).where(eq(users.id, id))
  return { success: true }
}
