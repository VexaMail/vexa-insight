import { getDb, users } from '@/lib/db'
import { hashPassword } from '@/services/auth'
import crypto from 'node:crypto'

export async function createUser(data: {
  username: string
  password?: string
  role?: string
  allowedDomains?: string[]
}) {
  const db = getDb()
  const userId = crypto.randomUUID()

  await db.insert(users).values({
    id: userId,
    username: data.username,
    passwordHash: data.password ? hashPassword(data.password) : '',
    role: data.role || 'user',
    allowedDomains: data.allowedDomains
      ? JSON.stringify(data.allowedDomains)
      : null,
  })

  return { id: userId }
}
