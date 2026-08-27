import { getDb, users } from '@/lib/db'
import { and, count, eq, ne } from 'drizzle-orm'

export async function deleteUser(id: string) {
  const db = getDb()

  const currentUser = await db
    .select()
    .from(users)
    .where(eq(users.id, id))
    .get()
  if (!currentUser) {
    throw new Error('User not found.')
  }

  if (currentUser.role === 'admin') {
    const admins = await db
      .select({ count: count() })
      .from(users)
      .where(and(eq(users.role, 'admin'), ne(users.id, id)))
      .get()
    if (!admins || admins.count === 0) {
      throw new Error('Cannot delete the last admin.')
    }
  }

  await db.delete(users).where(eq(users.id, id))
  return { success: true }
}
