'use server'

import { getDb, users } from '@/lib/db'
import { createSession, verifyPassword } from '@/services/auth'
import { eq } from 'drizzle-orm'
import { redirect } from 'next/navigation'
import type { ActionState } from './ActionState'

export async function loginAction(
  state: ActionState,
  formData: FormData,
): Promise<ActionState> {
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

  if (!existingUser) {
    return { error: 'Invalid username or password' }
  }

  const validPassword = verifyPassword(password, existingUser.passwordHash)
  if (!validPassword) {
    return { error: 'Invalid username or password' }
  }

  await createSession(existingUser.id)

  redirect('/')
}
