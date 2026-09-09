import { getDb, users } from '@/lib/db'
import { eq } from 'drizzle-orm'

export function findUserByUsername(
  username: string,
): typeof users.$inferSelect | undefined {
  return getDb().select().from(users).where(eq(users.username, username)).get()
}
