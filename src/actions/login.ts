'use server'

import { getDb, users } from '@/lib/db'
import { recordAuditEvent } from '@/services/audit'
import { createSession, verifyPassword } from '@/services/auth'
import { checkRateLimit, getRateLimitKeyFromHeaders } from '@/utils/rateLimit'
import { eq } from 'drizzle-orm'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import type { ActionState } from './ActionState'
import { LOGIN_LIMIT } from './loginLimit'
import { LOGIN_WINDOW_MS } from './loginWindowMs'

export async function loginAction(
  state: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const reqHeaders = await headers()
  const key = `login:${getRateLimitKeyFromHeaders(reqHeaders)}`
  if (!checkRateLimit(key, LOGIN_LIMIT, LOGIN_WINDOW_MS)) {
    return { error: 'Too many login attempts. Try again in a minute.' }
  }

  const username = formData.get('username') as string
  const password = formData.get('password') as string

  if (!username || !password) {
    return { error: 'Username and password are required' }
  }

  const db = getDb()

  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.username, username))
    .get()

  const ip = reqHeaders.get('x-forwarded-for')?.split(',')[0]?.trim() ?? null
  const userAgent = reqHeaders.get('user-agent') ?? null

  if (!existingUser) {
    await recordAuditEvent({
      action: 'auth.login.failure',
      actorEmail: username,
      ip,
      userAgent,
      metadata: { reason: 'unknown_user' },
    })
    return { error: 'Invalid username or password' }
  }

  const validPassword = verifyPassword(password, existingUser.passwordHash)
  if (!validPassword) {
    await recordAuditEvent({
      action: 'auth.login.failure',
      actorId: existingUser.id,
      actorEmail: existingUser.username,
      ip,
      userAgent,
      metadata: { reason: 'bad_password' },
    })
    return { error: 'Invalid username or password' }
  }

  await createSession(existingUser.id)
  await recordAuditEvent({
    action: 'auth.login.success',
    actorId: existingUser.id,
    actorEmail: existingUser.username,
    ip,
    userAgent,
  })

  redirect('/')
}
