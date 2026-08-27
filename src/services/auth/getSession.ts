import { getDb, sessions, users } from '@/lib/db'
import { eq } from 'drizzle-orm'
import { cookies } from 'next/headers'

export async function getSession() {
  const db = getDb()
  const cookieStore = await cookies()
  const sessionId = cookieStore.get('session')?.value
  if (!sessionId) return null

  const result = db
    .select({ user: users, session: sessions })
    .from(sessions)
    .innerJoin(users, eq(sessions.userId, users.id))
    .where(eq(sessions.id, sessionId))
    .get()

  if (!result) {
    return null
  }

  const { user, session } = result

  if (Date.now() >= session.expiresAt.getTime()) {
    db.delete(sessions).where(eq(sessions.id, session.id)).run()
    return null
  }

  // Extend session if close to expiry can be added here

  return { user, session }
}
