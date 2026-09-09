'use server'

import { recordAuditEvent } from '@/services/audit'
import {
  createSession,
  findUserByUsername,
  recordLoginFailure,
  verifyPassword,
} from '@/services/auth'
import { requestClientMeta } from '@/utils/auth'
import { checkRateLimit, getRateLimitKeyFromHeaders } from '@/utils/rateLimit'
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

  const existingUser = findUserByUsername(username)
  const meta = requestClientMeta(reqHeaders)

  if (!existingUser) {
    await recordLoginFailure({
      ...meta,
      actorEmail: username,
      reason: 'unknown_user',
    })
    return { error: 'Invalid username or password' }
  }

  const validPassword = verifyPassword(password, existingUser.passwordHash)
  if (!validPassword) {
    await recordLoginFailure({
      ...meta,
      actorId: existingUser.id,
      actorEmail: existingUser.username,
      reason: 'bad_password',
    })
    return { error: 'Invalid username or password' }
  }

  await createSession(existingUser.id)
  await recordAuditEvent({
    action: 'auth.login.success',
    actorId: existingUser.id,
    actorEmail: existingUser.username,
    ...meta,
  })

  redirect('/')
}
