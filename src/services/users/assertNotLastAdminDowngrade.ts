import { getDb, users } from '@/lib/db'
import { and, count, eq, ne } from 'drizzle-orm'

/**
 * Refuses to lower the role of the only remaining admin.
 */
export function assertNotLastAdminDowngrade(
  id: string,
  role: string | undefined,
): void {
  if (!role || role === 'admin') return
  const db = getDb()
  // Check if lowering role. Is this user currently an admin?
  const currentUser = db.select().from(users).where(eq(users.id, id)).get()
  if (currentUser?.role !== 'admin') return
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
