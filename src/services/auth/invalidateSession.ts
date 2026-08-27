import { getDb, sessions } from '@/lib/db'
import { eq } from 'drizzle-orm'
import { cookies } from 'next/headers'

export async function invalidateSession() {
  const db = getDb()
  const cookieStore = await cookies()
  const sessionId = cookieStore.get('session')?.value
  if (!sessionId) return

  await db.delete(sessions).where(eq(sessions.id, sessionId))
  cookieStore.delete('session')
}
