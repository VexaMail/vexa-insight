import { hashPassword } from '@/services/auth'
import type { UserUpdateInput } from '@/types/users'

/**
 * The columns an update writes; absent fields stay untouched.
 */
export function userUpdateValues(
  data: UserUpdateInput,
): Record<string, unknown> {
  const updateData: Record<string, unknown> = {
    updatedAt: new Date(),
  }
  if (data.username) updateData['username'] = data.username
  if (data.role) updateData['role'] = data.role
  if (data.allowedDomains !== undefined) {
    updateData['allowedDomains'] = JSON.stringify(data.allowedDomains)
  }
  if (data.password) updateData['passwordHash'] = hashPassword(data.password)
  return updateData
}
