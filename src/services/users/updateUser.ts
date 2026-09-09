import { getDb, users } from '@/lib/db'
import type { UserUpdateInput } from '@/types/users'
import { eq } from 'drizzle-orm'
import { assertNotLastAdminDowngrade } from './assertNotLastAdminDowngrade'
import { revokeSessionsForPasswordChange } from './revokeSessionsForPasswordChange'
import { userUpdateValues } from './userUpdateValues'

export async function updateUser(id: string, data: UserUpdateInput) {
  assertNotLastAdminDowngrade(id, data.role)

  await getDb()
    .update(users)
    .set(userUpdateValues(data))
    .where(eq(users.id, id))

  if (data.password) {
    await revokeSessionsForPasswordChange(id)
  }

  return { success: true }
}
