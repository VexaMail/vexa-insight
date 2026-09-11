import { getDb, users } from '@/lib/db'
import { hasInitializedSettings } from './hasInitializedSettings'

export function isPartiallyInstalled(): boolean {
  try {
    if (!hasInitializedSettings()) return false

    const db = getDb()
    const existingUsers = db.select({ id: users.id }).from(users).limit(1).get()

    // It is partially installed if settings are good but users are missing
    if (!existingUsers) return true

    return false
  } catch {
    return false
  }
}
