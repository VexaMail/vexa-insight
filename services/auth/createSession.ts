import { getDb, sessions } from '@/lib/db'
import { cookies } from 'next/headers'
import crypto from 'node:crypto'

export async function createSession(userId: string) {
  const db = getDb()
  const sessionId = crypto.randomBytes(16).toString('hex')
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30) // 30 days

  await db.insert(sessions).values({
    id: sessionId,
    userId,
    expiresAt,
  })

  const cookieStore = await cookies()
  cookieStore.set('session', sessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    expires: expiresAt,
    path: '/',
  })
}
